'use strict';

var Priority = require('../models/priority');

exports.init = function(req, res){
  res.render('priorities/new');
};

exports.index = function(req, res){
  Priority.findAll(function(priorities){
    res.render('priorities/index', {priorities:priorities});
  });
};

exports.create = function(req, res){
  var p = new Priority(req.body);
  p.insert(function(){
    res.redirect('/priorities');
  });
};


