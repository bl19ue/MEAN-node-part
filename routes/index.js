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

module.exports = router;
