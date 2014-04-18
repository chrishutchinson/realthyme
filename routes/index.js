var settings = require('../config/settings');

/* GET home page. */
exports.index = function(req, res){
  res.render('index', { title: settings.title });
};
