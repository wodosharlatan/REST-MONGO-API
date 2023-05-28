const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const saltedSha256 = require("salted-sha256");
const UIDGenerator = require("uid-generator");
const uidgen = new UIDGenerator();

// Import .env variables
require("dotenv/config");

// Submit a user
router.post("/", async (req, res) => {
	try {
		const username = req.body.username;
		username.trim();

		// Check if username already exists
		const users = await User.findOne({ Username: username });

		if (!users) {
			res.json({ message: "User doesn't exist" });
			return;
		}

		const password = req.body.password;
		const hashedPassword = saltedSha256(`${password.trim()}`, "SALT");

		// Check if password is correct
		if (users.Password !== hashedPassword) {
			res.json({ message: "Incorrect password" });
			return;
		}

		// Generate UID
		const randomToken = await uidgen.generate();

		// Update user
		await User.updateOne(
			{ Username: username },
			{
				$set: {
					UserToken: randomToken,
				},
			}
		);

		res.json({ message: "Successfully logged in" });
		return;
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
