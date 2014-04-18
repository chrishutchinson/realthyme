var Poll = require('../models/Poll');
var Vote = require('../models/Vote');
var settings = require('../config/settings');
var flash = require('connect-flash');

exports.get = function(req, res) {
	Poll.find(function(err, polls){
		// Handle errors
		if(err) return res.render('error', {error: err});

		res.render('polls/index', {
			polls: polls,
			title: 'View All Polls',
			buttons: [
				{ label: 'Add New', icon: 'plus', link: '/polls/create' },
			],
			messages: req.flash('message'),
		});
	});
}

exports.create = function(req, res){
	res.render('polls/form', { title: 'Create New Poll', action: 'Create' });
}

exports.view = function(req, res){
	Poll.findOne({ _id: req.params.id }, function(err, poll){
		// Handle errors
		if(err){
			return res.render('error', {error: err});
		}

		res.render('polls/view', {
			poll: poll,
			title: 'View Poll',
			buttons: [
				{ label: 'Edit', icon: 'pencil', link: '/polls/' + poll.id + '/edit' },
			]
		});
	});
}

exports.vote = function(req, res){
	Poll.findOne({ _id: req.params.id }, function(err, poll){
		// Handle errors
		if(err){
			return res.render('error', {error: err});
		}

		res.render('polls/vote', {
			poll: poll,
			title: 'Vote: ' + poll.title,
		});
	});
}

exports.edit = function(req, res){
	Poll.findOne({ _id: req.params.id }, function(err, poll){
		// Handle errors
		if(err){
			return res.render('error', {error: err});
		}

		res.render('polls/form', {
			poll: poll,
			title: 'Edit Poll',
			action: 'Edit'
		});
	});
}

exports.update = function(req, res, next) {
	req.assert('title', 'Title cannot be empty').notEmpty();
	req.assert('description', 'Description cannot be empty').notEmpty();
	req.assert('type', 'Type cannot be empty').notEmpty();

	var errors = req.validationErrors();
	if(errors){
		return res.render('polls/form', {
			title: 'Edit Poll',
			action: 'Edit',
			body: req.body,
			errors: errors
		});
	}
	Poll.update(
		{ _id: req.params.id }, 
		{
			title: req.body.title,
			description: req.body.description,
			type: req.body.type,
		},
		function(err){
			// Handle errors
			if(err){
				return res.render('error', {error: err});
			}

			res.redirect('polls');
		}
	);
}

exports.postCreate = function(req, res, next) {
	req.assert('title', 'Title cannot be empty').notEmpty();
	req.assert('description', 'Description cannot be empty').notEmpty();
	req.assert('type', 'Type cannot be empty').notEmpty();
	req.assert(['choices', 'first'], 'First Choice cannot be empty').notEmpty();
	req.assert(['choices', 'second'], 'Second Choice cannot be empty').notEmpty();

	var errors = req.validationErrors();
	if(errors){
		return res.render('polls/form', {
			title: 'Create New Poll',
			action: 'Create',
			body: req.body,
			errors: errors
		});
	}
	var poll = new Poll({
		title: req.body.title,
		description: req.body.description,
		type: req.body.type,
		choices: [req.body.choices],
	});

	poll.save(function(err){
		// Handle errors
		if(err){
			return res.render('error', {error: err});
		}

		// Notifications
		req.flash('message', [
			{
				text: 'Successfully created poll',
				type: 'success',
			}
		]);

		// Redirect to polls
		res.redirect('polls');
	});
}

exports.postVote = function(req, res, next) {
	req.assert('choice', 'Choice cannot be empty').notEmpty();

	var errors = req.validationErrors();
	if(errors){
		return res.json(errors);
	}

	Poll.findOne({ _id: req.params.id }, function(err, poll){
		// Handle errors
		if(err){
			return res.json(err);
		}

		var vote = new Vote({
			choice: req.body.choice,
			poll: poll,
		});

		vote.save(function(err){
			// Handle errors
			if(err){
				return res.json(err);
			}

			res.json(vote);
		});
	});
}

exports.delete = function(req, res){
	Poll.remove({ _id: req.params.id }, function(err){
		// Handle errors
		if(err){
			return res.render('error', {error: err});
		}

		// Notifications
		req.flash('message', [
			{
				text: 'Successfully deleted poll',
				type: 'success',
			}
		]);

		res.redirect('polls');
	});

	
}