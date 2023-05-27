// Import .env variables
require("dotenv/config");

// Set up variables
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

// Parse JSON
app.use(bodyParser.json());

// Import Routes
const usersRoute = require("./routes/new-user");
const entriesRoute = require("./routes/entries");
const loginRoute = require("./routes/login.js");

// verify API KEY
app.use((req, res, next) => {
	const providedApiKey = req.headers["x-api-key"];
	if (!providedApiKey || providedApiKey !== process.env.API_KEY) {
		return res.status(401).json({ message: "Invalid API key" });
	}
	next();
});

// Middleware
app.use("/new-user", usersRoute);
app.use("/login", loginRoute);
app.use("/entries", entriesRoute);


// Routes
app.get("/*", (req, res) => {
	res.json({ message: "Invalid URL" });
});

// CORS
app.use(cors());

// Start server
app.listen(port, () => {
	console.log(`Example app listening on port http://localhost:${port} !`);
});

// Connect to MongoDB
mongoose
	.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
	.then(() => console.log("Connected To MongoDB"))
	.catch((error) => console.error("Error Connecting To MongoDB", error));
// Connect to MongoDB
