const express = require("express");
const router = express.Router();
const Entry = require("../models/entry_model");
const { AuthenticateUser } = require("../functions/functions.js");

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

// Get a specific entry
router.post("/:Entry_ID", async (req, res) => {
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

	const ProductName = req.body.productName;
	const Unit = req.body.unit;
	const Count = req.body.count;

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

	try {
		await Entry.updateOne(
			{ Entry_ID: req.params.Entry_ID },
			{
				$set: {
					ProductName: ProductName,
					Unit: Unit,
					Count: Count,
				},
			}
		);

		res.json({ message: "Entry updated successfully" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
