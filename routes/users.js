const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Import .env variables
require('dotenv/config')


// localhost:3000/users => get all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();

		fs.writeFileSync(
			"./JSON_data/all_users.json",
			JSON.stringify(users),
			(err) => {
				if (err) {
					console.log(err);
				} else {
					console.log("File written successfully\n");
				}
			}
		);

		const filePath = path.join(__dirname, "..", "JSON_data", "all_users.json");
		const fileContent = fs.readFileSync(filePath, "utf8");
		const entriesJson = JSON.parse(fileContent);

		const jsonString = JSON.stringify(entriesJson, null, 2);
		
		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);

	} catch (error) {
		console.log(error);
		res.json({ message: error });
	}
});


// localhost:3000/users => submit a user
router.post("/", async (req, res) => {

	// Get the current number of users and add 1 to it => this is the new user id
	const currentID = await axios.get(process.env.API_URL_USERS);
	const newID = (currentID.data.length + 1).toString();

	console.log(newID);

	const user = new User({
		Username: req.body.Username,
		Password: req.body.Password,
		User_ID:  newID,
	});

	try {
		const savedUser = await user.save();

		fs.writeFileSync(
			"./JSON_data/new_user.json",
			JSON.stringify(savedUser),
			(err) => {
				if (err) {
					console.log(err);
				} else {
					console.log("File written successfully\n");
				}
			}
		);

		const filePath = path.join(__dirname, "..", "JSON_data", "new_user.json");
		const fileContent = fs.readFileSync(filePath, "utf8");
		const entriesJson = JSON.parse(fileContent);

		const jsonString = JSON.stringify(entriesJson, null, 2);
		
		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (err) {
		res.json({ message: err });
	}
});


// localhost:3000/user/:userId => get a specific user
router.get("/:User_ID", async (req, res) => {
	try {
		const validatedUser = await User.findOne({ User_ID: req.params.User_ID });

		fs.writeFileSync(
			"./JSON_data/specific_user.json",
			JSON.stringify(validatedUser),
			(err) => {
				if (err) {
					console.log(err);
				} else {
					console.log("File written successfully\n");
				}
			}
		);

		const filePath = path.join(__dirname, "..", "JSON_data", "specific_user.json");
		const fileContent = fs.readFileSync(filePath, "utf8");
		const entriesJson = JSON.parse(fileContent);

		const jsonString = JSON.stringify(entriesJson, null, 2);
		
		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);


	} catch (error) {
		res.json({ message: error });
	}
});


// delete a specific user
router.delete("/:User_ID", async (req, res) => {
	try {
		const removedUser = await User.deleteOne({ User_ID: req.params.User_ID });

		fs.writeFileSync(
			"./JSON_data/removed_user.json",
			JSON.stringify(removedUser),
			(err) => {
				if (err) {
					console.log(err);
				} else {
					console.log("File written successfully\n");
				}
			}
		);

		const filePath = path.join(__dirname, "..", "JSON_data", "removed_user.json");
		const fileContent = fs.readFileSync(filePath, "utf8");
		const entriesJson = JSON.parse(fileContent);

		const jsonString = JSON.stringify(entriesJson, null, 2);
		
		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (error) {
		console.log(error);
		res.json({ message: error });
	}
});


// update a specific user
router.patch("/:User_ID", async (req, res) => {
	try {
		const updatedUser = await User.updateOne(
			{ User_ID: req.params.User_ID },
			{ $set: { Username: req.body.Username, Password: req.body.Password } }
		);

		fs.writeFileSync(
			"./JSON_data/updated_user.json",
			JSON.stringify(updatedUser),
			(err) => {
				if (err) {
					console.log(err);
				} else {
					console.log("File written successfully\n");
				}
			}
		);

		const filePath = path.join(__dirname, "..", "JSON_data", "updated_user.json");
		const fileContent = fs.readFileSync(filePath, "utf8");
		const entriesJson = JSON.parse(fileContent);

		const jsonString = JSON.stringify(entriesJson, null, 2);
		
		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (error) {
		console.log(error);
		res.json({ message: error });
	}
});

module.exports = router;
