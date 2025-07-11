// server.js
const express = require('express');
const path = require('path'); // Node.js module for working with file paths
// const nodemailer = require('nodemailer'); // Import Nodemailer
// const axios = require('axios'); // Import Axios for making HTTP requests

const app = express();
const port = 3000; // You can choose any available port

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data (if you were to use JSON in requests)
app.use(express.json());

// Middleware to serve static files (CSS, client-side JS, images)
// Create a 'public' folder in your project root for these files.
app.use(express.static(path.join(__dirname, 'public')));

// --- ROUTES FOR PAGE NAVIGATION ---

// Route for the homepage
app.get('/', (req, res) => {
  // console.log("/")
    res.sendFile(path.join(__dirname, 'public', 'pages', '_index.html'));
});

app.get('/:pageID',  (req, res) => {
    const pageID = req.params.pageID
    // console.log(pageID)
    res.sendFile(path.join(__dirname, 'public', 'pages', '_index.html'));
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});