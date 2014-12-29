//News model

var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({	//News Schema
	title	: String,
	link	: String,
	upvotes : {type: Number, default: 0},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}]
});

mongoose.model('News', NewsSchema);