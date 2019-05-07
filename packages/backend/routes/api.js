const { Board } = require('nijiura');
const API_VERSION = 'v1';

const { logging, parameters } = require('../middleware');

module.exports = app => {
  app.get(
    `/api/${API_VERSION}/:boardType/threads`,
    [parameters.getParameters, logging.log],
    async (req, res) => {
      const board = new Board(req.params.boardType.toUpperCase());
      // TODO: cookieから取得
      board.setCatalogSetting({
        width: 14,
        height: 20,
        num: 16,
        position: 0,
        size: 3,
      });
      board.setCatalogParameter({ sort: req.params.sort });
      const threads = await board.thread.list();
      res.send(threads);
    },
  );

  app.get(
    `/api/${API_VERSION}/:boardType/thread/:threadId`,
    [parameters.getParameters, logging.log],
    async (req, res) => {
      const board = new Board(req.params.boardType.toUpperCase());
      const responses = await board.response.list(req.params.threadId);
      res.send(responses);
    },
  );

  app.post('/projects', (req, res) => {
    console.log(req.body);
    res.send(req.body);
  });
  // require('./api/publics')(app);
  // require('./api/sessions')(app);
  // require('./middlewares/session')(app);
  // require('./api/posts')(app);
  // require('./api/stats')(app);
  // require('./api/favorites')(app);
};
