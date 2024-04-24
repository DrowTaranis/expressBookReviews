const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    let response = "";
    let taken = 0;
    for (let i = 0; i < users.length; i++ ) {
        if (users[i].username === req.query.username && req.query.username !== "") {
response += "This user has already registered."; taken++
        }
        if (req.query.username  === "") {response += "Please enter a username"} 
        if (req.query.password === "") {response += "Please enter a password."}
    } 

    if (taken === 0 && response === "") {
    users.push({"username":req.query.username,"password":req.query.password});
    res.send("The user" + (' ')+ (req.query.username) + " has been added!")
    }
    else res.send(response);

});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn])
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const authorA = req.params.author;
    const filteredAuthors = [];
    const keys = Object.keys(books);
    keys.forEach(key => {
        if (books[key].author === authorA) {
            filteredAuthors.push(books[key]);
        }
    });
    res.send(filteredAuthors);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const titleA = req.params.title;
    const filteredTitles = [];
    const keys = Object.keys(books);
    keys.forEach(key => {
        if (books[key].title === titleA) {
            filteredTitles.push(books[key]);
        }
    });
    res.send(filteredTitles);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]["reviews"])
});

module.exports.general = public_users;
