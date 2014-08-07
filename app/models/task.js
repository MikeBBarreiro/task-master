'use strict';

var Mongo = require('mongodb');
var _     = require('lodash');

function Task(t){
  this.name = t.name;
  this.due = new Date(t.due);
  this.photo = t.photo;
  this.priorityId = Mongo.ObjectID(t.proprityId);
  this.isComplete = false;
  this.tags = t.tags.split(',');
  this.priorityId = t.priorityId;
}

Object.defineProperty(Task, 'collection', {
    get: function(){return global.mongodb.collection('tasks');}
});

Task.prototype.insert = function(cb){
  Task.collection.save(this, cb);
};

Task.update = function(id, obj, cb){
  var _id = Mongo.ObjectID(id);
  var val = (obj.isComplete) ? true : false;
  console.log(_id);
  Task.collection.update({_id:_id}, {$set:{isComplete:val}}, cb);
};

Task.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Task.collection.findOne({_id:_id}, function(err, obj){
    cb(extend(obj));
  });
};
/*
Task.findAll = function(id, cb){
  Task.collection.findAll().toArray(function(err, objs){
    var tasks = objs.map(funciton(t){return extend(t);});
  });
};*/


//Helper

function extend(obj){
  return _.create(Task.prototype, obj);
}

module.exports = Task;

