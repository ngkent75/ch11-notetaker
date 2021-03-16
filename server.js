// dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');
const noteData = require('./db/db.json');
// sets up express app
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// routes


// api

// app.get('/api/notes', (req, res) => res.json(noteData));
app.get('/api/notes', (req, res) => res.json(noteData));
app.post('/api/notes', (req, res) => {
    req.body.id = uniqid();
    noteData.push(req.body);
    res.json(req.body);
    fs.writeFileSync('./db/db.json', JSON.stringify(noteData));
})

// html

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.delete('/api/notes/:id', (req, res) => {
    const findItem = (object) => object.id === req.params.id;
    noteData.splice(noteData.findIndex(findItem), 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(noteData));
    location.reload();
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));