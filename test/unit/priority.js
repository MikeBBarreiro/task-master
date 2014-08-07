/* jshint expr:true */
/*global describe, it, before, beforeEach */
'use strict';

var expect = require('chai').expect;
var Priority = require('../../app/models/priority');
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var p1;

describe('Priority', function(){
  before(function(done){
    dbConnect('task-manager', function(){
      done();
    });
  });

  beforeEach(function(done){
    Priority.collection.remove(function(){
      var p = {name:'Austin', color:'Blue', value:'0'};
      p1 = new Priority(p);
      p1.insert(function(){
        done();
      });
    });
  });

  describe('constructor', function(){
    it('Should create a new person object', function (){
      var p = {name:'Will', color:'green'};
      var will = new Priority(p);

      expect(will).to.be.instanceof(Priority);
      expect(will.name).to.equal('Will');
      expect(will.color).to.equal('green');
      });
    });

    describe('#instert', function(){
      it('should insert a student', function(done){
        var p = {name:'Will', color:'green'};
        var will = new Priority(p);
        will.insert(function(){
          expect(will._id).to.be.instanceof(Mongo.ObjectID);
          done();
        });
      });
    });

    describe('.findAll', function(){
      it('Should find all Prioirties', function(done){
        var p = {name:'Will', color:'green', value: '10'};
        var will = new Priority(p);
        will.insert(function(){
          Priority.findAll(function(priorities){
            expect(priorities).to.have.length(2);
            expect(priorities[0]).to.be.instanceof(Priority);
            done();
          });
        });
      });
    });

    describe('.findById', function(){
      it('Should find by ID', function(done){
        Priority.findById(p1._id.toString(), function(priority){
          expect(priority.name).to.equal('Austin');
          expect(priority).to.be.instanceof(Priority);
          done();
        });
      });
    });

    // closeing brackets
});
