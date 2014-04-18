var mongoose = require('mongoose');
var Poll = require('../models/Poll');

var voteSchema = new mongoose.Schema({
	choice: String,
	poll: Object,
});

module.exports = mongoose.model('Vote', voteSchema);