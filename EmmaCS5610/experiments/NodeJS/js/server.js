var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

app.use(express.static(__dirname + '/public'));

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/weather';
mongoose.connect(connectionString);


var EventSchema = new mongoose.Schema({
   name: String
   //created:{type: Date, default: Date.now}
},{collection: 'event'});

var CitySchema = new mongoose.Schema({
    name: String,
    country: String,
    temperature: String,
    weather: String,
    wind: String,
    humidity: String,
    events:[EventSchema]
},{collection: 'city'});

var CityModel = mongoose.model('CityModel', CitySchema);


//create city
app.post("/city", function(req,res) {
    var city1 = new CityModel(req.body);
    city1.save(function (err,doc) {
      CityModel.find(function (err,data) {
        res.json(data);
        }); 
    });  
});

/*app.put("/city/:id", function(req,res){
  cities[req.params.id] = req.body;
  res.json(cities);
});*/

app.put("/city/:id", function(req,res){
  CityModel.update({_id:req.params.id},{$set: req.body}, function(err,doc){
     CityModel.find(function (err,data) {
        res.json(data);
    });
  });
});

//delete city by id
app.delete("/city/:id",function(req,res){
    CityModel.findById(req.params.id, function (err,doc) {
        doc.remove();
        CityModel.find(function (err,data) {
        res.json(data);
        });
    });     
});

app.delete("/city/:cityId/event/:eventIndex", function(req,res){
   cities[req.params.cityId].events.splice(req.params.eventIndex);
   res.json(cities);
});

//find all events for one city
app.get("/city/:cid/event", function (req,res) {
  CityModel.findById(req.params.cid, function(err, doc){
     res.json(doc.events);  
  });
});


//find all cities
app.get("/city", function (req, res) {
    CityModel.find(function (err,data) {
        res.json(data);
    });
});

//find city by id
app.get("/city/:index", function (req, res) {
    CityModel.findById(req.params.id, function(err, doc) {
      res.json(doc);
    });
});


var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port, ip);