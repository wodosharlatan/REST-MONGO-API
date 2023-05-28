const express = require("express");
const router = express.Router();
const Entry = require("../models/entry_model");
const User = require("../models/user_model");
const { AuthenticateUser, generateID } = require("../functions/functions.js");

// Submit New Entry
router.post("/", async (req, res) => {
	// Check if user is authenticated
	if ((await AuthenticateUser(req.body.token)) === false) {
		res.json({ message: "Unauthorized" });
		return;
	}

	const ProductName = req.body.productName;
	ProductName.trim();

	const Unit = req.body.unit;
	Unit.trim();

	const Count = req.body.count;

	// Check if user exists
	const users = await User.findOne({ UserToken: req.body.token });

	if (!users) {
		res.json({ message: "User does not exist" });
		return;
	}

	const AddedBy = users.Username;

	// Check if product name, unit and count are valid
	if (ProductName.length < 2 || ProductName.length > 50) {
		res.json({ message: "Product name must be between 2 and 50 characters" });
		return;
	}

	// Check if product name, unit and count are valid
	if (Unit.length < 2 || Unit.length > 20) {
		res.json({ message: "Unit must be between 2 and 20 characters" });
		return;
	}

	// Check if product name, unit and count are valid
	if (Count < 1 || Count > 100) {
		res.json({ message: "Count must be between 1 and 100" });
		return;
	}

	const entry = new Entry({
		Entry_ID: await generateID(),
		ProductName: ProductName,
		Unit: Unit,
		Count: Count,
		AddedBy: AddedBy,
	});

	try {
		await entry.save();

		res.json({ message: "Entry saved successfully" });
	} catch (err) {
		console.log(err);
		res.json({ message: err.toString() });
	}
});

module.exports = router;
