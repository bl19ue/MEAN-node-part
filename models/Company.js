var mongoose = require('mongoose');
var CompanySchema = new mongoose.Schema({
	companyname :	String,
	companydesc :	String,
	username	:	String,
	password	: 	String,
	jobs		:	[{type: mongoose.Schema.Types.ObjectId, ref: 'Jobs'}]
});


mongoose.model('Company', CompanySchema, 'Companies');