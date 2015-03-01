var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/emma', function (req, res) {
    res.send('emma test')
})

app.use(express.static(__dirname + '/public'));

var boston = {
    name: "Boston",
    country: "USA",
    temperature: "27",
    weather: "patchy light snow",
    wind: "7",
    humidity: "86",
    event: [
    {name: "skee"},
    {name: "boating"},
    {name: "visting museum"}
    ]
};
var beijing = {
    name: "Beijing",
    country: "China",
    temperature: "18",
    weather: "Sunny",
    wind: "0",
    humidity: "85",
    event: [
    { name: "boating" },
    { name: "visting museum" }
    ]
};
var baoji = {
    name: "Baoji",
    country: "China",
    temperature: "33",
    weather: "Sunny",
    wind: "5",
    humidity: "3500",
    event: [
    { name: "hiking" }
    ]
};
var los = {
    name: "Los Angeles",
    country: "USA",
    temperature: "84",
    weather: "Sunny",
    wind: "0",
    humidity: "11",
    event: [
    { name: "swimming" },
    { name: "boating" },
    ]
};
var cities = [boston, beijing, baoji, los];

app.post("/city", function(req,res) {
   var obj = req.body;
   cities.push(obj);
   res.json(cities);
});

app.put("/city/:id", function(req,res){
  cities[req.params.id] = req.body;
  res.json(cities);
});

app.delete("/city/:id",function(req,res){
    var index = req.params.id;
    cities.splice(index,1);
    res.json(cities);
});

app.get("/city", function (req, res) {
    res.json(cities);
});

app.get("/city/:index", function (req, res) {
    var idx = req.params.index;
    res.json(cities[idx]);
});

app.get("/city/:index/event", function (req, res) {
    var idx = req.params.index;
    res.json(cities[idx].event);
});

app.get("/city/:index/event/:eventIndex", function (req, res) {
    var idx = req.params.index;
    var eidx = req.params.eventIndex;
    res.json(cities[idx].event[eidx]);
});
app.listen(3000)