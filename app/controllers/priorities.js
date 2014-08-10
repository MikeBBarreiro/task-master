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
  Priority.create(req.body, function(){
    res.redirect('/priorities');
  });
};


