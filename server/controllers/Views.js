var request = require('superagent');
var env = require("./../config/env")[process.env.NODE_ENV || 'development'];

/**
 * Main view
 */

exports.index = function(req, res){

	console.log('user', req.user);

	res.render("Index.jsx", {
		user : req.session.user
	});
};
