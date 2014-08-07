
'use strict';

var morgan = require('morgan');
var bodyParser = require('body-parser');
//var methodOverride = require('express-method-override');
var priorities = require('../controllers/priorities');
var tasks = require('../controllers/tasks');

module.exports = function(app, express){
  app.use(morgan('dev'));
  app.use(express.static(__dirname + '/../static'));
  app.use(bodyParser.urlencoded({extended:true}));

  app.get('/', tasks.index);
  app.get('/task/new', tasks.init);
  app.post('/task/new', tasks.create);

  app.get('/priorities/', priorities.index);
  app.post('/priorities/new', priorities.init);
  app.get('/priorities/new', priorities.create);

  console.log('Pipeline Configured');
};
