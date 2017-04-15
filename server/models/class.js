var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var classSchema = new Schema({
    id 					: String,
    students 			: {
    	[String] // this is an id to a student
    },
    professor 			: String,
    numberOfLectures	: Number,
    isPrivate 			: Boolean, 
    transcripts 		: {
    	[String] // this is an id to a transcript
    }
});

let classModel = mongoose.model('Class', classSchema);

module.exports = {
	Schema : classSchema,
	Model  : classModel
}