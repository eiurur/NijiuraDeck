module.exports = app => {
  app.get('/projects', (req, res) => {
    res.json({
      projects: [{ name: 'RabbitHouse' }, { name: '甘兎庵' }],
    });
  });

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
