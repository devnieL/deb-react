var Views = require("./../controllers/Views");

module.exports = function(app){
	app.get('/', Views.index);
}
