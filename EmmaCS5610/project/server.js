var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer'); 
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var mongoose      = require('mongoose');
//var db = mongoose.connect('mongodb://localhost/test');
var connectionString = 
process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/recipe';
mongoose.connect(connectionString);

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    gender: String,
    email: String,
    roles: [String]
});

var UserModel = mongoose.model('UserModel', UserSchema);


var FollowSchema = new mongoose.Schema({
    follower: String,
    befollowed: String,
    befollowedName: String
});

var FollowModel = mongoose.model('FollowModel', FollowSchema);


var LikeSchema = new mongoose.Schema({
    likeUId: String,
    likeRId: String,
    likeRName: String,
    likeRImage: String
});

var LikeModel = mongoose.model('LikeModel', LikeSchema);


var ReviewSchema = new mongoose.Schema({
    reviewUId: String,
    reviewRId: String,
    reviewRLabel: String,
    reviewComment: String
});

var ReviewModel = mongoose.model('ReviewModel', ReviewSchema);


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(session({ secret: 'this is the secret' }));
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

//var users =
//[
//    {username: 'alice', password: 'alice', firstName: 'Alice', lastName: 'Wonderland', roles: ['admin', 'student', 'instructor']},
//    {username: 'bob', password: 'bob', firstName: 'Bob', lastName: 'Marley', roles: ['student']},
//    {username: 'charlie', password: 'charlie', firstName: 'Charlie', lastName: 'Brown', roles: ['instructor']}
//];

passport.use(new LocalStrategy(
function(username, password, done)
{
//    for(var u in users)
//    {
//        if(username == users[u].username && password == users[u].password)
//        {
//            return done(null, users[u]);
//        }
//    }
    UserModel.findOne({username: username, password: password}, function(err, user)
    {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        return done(null, user);
    })
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.post("/login", passport.authenticate('local'), function(req, res){
    var user = req.user;
    console.log(user);
    res.json(user);  
});

app.get("/loggedin", function(req, res)
{
    res.send(req.isAuthenticated() ? req.user : '0');
});
    
app.post("/logout", function(req, res)
{
    req.logOut();
    res.send(200);
});     

app.post("/register", function(req, res)
{
    var newUser = req.body;
    newUser.roles = ['member'];
    UserModel.findOne({username: newUser.username}, function(err, user)
    {
        if(err) { return next(err); }
        if(user)
        {   
            res.json(null); 
            return;
        }
        var newUser = new UserModel(req.body);
        newUser.save(function(err, user)
        {
            req.login(user, function(err)
            {
                if(err) { return next(err); }
                res.json(user);
            });
        });
    });
});

var auth = function(req, res, next)
{
    if (!req.isAuthenticated())
        res.send(401);
    else
        next();
};

app.get("/rest/user", auth, function(req, res)
{
    UserModel.find(function(err, users)
    {
        res.json(users);
    });
});

app.delete("/rest/user/:id", auth, function(req, res){
    UserModel.findById(req.params.id, function(err, user){
        user.remove(function(err, count){
            UserModel.find(function(err, users){
                res.json(users);
            });
        });
    });
});

app.put("/rest/user/:id", auth, function(req, res){
    UserModel.findById(req.params.id, function(err, user){
        user.update(req.body, function(err, count){
            UserModel.find(function(err, users){
                res.json(users);
            });
        });
    });
});

app.post("/rest/user", auth, function(req, res){
    UserModel.findOne({username: req.body.username}, function(err, user) {
        if(user == null)
        {
            user = new UserModel(req.body);
            user.save(function(err, user){
                UserModel.find(function(err, users){
                    res.json(users);
                });
            });
        }
        else
        {
            UserModel.find(function(err, users){
                res.json(users);
            });
        }
    });
});

app.get("/follow/:uid", auth, function(req, res)
{
    FollowModel.find({follower: req.params.uid}, function(err, follows)
    {
        res.json(follows);
        console.log(follows);
    });
});


app.delete("/follow/:id", auth, function(req, res){
    FollowModel.findById(req.params.id, function(err, follow){
        var followerId = follow.follower;
        follow.remove(function(err, count){
            FollowModel.find({follower: followerId},function(err, follows){
                res.json(follows);
                console.log("after delete");
                    console.log(follows);
            });
        });
    });       
});

app.post("/follow/:id", auth, function (req, res){
    FollowModel.findOne({follower: req.body._id, befollowed: req.params.id}, function(err,follow){
        if(follow == null)
        {
            follow = new FollowModel();
            follow.follower = req.params.id;
            follow.befollowed = req.body._id;
            follow.befollowedName = req.body.username;
            follow.save(function (error, follow){
                FollowModel.find({follower: req.params.id},function(err, follows){
                    res.json(follows);
                });
            });
        }
        else
        {

              FollowModel.find({follower: req.params.id},function(err, follows){
                    res.json(follows);
                });
        } 
    });
});


app.get("/like/:uid", auth, function(req, res)
{
    LikeModel.find({likeUId: req.params.uid}, function(err, likes)
    {
        res.json(likes);
    });
});

app.delete("/like/:id", auth, function(req, res){
    LikeModel.findById(req.params.id, function(err, like){
        var likeUId = like.likeUId;
        like.remove(function(err, count){
            LikeModel.find({likeUId: likeUId},function(err, likes){
                res.json(likes);
            });
        });
    });
});


app.post("/like/:id", auth, function (req, res){

    LikeModel.findOne({likeRName: req.body.recipe.label, likeUId: req.params.id}, function(err,like){
    console.log(like);
        if(like == null)
        {
            like = new LikeModel();
            like.likeUId = req.params.id;
 
            var strs = new Array();
            strs = req.body.recipe.uri.split("_");
            like.likeRId = strs[1];
            like.likeRName = req.body.recipe.label; 
         
            like.likeRImage = req.body.recipe.image;
         
            like.save(function (error, like){
                LikeModel.find({likeUId: req.params.id},function(err, likes){
                    res.json(likes);
                    console.log(likes);
                });
            });
        }
        else
        {
             LikeModel.find({likeUId: req.params.id},function(err, likes){
                    res.json(likes);
                    console.log(likes);
                });
        } 
    });
});


app.get("/review/other/:rid", function(req, res)
{
    ReviewModel.find({reviewRId: req.params.rid},function(err, reviews)
    {   
        res.json(reviews);
        console.log("return reviews");
        console.log(reviews);

    });
});

app.get("/review/:uid", auth, function(req, res)
{
    ReviewModel.find({reviewUId: req.params.uid}, function(err, reviews)
    {
        res.json(reviews);
    });
});

app.post("/review/:id", auth, function (req, res){

    ReviewModel.findOne({reviewRId: req.body.recipeId, reviewUId: req.params.id}, function(err,review){
    console.log(review);
        if(review == null)
        {
            review = new ReviewModel();
            review.reviewRId = req.body.recipeId;
            review.reviewUId = req.params.id;    
            review.reviewRLabel = req.body.currentRecipe[0].label; 
            review.reviewComment = req.body.comment;
         
            review.save(function (error, review){
                ReviewModel.find({reviewUId: req.params.id},function(err, reviews){
                    res.json(reviews);
                    console.log(reviews);
                });
            });
        }
        else
        {
            ReviewModel.find({reviewUId: req.params.id},function(err, reviews){
                    res.json(reviews);
                    console.log(reviews);
                });
        } 
    });
});



var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ip);
//app.listen(3000);