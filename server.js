// require express and other modules
var express = require('express'),
    app = express(),
    Products = require('./models/product.js'),
    bodyParser = require('body-parser'),  // for data from the request body
    session = require('express-session'),
    mongoose = require('mongoose');       // to interact with our db


// connect to mongodb
mongoose.connect(
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/bangle-band', function(){
  	console.log('mongo is open');
  }
);	

//serve js and css files
app.use(express.static(__dirname + '/public'));

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));
// for parsing application/json
app.use(bodyParser.json()); 

// configure session
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: process.env.SESSION_SECRET || require('./config').SESSION_SECRET,
  cookie: { maxAge: 60000 }
}));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/views/index.html')
})

app.get('/shop/:productName', function(req, res){
	res.sendFile(__dirname + '/public/views/templates/single.html')
})

app.get('/cart', function(req, res){
	res.sendFile(__dirname + '/public/views/templates/cart.html')
})

app.get('/press', function(req, res){
    res.sendFile(__dirname + '/public/views/templates/press.html')
})


app.get('/api/products/:productName', function(req, res){
	console.log('first console log working');
	Products.findOne({"productName": req.params.productName}).exec(function(err, product){
		console.log(product + 'Hello this is working.');
		res.json(product);
	});
})

app.get('/api/products', function(req, res){
	Products.find().exec(function(req,products){
		res.send(products);
	});
})

app.get('/api/products/id', function(req, res){
	console.log('id request hit server');
	Products.findOne({_id: req.params.id}).exec(function(err, obj){
		console.log(obj + 'Hello this is working.');
		res.send(obj);
	});
})


// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('server started on localhost:3000');
});