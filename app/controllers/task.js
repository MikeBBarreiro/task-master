
'use strict';

var Task = require('../models/tasks');

exports.init = function(req, res){
  res.render('tasks/new');
};

exports.index = function(req, res){
  Task.findAll(function(tasks){
    res.render('tasks/index', {tasks:tasks});
  });
};

exports.create = function(req, res){
  var p = new Task(req.body);
  p.save(function(){
    res.redirect('/tasks');
  });
};
