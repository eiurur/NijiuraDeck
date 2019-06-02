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
          board.setCatalogSetting({
            width: 14,
            height: 20,
            num: 16,
            position: 0,
            size: 3,
          });
          board.setCatalogParameter({ sort: sort });
          const threads = await board.thread.list();
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
          const responses = await board.response.list(threadId);
          return responses;
        })(req.params),
      ),
  );
};
