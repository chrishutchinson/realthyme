var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
	title: String,
	description: String,
	type: String,
	choices: Object,
	votes: Object,
});

module.exports = mongoose.model('Poll', pollSchema);