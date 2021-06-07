// API file

// Import modules
const app = require('express')()

// Require routes
const oauth = require('./routes/oauth')
const chalk = require('chalk')

// Import routes
app.use(oauth)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(chalk`{greenBright.bold [API]} API online listening on port {magenta ${port}}`)
  })
}
