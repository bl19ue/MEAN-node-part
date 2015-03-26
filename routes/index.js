var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');


var Company = mongoose.model('Company');
var Jobs = mongoose.model('Jobs');

var News = mongoose.model('News');
var Comments = mongoose.model('Comments');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.param('company', function(req, res, next, id){
	var query = Company.findById(id);
	console.log("id in param = " + id);
	query.exec(function(err, company){
		if(err) {return next(err);}
		if(!company) {return next(new Error("Can't find news"));}

		req.company = company;
		console.log("company in param = " + company);
		return next();
	});
});


router.get('/company', function(req, res) {
	res.render('company', { title: 'Company' });
});

router.post('/company', function(req, res, next){
	var username = req.body.username;
	var password = req.body.password;

	var query = Company.findOne({username : username});

	query.exec(function(err, company){
		console.log("company in post=" + company);
		if(err) return next(err);
		else if(company == null){ 
			res.json({
				problem: "NA"

			});
		}
		else{
			if(company.password == password){
				company.problem = "F";
				res.json(company);
			}
			else{
				res.json({
					problem: "NA"
				});
			}
		}
	});
});

router.post('/company/signup', function(req, res, next){
	var company = new Company(req.body);

	company.save(function(err, company){
		if(err) { return next(err); }
		res.json(company);
	});
});

router.get('/company/:company/jobs', function(req, res){
	req.company.populate('jobs', function(err, company){
		console.log("population = " + company.jobs);
		res.json(req.company);
	});
});

router.post('/company/:company/jobs', function(req, res, next){
	console.log("req.body="+req.body.company);
	var job = new Jobs(req.body);
	console.log("job="+ job);
	//job.company.push(req.company);
	job.save(function(err, job){
		if(err) { return next(err); }
		
		req.company.jobs.push(job);
		req.company.save(function(err, company){
			if(err) { return next(err); }
			
			res.json(job);
		});
	});
});





/* GET all news */
router.get('/news', function(req, res, next){
	News.find(function(err, news){
		if(err) {return next(err);}

		res.json(news);
	});
});



/* POST a news */
router.post('/news', function(req, res, next){
	var news = new News(req.body);

	news.save(function(err, news){
		if(err) {return next(err);}

		res.json(news);
	});
});

/*=======================================================================================================================*/
//This is actually a middleware where we can for example validate the url parameter which is passed etc.
router.param('news', function(req, res, next, id){ 		//Express params(automatically load objects) helps to get the id for a particular model
	var query = News.findById(id);						//Searching one particular document

	query.exec(function(err, news){
		if(err) {return next(err);}
		if(!news) {return next(new Error("Can't find news"));}

		req.news = news;
		return next();									//Moves to the next controlling function
	});
});

//If any request comes to this, it goes first to param('news')
router.get('/news/:news', function(req, res){
	req.news.populate('comments', function(err, news){			//Populate cause we want to populate all the comments related to a particular news
		res.json(req.news);
	});
});

/*=======================================================================================================================*/

/* Updating votes for news */
router.put('/news/:news/upvote', function(req, res, next){		//Put method to update a vote with one
	req.news.upvote(function(err, news){						//calling upvote method in the schema
		if(err) {return next(err);}

		res.json(news);
	});
});

/* POST a comment for a particular news */
router.post('/news/:news/comments', function(req, res, next){
	//console.log("body=" + req.body);
	var comment = new Comments(req.body);

	comment.save(function(err, comment){
		if(err) {return next(err);}

		req.news.comments.push(comment);
		req.news.save(function(err, news){
			if(err) {return next(err);}

			res.json(comment);
		});
	});
});



/* Middleware for comment */
router.param('comment', function(req, res, next, id){
	var query = Comments.findById(id);

	query.exec(function(err, comment){
		if(err) {return next(err);}
		if(!comment) {return next(new Error("Can't find Comment"));}

		req.comment = comment;
		return next();
	});
});


/* Updating votes of a particular comment of a news */
router.put('/news/:news/comments/:comment/upvote', function(req, res, next){
	req.comment.upvote(function(err, comment){
		if(err) {return next(err);}

		res.json(comment);
	});
});
module.exports = router;
