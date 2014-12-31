var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var News = mongoose.model('News');
var Comments = mongoose.model('Comments');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
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
