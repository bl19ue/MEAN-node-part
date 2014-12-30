//News model

var mongoose = require('mongoose');

var NewsSchema = new mongoose.Schema({	//News Schema
	title	: String,
	link	: String,
	upvotes : {type: Number, default: 0},
	comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comments'}]
});

NewsSchema.methods.upvote = function(cb){			//A new method for the NewsSchema, which updates the vote by 1 when called
	this.upvotes += 1;
	this.save(cb);
};

mongoose.model('News', NewsSchema);