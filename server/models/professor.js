let mongoose 	= require('mongoose');
let Schema 		= mongoose.Schema;

let professorSchema = new Schema({
 	classes : [String]
});

let professorModel = mongoose.model('Professor', professorSchema);

module.exports = {
	Schema : professorSchema,
	Model  : professorModel
}