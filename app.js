// Set up variables
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");
const bodyParser = require('body-parser');

// Parse JSON
app.use(bodyParser.json());


// Import .env variables
require('dotenv/config')


// Import Routes
const postRoute = require('./routes/post');

// Middleware
app.use('/post', postRoute);
app.use(cors());
app.use(express.static(__dirname + "/public"));



// Routes
app.get("/*", (req, res) => {
	const filePath = path.join(__dirname, "error_page", "index.html");
	res.sendFile(filePath);
});



// Start server
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port} !`);
    }
);

// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true})
  .then(() => console.log("Connected To MongoDB"))
  .catch((error) => console.error("Error Connecting To MongoDB", error));
// Connect to MongoDB