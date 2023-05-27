const express = require("express");
const router = express.Router();
const Entry = require("../models/entry_model");
const User = require("../models/user_model");
const { AuthenticateUser, generateID } = require("../functions/functions.js");

// Import .env variables
require("dotenv/config");

// Get all entries
router.post("/", async (req, res) => {
	// Check if user is authenticated
	if ((await AuthenticateUser(req.body.token)) === false) {
		res.json({ message: "Unauthorized" });
		return;
	}

	try {
		const entries = await Entry.find();

		const result = entries.map((entry) => {
			return {
				Entry_ID: entry.Entry_ID,
				ProductName: entry.ProductName,
				Unit: entry.Unit,
				Count: entry.Count,
				AddedBy: entry.AddedBy,
				TimeStamp: entry.TimeStamp,
			};
		});

		res.json(result);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// Submit New Entry
router.post("/", async (req, res) => {
	// Check if user is authenticated
	if ((await AuthenticateUser(req.body.token)) === false) {
		res.json({ message: "Unauthorized" });
		return;
	}

	const ProductName = req.body.productName.trim();
	const Unit = req.body.unit.trim();
	const Count = req.body.count;
	const AddedBy = req.body.addedby.trim();

	// Check if user exists
	const users = await User.findOne({ Username: AddedBy });

	if (!users) {
		res.json({ message: "User does not exist" });
		return;
	}

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
		ProductName: productname,
		Unit: unit,
		Count: count,
		AddedBy: addedby,
	});

	try {
		await entry.save();

		res.json({ message: "Entry saved successfully" });
	} catch (err) {
		console.log(err);
		res.json({ message: err.toString() });
	}
});

// Get a specific entry
router.get("/:Entry_ID", async (req, res) => {
	// Check if user is authenticated
	if ((await AuthenticateUser(req.body.token)) === false) {
		res.json({ message: "Unauthorized" });
		return;
	}

	try {
		const entry = await Entry.findOne({ Entry_ID: req.params.Entry_ID });

		const result = {
			Entry_ID: entry.Entry_ID,
			ProductName: entry.ProductName,
			Unit: entry.Unit,
			Count: entry.Count,
			AddedBy: entry.AddedBy,
			TimeStamp: entry.TimeStamp,
		};

		res.json(result);
	} catch (error) {
		res.json({ message: error });
	}
});

// delete a specific entry
router.delete("/:Entry_ID", async (req, res) => {
	// Check if user is authenticated
	if ((await AuthenticateUser(req.body.token)) === false) {
		res.json({ message: "Unauthorized" });
		return;
	}

	try {
		await Entry.deleteOne({ Entry_ID: req.params.Entry_ID });

		res.json({ message: "Entry deleted successfully" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// update a specific entry
router.patch("/:Entry_ID", async (req, res) => {
	// Check if user is authenticated
	if ((await AuthenticateUser(req.body.token)) === false) {
		res.json({ message: "Unauthorized" });
		return;
	}

	try {
		await Entry.updateOne(
			{ Entry_ID: req.params.Entry_ID },
			{
				$set: {
					ProductName: req.body.ProductName,
					Unit: req.body.Unit,
					Count: req.body.Count,
					AddedBy: req.body.AddedBy,
				},
			}
		);

		res.json({ message: "Entry updated successfully" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
