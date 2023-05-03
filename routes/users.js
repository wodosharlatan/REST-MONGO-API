const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const axios = require("axios");
const { ValidateToJson } = require("../functions/functions.js");

// Import .env variables
require("dotenv/config");

// localhost:3000/users => get all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();

		// Convert the data to JSON using the ValidateToJson function
		jsonString = ValidateToJson("all_users", users);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (error) {
		console.log(error);
		res.json({ message: error.toString() });
	}
});

// localhost:3000/users => submit a user
router.post("/", async (req, res) => {
	// Get the current number of users
	const currentID = await axios.get(process.env.API_URL_USERS);

	const ID_List = [];

	// Get all the current user id's
	for (let i = 0; i < currentID.data.length; i++) {
		ID_List.push(currentID.data[i].User_ID);
	}

	// check if the new id is already in the database
	let newID = 1;
	while (ID_List.includes(newID.toString())) {
		newID++;
	}

	newID = newID.toString();

	const user = new User({
		Username: req.body.Username,
		Password: req.body.Password,
		User_ID: newID,
	});

	try {
		const savedUser = await user.save();

		jsonString = ValidateToJson("new_user", savedUser);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (err) {
		res.json({ message: err.toString() });
	}
});

// localhost:3000/user/:userId => get a specific user
router.get("/:User_ID", async (req, res) => {
	try {
		const validatedUser = await User.findOne({ User_ID: req.params.User_ID });

		jsonString = ValidateToJson("specific_user", validatedUser);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// delete a specific user
router.delete("/:User_ID", async (req, res) => {
	try {
		const removedUser = await User.deleteOne({ User_ID: req.params.User_ID });

		jsonString = ValidateToJson("removed_user", removedUser);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (error) {
		console.log(error);
		res.json({ message: error.toString() });
	}
});

// update a specific user
router.patch("/:User_ID", async (req, res) => {
	try {
		const updatedUser = await User.updateOne(
			{ User_ID: req.params.User_ID },
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
