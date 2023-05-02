// Set up variables
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');

const password = process.env.MONGO_PASSWORD;

// Connect to MongoDB
mongoose.connect(`mongodb+srv://tombos255:${password}@maincluster.2x1yo3z.mongodb.net/?retryWrites=true&w=majority`)
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

