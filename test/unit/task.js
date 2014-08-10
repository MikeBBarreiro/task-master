/* jshint expr:true */
/*global describe, it, before, beforeEach */
'use strict';

var expect = require('chai').expect;
var Task = require('../../app/models/task');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');

var t2, t3;

describe('Task', function(){
  before(function(done){
    dbConnect('taskmaster-test', function(){
      done();
    });
  });

  beforeEach(function(done){
    Task.collection.remove(function(){
      t2 = new Task({name:'Bringing grandma to nursing home',
                due:'04-15-2014',
                photo:'http://cdn.lolzbook.com/wp-content/iploads/2013/07/oh-grandma-you-so-funny.png', 
                isComplete: false,
                tags: 'nursing, grandma',
                priorityId:'high'});
      t3 = new Task({name:'get milk',
                due:'04-15-2014',
                photo:'http://milk/-gross.png',
                isComplete: false,
                tags: 'nursing, grandma',
                priorityId:'medium'});
      t2.insert(function(){
        t3.insert(function(){
          done();
        });
      });
    });
  });

  describe('constructor', function(){
    it('Should create a new task', function(){
      var t = {name:'bring grandma to nursing home',
                due:'04-15-2014',
                photo:'http://cdn.lolzbook.com/wp-content/uploads/2013/07/oh-grandma-you-so-funny.png', 
                isComplete:false,
                tags: 'nursing, grandma',
                priorityId: 'high'};
      var t1 = new Task(t);

      expect(t1).to.be.instanceof(Task);
      expect(t1.name).to.equal('bring grandma to nursing home');
      expect(t1.due).to.be.instanceof(Date);
      expect(t1.photo).to.equal('http://cdn.lolzbook.com/wp-content/uploads/2013/07/oh-grandma-you-so-funny.png');
      expect(t1.tags).to.be.instanceof(Array);
      expect(t1.tags[0]).to.equal('nursing');
    });
  });

  describe('#insert', function(){
    it('should inster and save a new task', function(done){
        expect(t2._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });

  describe('.update', function(){
    it('Should update, isComplete to true in DataBase', function(done){
      Task.update(t2._id.toString(), {isComplete:'true'}, function(){
        Task.findById(t2._id.toString(), function(task){
          expect(task.isComplete).to.be.true;
            done();
        });
      });
    });
    it('Should set, isComplete to false in DataBase', function(done){
      Task.update(t2._id.toString(), {}, function(){
        Task.findById(t2._id.toString(), function(task){
          expect(task.isComplete).to.be.false;
            done();
        });
      });
    });
  });

  describe('.findAll', function(){
    it('Should find all tasks', function(done){
      Task.findAll(function(tasks){
        expect(tasks).to.have.length(2);
        expect(tasks[0].priorityId).to.equal('high');
        done();
      });
    });
  });

  describe('.findById', function(){
    it('Should find a task by id', function(done){
      Task.findById(t2._id.toString(), function(task){
        expect(task).to.be.instanceof(Task);
        expect(task.name).to.equal('Bringing grandma to nursing home');
        done();
        });
      });
    });
  });
