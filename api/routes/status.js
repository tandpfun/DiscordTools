require('dotenv').config();
const { Router } = require('express');
const axios = require('axios');
const router = Router();
const rateLimit = require('express-rate-limit');
const url = require('url');

const status = {
  discord: {
    online: true,
    ping: 0,
  },
  staging: {
    open: false,
    ping: 0,
  },
};

setInterval(async () => {
  let startTime = Date.now();
  let discordApiReq = await axios.get('https://discord.com/api/v9/users/@me').catch((err) => err.response?.status);
  if (discordApiReq) {
    if (!isNaN(discordApiReq)) status.discord.ping = -(startTime - Date.now());
    else {
      status.discord.ping = 0;
      status.discord.online = false;
      console.log('discord req');
    }
  }

  let stagingTime = Date.now();

  let discordStagingReq = await axios.get('https://staging.discord.co/api/users/@me').catch((err) => err.response?.status);
  let discordStagingRedir = await axios.get('https://staging.discord.co').catch((err) => err.response?.status);
  if (discordStagingReq) {
    if (!isNaN(discordStagingReq)) status.staging.ping = -(stagingTime - Date.now());
    else {
      status.staging.ping = 0;
      status.staging.open = false;
    }
  }

  let statusPage = await axios.get('https://discordstatus.com/api/v2/status.json').catch((err) => null);
  if (statusPage?.data) {
    const offlineStatuses = ['minor', 'major', 'critical'];
    if (offlineStatuses.includes(statusPage.data.status.indicator)) status.discord.online = false;
    else status.discord.online = true;
  }

  if (discordStagingRedir?.request?.host.includes('cloudflareaccess')) status.staging.open = false;
  else status.staging.open = true;
}, 60000);

router.get('/api/discordstatus', (req, res) => {
  res.send(status);
});

module.exports = router;
