const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const axios = require("axios");
const { ValidateToJson } = require("../functions/functions.js");

// Import .env variables
require("dotenv/config");

const config = {
	headers: {
		"x-api-key": `${process.env.API_KEY}`,
	},
};

// Get all usernames
router.get("/", async (req, res) => {
	usernames = [];

	try {
		const users = await User.find();

		for (let i = 0; i < users.length; i++) {
			usernames.push({ username: users[i].Username });
		}

		res.json(usernames);
	} catch (error) {
		console.log(error);
		res.json({ message: error.toString() });
	}
});

// Submit a user
router.post("/", async (req, res) => {
	axios
		.get(process.env.API_URL_USERS, config)
		.then((response) => {
			for (let i = 0; i < response.data.length; i++) {
				if (response.data[i].username == req.body.username) {
					res.send({ message: "Username already exists" });
					return;
				}
			}

			// Create new user
			const user = new User({
				Username: req.body.username,
				Password: req.body.password,
			});

			// Save user
			user
				.save()
				.then(() => {
					res.send({ message: "User saved successfully" });
				})
				.catch((err) => {
					res.json({ message: err.toString() });
				});
		})
		.catch((error) => {
			res.json({ message: error.toString() });
		});
});

// localhost:3000/user/:userId => get a specific user
router.get("/:Username", async (req, res) => {
	try {
		const validatedUser = await User.findOne({ Username: req.params.Username });

		jsonString = ValidateToJson("specific_user", validatedUser);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// delete a specific user
router.delete("/:Username", async (req, res) => {
	try {
		const removedUser = await User.deleteOne({ Username: req.params.Username });

		jsonString = ValidateToJson("removed_user", removedUser);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (error) {
		console.log(error);
		res.json({ message: error.toString() });
	}
});

// update a specific user
router.patch("/:Username", async (req, res) => {
	try {
		const updatedUser = await User.updateOne(
			{ Username: req.params.Username },
			{ $set: { Username: req.body.Username, Password: req.body.Password } }
		);

		jsonString = ValidateToJson("updated_user", updatedUser);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (error) {
		console.log(error);
		res.json({ message: error.toString() });
	}
});

module.exports = router;
