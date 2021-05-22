// dependencies
const express = require('express');
const path = require('path');

// sets the Express App
const app = express();
const PORT = 3000;

// handles data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// routes
// sends user to AJAX page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, 'notes.html')));


// listens to the PORT
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));