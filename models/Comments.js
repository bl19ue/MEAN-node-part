var mongoose = require('mongoose');

var CommentsSchema = new mongoose.Schema({
	body	: String,
	author	: String, 
	upvotes	: {type: Number, default: 0}, 
	news 	: {type: mongoose.Schema.Types.ObjectId, ref: 'News'},
});

mongoose.model('Comments', CommentsSchema);