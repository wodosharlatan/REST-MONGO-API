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

	try {
		await Entry.updateOne(
			{ Entry_ID: req.params.Entry_ID },
			{
				$set: {
					ProductName: req.body.ProductName,
					Unit: req.body.Unit,
					Count: req.body.Count,
				},
			}
		);

		res.json({ message: "Entry updated successfully" });
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

module.exports = router;
