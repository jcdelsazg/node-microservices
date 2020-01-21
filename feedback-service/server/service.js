const express = require('express');
const amqplib = require('amqplib');

const Feedback = require('./lib/Feedback');

const service = express();

module.exports = (config) => {
  const feedback = new Feedback(config.data.feedback);
  const log = config.log();
  const qeue = 'feedback';

  amqplib
    .connect('amqp://localhost')
    .then((connection) => connection.createChannel())
    .then((channel) =>
      channel.assertQueue(qeue).then(() =>
        channel.consume(qeue, (message) => {
          if (message != null) {
            log.debug(`Got a message ${message.content.toString()}`);
            const qeueMessage = JSON.parse(message.content.toString());
            feedback
              .addEntry(qeueMessage.name, qeueMessage.title, qeueMessage.message)
              .then(() => channel.ack(message));
          }
        })
      )
    )
    .catch((error) => log.fatal(error));

  // Add a request logging middleware in development mode
  if (service.get('env') === 'development') {
    service.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
  }

  service.get('/list', async (req, res, next) => {
    try {
      return res.json(await feedback.getList());
    } catch (err) {
      return next(err);
    }
  });

  // eslint-disable-next-line no-unused-vars
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message
      }
    });
  });
  return service;
};
