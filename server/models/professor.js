let mongoose 	= require('mongoose');
let Schema 		= mongoose.Schema;

let professorSchema = new Schema({
    id 					: String,
 	classes 			: {
 		[String]
 	},
});

let professorModel = mongoose.model('Professor', professorSchema);

module.exports = {
	Schema : professorSchema,
	Model  : professorModel
}