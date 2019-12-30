'use strict';

const express = require('express');
const superagent = require('superagent');

const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;
// app.use(express.urlencoded());

app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.status(200).send('EJS Working !');
});
// app.get('/home', (req, res) => {

//     res.sendFile('./index.ejs', { root: './views/pages' });


// });
app.get('/home', (req, res) => {

    res.render('pages/index')


});
app.get('/books', bookHandler);
function Book(data) {
    this.title = data.title;
    this.image = data.image;
    this.authorName = data.authorName;
    this.description = data.description;

}
function bookHandler(data) {
    let title = data.volumeInfo.title;
    let authorName = data.volumeInfo.authors;
    let description = data.volumeInfo.description;
    let image = data.volumeInfo.imageLinkes.thumbnail;
    getBook(title, authorName, description, image)
        .then((data) => {
            response.status(200).send(data);
        });

}
function getBook(title, authorName, description, image) {
    const url = `https://www.googleapis.com/books/v1/volumes?q=amman`;
    return superagent.get(url)
        .then(data => {
            let book = new Book(title, authorName, description, image);
            return book;
            // res.render('./pages/searches/search', { 'books': data.body.items })
        });

}

app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});
app.listen(PORT, () => {
    console.log('Working!!!!!!!');
});