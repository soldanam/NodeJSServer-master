var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Book = require('./models/book');

mongoose.connect('mongodb://localhost:27017/store')

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var server = app.listen(80,function() {
    console.log("Express server has started on port 80");
})

app.locals.pretty = true;


app.get('/get-data', function(req, res) {
  Book.find(function(err, books){
        if(err) return res.status(500).send({error: 'database failure'});
        res.send(books);
    })
});

app.post('/insert', function(req, res,next){
    var newBook = new Book();
    newBook.ID= req.body.ID;
    newBook.PASSWORD = req.body.PASSWORD;
    console.log("\n\n post req.body.ID="+req.body.ID);
    newBook.save(function(err){
        if(err){
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.send("Succes Insertion");
    });
});

app.post('/delete', function(req, res, next){
    console.log("\n\n delete req="+req);
    Book.remove({ _id: req.body.id }, function(err, output){
        if(err) return res.status(500).json({ error: "database failure" });
        //res.status(204).end();
        //res.json({ message: “book deleted” });
        res.send("Succes Deletion");
    })
});

module.exports = app;
