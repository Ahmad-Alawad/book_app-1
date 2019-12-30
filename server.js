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
    this.title = data.volumeInfo.title;
    // this.image = data.image;
    this.authors = data.volumeInfo.authors;
    this.description =data.volumeInfo.description;

}
function bookHandler(res,req) {
    let title = req.query.title;
    // let title = data.volumeInfo.title;
    // let authorName = data.volumeInfo.authors;
    // let description = data.volumeInfo.description;
    // let image = data.volumeInfo.imageLinkes.thumbnail;
    getBook(title)
        .then((books) => {
            let book = books.map((data) => new Book(data));
            return book;
            // response.status(200).send(data);
            // console.log('hiiiiiiiii' ,data.body.items.volumeInfo)
        });
        res.render('pages/searches/show', { 'books':book})
        
    }
    function getBook(title) {
        const url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`;
        return superagent.get(url)
        // console.log(url)
        .then(data => {  
            console.log(data); 
            return data.body.items;
        });

}

app.get('*', (req, res) => {
    res.status(404).send('Not Found');
});
app.listen(PORT, () => {
    console.log('Working!!!!!!!');
});