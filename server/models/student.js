let mongoose 	= require('mongoose')
let Schema 		= mongoose.Schema

let studentSchema = new Schema({
 	classes : [String]
})

let studentModel = mongoose.model('Student', studentSchema);

module.exports = {
	Schema : studentSchema,
	Model  : studentModel
}