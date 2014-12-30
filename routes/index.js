var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var News = mongoose.model('News');
var Comments = mongoose.model('Comments');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/news', function(req, res, next){
	News.find(function(err, news){
		if(err) {return next(err);}
		
		res.json(news);
	});
});

router.post('/news', function(req, res, next){
	var news = new News(req.body);
	
	news.save(function(err, news){
		if(err) {return next(err);}
		
		res.json(news);
	});
});


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
	res.json(req.news);
});

router.put('/news/:news/upvote', function(req, res, next){		//Put method to update a vote with one
	req.news.upvote(function(err, news){
		if(err) {return next(err);}
		
		res.json(news);
	});
});

module.exports = router;
