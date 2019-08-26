const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.simple(),
  defaultMeta: { service: 'recipe-api' },
});

const console = new winston.transports.Console();

logger.add(console);

module.exports = logger;
