const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const UIDGenerator = require("uid-generator");
const uidgen = new UIDGenerator();
const saltedSha256 = require("salted-sha256");

// Import .env variables
require("dotenv/config");

// Submit a user
router.post("/", async (req, res) => {
	try {
		const username = req.body.username.trim();

		// Check if username already exists
		const users = await User.findOne({ Username: username });

		if (users) {
			res.json({ message: "Username already exists" });
			return;
		}

		const password = saltedSha256(`${req.body.password.trim()}`, "SALT");

		// Generate UID
		const randomToken = await uidgen.generate();

		// Create new user
		const user = new User({
			Username: username,
			Password: password,
			UserToken: randomToken,
		});

		// Save user
		user
			.save()
			.then(() => {
				res.json({ message: "User saved successfully" });
				return;
			})
			.catch((err) => {
				res.json({ message: err.toString() });
				return;
			});
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
