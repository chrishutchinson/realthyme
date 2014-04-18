var settings = require('../config/settings');
var pollController = require('../controllers/poll');

/* GET index page. */
exports.index = function(req, res){
	pollController.get(req, res);
}

/* GET create page. */
exports.create = function(req, res){
	pollController.create(req, res);
};

/* POST new poll */
exports.add = function(req, res, next){
	pollController.postCreate(req, res, next);
}

/* GET view poll */
exports.view = function(req, res){
	pollController.view(req, res);
}

/* GET vote poll */
exports.vote = function(req, res){
	pollController.vote(req, res);
}

/* GET edit poll */
exports.edit = function(req, res){
	pollController.edit(req, res);
}

/* POST edit poll */
exports.update = function(req, res){
	pollController.update(req, res);
}

/* Get delete poll */
exports.delete = function(req, res){
	pollController.delete(req, res);
}

/* POST Add vote to poll */
exports.addVote = function(req, res){
	pollController.postVote(req, res);
}
