const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const mongoPwd = "MG841752!";
const dbName = "testDB";
const mongoConString = `mongodb+srv://testerDBuser:${mongoPwd}@cluster0.nfwjm.mongodb.net/${dbName}`;
mongoose.connect(mongoConString, {useNewUrlParser: true, useUnifiedTopology:true});

// ----------------------------------- Users -------------------
const userSchema = {
    name: String,
    address: String
};

const User = mongoose.model("User", userSchema);

app.route("/users")

.get(function(req, res) {
    
    User.find(function(err, foundUsers) {
        if (!err) {
            res.send(foundUsers);
        } else {
            res.send("The error is: " + err);
        }
    });
})

.post(function(req, res){
    const newUser = new User({
        name: req.body.title,
        address: req.body.content
    });
    console.log(newUser)
    newUser.save(function(err) {
        if(!err){
            res.send("successfully saved");
        } else {
            res.send("The error is: " + err);
        }
    });
});

// ----------------------------------- Articles -------------------
const ArticleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", ArticleSchema);

app.route("/articles")

.get(function(req, res) {
    Article.find(function(err, foundArticles) {
        if (!err) {
            res.send(foundArticles);
        } else {
            res.send("The error is: " + err);
        }
    });
})

.post(function(req, res) {
    
    const newArticle = new Article({
        title: req.body.title,
        content: req.body.content
    });
    console.log(newArticle)
    newArticle.save(function(err) {
        if(!err){
            res.send("successfully saved");
        } else {
            res.send("The error is: " + err);
        }
    });
});


// ----------------------------------- AmbientTemp -------------------
const AmbientTempSchema = {
    temp: Number
};
ambCollectionName = "first_prep_ambient_temp";

const AmbientTemp = mongoose.model("AmbientTemp", AmbientTempSchema, ambCollectionName);

app.route("/ambient-temp")

.get(function(req, res) {
    AmbientTemp.find(function(err, foundAmbientTemps) {
        if (!err) {
            res.send(foundAmbientTemps);
        } else {
            res.send("The error is: " + err);
        }
    });
});

// ----------------------------------- CurrentCons -------------------
const CurrentConsSchema = {
    temp: Number
};
CurrentConsCollectionName = "first_prep_current_consumption";

const CurrentCons = mongoose.model("CurrentCons", CurrentConsSchema, CurrentConsCollectionName);

app.route("/current-cons")

.get(function(req, res) {
    CurrentCons.find(function(err, foundCurrentCons) {
        if (!err) {
            res.send(foundCurrentCons);
        } else {
            res.send("The error is: " + err);
        }
    });
});


app.listen(3000, function() {
    console.log("Server in up and running at port 3000.");
});
