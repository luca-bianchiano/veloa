
const pino = require("pino");
const dayjs = require("dayjs");
require('./i18n')
const log = pino({
    base: {
        "pino-pretty": true,
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});
module.exports = log;
