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
      req.session.backURL = '/guildcount'
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
    // If user had set a returning url, we redirect them there, otherwise we redirect him to index.
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
