var mongoose = require('mongoose');

var CommentsSchema = new mongoose.Schema({
	body	: String,
	author	: String, 
	upvotes	: {type: Number, default: 0}, 
	news 	: {type: mongoose.Schema.Types.ObjectId, ref: 'News'},
});

CommentsSchema.methods.upvote = function(cb){
	this.upvotes += 1;
	this.save(cb);
	
}

mongoose.model('Comments', CommentsSchema);