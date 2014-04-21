var settings = require('../config/settings');
var mongoose = require('mongoose');
var Poll = require('../models/Poll');
var should = require('should');
var fakePoll;

// Mongoose Connection
mongoose.connect(settings.db);
mongoose.connection.on('error', function() {
  console.error('✗ MongoDB Connection Error. Please make sure MongoDB is running.');
});

describe('Poll', function(){
	beforeEach(function(done){
		// Empty DB
		Poll.remove(done);

		fakePoll = {
			title: 'Test Title',
			description: 'Test Description',
			type: 'cumulative',
			choices: ['Choice 1', 'Choice 2', 'Choice 3'],
			votes: [0, 0, 0]
		};
	});

	after(function(done){
		Poll.remove(function(err){
			done();
		});
	});

	describe('#save()', function(){
		var poll;
		beforeEach(function(done){
			poll = new Poll(fakePoll);
			poll.save(function(err, poll){
				done();
			});
		});

		it('should have required properties', function(done){
			poll.save(function(err, poll){
				should.not.exist(err);
				poll.should.have.property('title', 'Test Title');
				poll.should.have.property('description', 'Test Description');
				poll.should.have.property('type', 'cumulative');
				poll.should.have.property('choices', ['Choice 1', 'Choice 2', 'Choice 3']);
				poll.should.have.property('votes', [0, 0, 0]);
				done();
			});
		});

		it('should exist in the database', function(done){
			Poll.count(fakePoll, function(err, count){
				should.not.exist(err);
				count.should.be.exactly(1);
				done();
			});
		});
	})
})