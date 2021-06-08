require('dotenv').config()
const { Router } = require('express')
const axios = require('axios')
const router = Router()
const passport = require('passport')
const session = require('express-session')
const Strategy = require('passport-discord').Strategy
const bodyParser = require('body-parser')
const rateLimit = require('express-rate-limit')
const MemoryStore = require('memorystore')(session)
const url = require('url')

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((obj, done) => done(null, obj))

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/callback`,
      scope: ['identify', 'guilds'],
      prompt: 'none',
    },
    (accessToken, refreshToken, profile, done) => {
      // eslint-disable-line no-unused-vars
      // On login we pass in profile with no logic.
      process.nextTick(() => done(null, profile))
    }
  )
)

router.use(
  session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: process.env.MEMORY_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

router.use(passport.initialize())
router.use(passport.session())
router.use(bodyParser.json())
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

let ratelimitHandler = function (req, res /*next*/) {
  res.status(429).send('Too many requests, please try again later.')
  if (req.isAuthenticated()) {
    console.warn(`${req.user.username}#${req.user.discriminator} (${req.user.id}) is being ratelimited at ${req.originalUrl}.`)
  }
}

const userLimiter = rateLimit({
  windowMs: 10000, // 10 secs
  max: 8,
  handler: ratelimitHandler,
})

const fetchLimiter = rateLimit({
  windowMs: 30000, // 10 secs
  max: 5,
  handler: ratelimitHandler,
})

router.use('/api/users/@me', userLimiter)
router.use('/api/users/@me', fetchLimiter)

let domain = process.env.BASE_URL

// Login endpoint.
router.get(
  '/login',
  (req, res, next) => {
    // We determine the returning url.
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer)
      if (parsed.hostname === domain) {
        req.session.backURL = parsed.path
      }
    } else {
      req.session.backURL = '/'
    }
    // Forward the request to the passport middleware.
    next()
  },
  passport.authenticate('discord', { prompt: 'none' })
)

// Logout endpoint
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    req.logout()
    res.redirect('/')
  })
})

// Callback endpoint.
router.get(
  '/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  /* We authenticate the user, if user canceled we redirect them to index. */ (req, res) => {
    // If user had set a returning url, we redirect them there, otherwise we redirect them to index.
    const url = req.session.backURL
    if (url) {
      req.session.backURL = null
      res.redirect(url)
    } else {
      res.redirect('/guildcount')
    }
  }
)

// User Info Endpoint
router.get('/api/users/@me', (req, res) => {
  if (!req.isAuthenticated()) return res.sendStatus(401)
  let user = Object.assign({}, req.user)
  user.accessToken = '[Redacted]'
  res.send(user)
})

async function getGuild(id) {
  let data;

  await axios.get(`https://discord.com/api/v8/guilds/${id}/widget.json`).then(res => {
    if (res.data?.id) data = {
      type: 'guild',
      guild: res.data
    }
  }).catch((err) => {
    if (err.response?.data?.message === 'Widget Disabled') data = {
      type: 'guild',
      disabled: true,
      guild: {}
    }
  })
  if (data) {
    let request = await axios
    .get(`https://discord.com/api/v8/guilds/${id}/preview`, {
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
      },
    })
    .catch((err) => null)
    if (request?.data) {
      data.guild = Object.assign(request.data, data.guild)
    }
  }
  return data
}

async function fetchUser(id) {
  let request = await axios
    .get('https://discord.com/api/v8/users/' + id, {
      headers: {
        Authorization: `Bot ${process.env.TOKEN}`,
      },
    })
    .catch((err) => null)

  if (request?.data) {
    request.data.type = 'user'
    return request.data
  }
  else return null
}

// Fetch Data Endpoint
router.get('/api/fetch/:id', async (req, res) => {
  if (!req.isAuthenticated()) return res.sendStatus(401)
  let id = req.params.id
  if (isNaN(id)) return res.sendStatus(400)

  let guild = await getGuild(id)
  if (guild) return res.send(guild)

  let user = await fetchUser(id)
  if (user) return res.send(user)

  res.sendStatus(400)
})

// Guilds Endpoint
router.get('/api/users/@me/guilds', async (req, res) => {
  if (!req.isAuthenticated()) return res.sendStatus(401)
  if (!req.user.guilds) return res.sendStatus(401)

  let reqGuilds = await axios
    .get(`https://discord.com/api/v8/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${req.user.accessToken}`,
      },
    })
    .catch(() => null)

  if (!reqGuilds) return res.sendStatus(429)

  let basicGuilds = reqGuilds.data
  res.send(basicGuilds)
})

module.exports = router
