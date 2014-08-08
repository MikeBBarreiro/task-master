
'use strict';

var Task = require('../models/task');

exports.init = function(req, res){
  res.render('tasks/new');
};

exports.index = function(req, res){
  Task.findAll(function(tasks){
    console.log(tasks,'<<<<<<<');
    res.render('tasks/index', {tasks:tasks});
  });
};

exports.create = function(req, res){
  var p = new Task(req.body);
  p.insert(function(){
    res.redirect('/');
  });
};
