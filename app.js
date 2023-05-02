// Set up variables
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
require('dotenv/config')


// Connect to MongoDB
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true})
  .then(() => console.log("Connected To MongoDB"))
  .catch((error) => console.error("Error Connecting To MongoDB", error));
// Connect to MongoDB





// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
    }
);

app.get('/posts', (req, res) => {
    res.send('Hello Posts!');
    }
);


// Start server
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port} !`);
    }
);