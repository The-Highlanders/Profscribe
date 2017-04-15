let mongoose 	= require('mongoose')
let bcrypt  	= require('bcrypt-nodejs');
let Schema 		= mongoose.Schema

let accountSchema = new Schema({
	email 		: String,
    password	: String,
    _professor	: {
    	type 	: Schema.Types.ObjectId,
    	ref 	:'Professor'
    },
    _student 	: {
    	type 	: Schema.Types.ObjectId, 
    	ref  	:'Student'
    }
})

accountSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
accountSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

let accountModel = mongoose.model('Account', accountSchema);

module.exports = {
	Schema : accountSchema,
	Model  : accountModel
}