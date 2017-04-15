let mongoose 	= require('mongoose')
let Schema 		= mongoose.Schema

let studentSchema = new Schema({
    id 				: String,
 	classes 		:[String],
 	email 			: String,
 	password 		: String
});

let studentModel = mongoose.model('Student', studentSchema);

module.exports = {
	Schema : studentSchema,
	Model  : studentModel
}