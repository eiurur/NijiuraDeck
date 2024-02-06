const { Board } = require('nijiura');
const API_VERSION = 'v1';

const { seaquencer } = require('../lib/seaquencer');
const { logging, parameters } = require('../middleware');

module.exports = app => {
  app.get(
    `/api/${API_VERSION}/:boardType/threads`,
    [parameters.getParameters, logging.log],
    (req, res) =>
      seaquencer(
        req,
        res,
        (async ({ boardType, sort }) => {
          const board = new Board(boardType.toUpperCase());
          // TODO: cookieから取得
          const catalog = board.getCatalog()
          catalog.setSetting({
            width: 32,
            height: 32,
            num: 16,
            position: 0,
            size: 3,
          });
          catalog.setParameter({ sort: sort });
          const threads = await catalog.list();
          return threads;
        })(req.params),
      ),
  );

  app.get(
    `/api/${API_VERSION}/:boardType/thread/:threadId`,
    [parameters.getParameters, logging.log],
    (req, res) =>
      seaquencer(
        req,
        res,
        (async ({ boardType, threadId }) => {
          const board = new Board(boardType.toUpperCase());
          const responses = await board.getThread(threadId).list();
          return responses;
        })(req.params),
      ),
  );

  app.post(
    `/api/${API_VERSION}/:boardType/thread`,
    [parameters.getParameters, logging.log],
    (req, res) =>
      seaquencer(
        req,
        res,
        (async ({ boardType, thread, payload }) => {
          const board = new Board(boardType.toUpperCase());
          const result = await board.thread.post(
            thread.url,
            thread.id,
            payload,
          );
          return result;
        })(req.params),
      ),
  );
};
