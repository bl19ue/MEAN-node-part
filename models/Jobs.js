var mongoose = require('mongoose');

var JobsSchema = mongoose.Schema({
	jobtitle	:	String,
	jobdesc		:	String,
	jobskills	:	String,
	company		:	String
});

mongoose.model('Jobs', JobsSchema, 'Jobs'); 