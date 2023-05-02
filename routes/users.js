const express = require("express");
const router = express.Router();
const User = require("../models/user_model");

// localhost:3000/users => get all users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.json({ message: error });
	}
});

// localhost:3000/users => submit a user
router.post("/", async (req, res) => {
	const user = new User({
		title: req.body.title,
		description: req.body.description,
	});

	try {
		const savedUser = await user.save();
		res.json(savedUser);
	} catch (err) {
		res.json({ message: err });
	}
});

// localhost:3000/user/:userId => get a specific user
router.get("/:userId", async (req, res) => {
	try {
		const user = await Users.findById(req.params.userId);
		res.json(user);
	} catch (error) {
		res.json({ message: error });
	}
});

// delete a specific user
router.delete("/:userId", async (req, res) => {
	try {
		const removedUser = await Users.deleteOne({ _id: req.params.userId });
		res.json(removedUser);
	} catch (error) {
		console.log(error);
		res.json({ message: error });
	}
});

// update a specific user
router.patch("/:userId", async (req, res) => {
	try {
		const updatedUser = await Users.updateOne(
			{ _id: req.params.userId },
			{ $set: { title: req.body.title } }
		);
		res.json(updatedUser);
	} catch (error) {
		console.log(error);
		res.json({ message: error });
	}
});

module.exports = router;
