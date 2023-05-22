const express = require("express");
const router = express.Router();
const Entry = require("../models/entry_model");
const axios = require("axios");

// Import .env variables
require("dotenv/config");

async function GenerateID() {
	// Get all entries
	const currentID = await axios.get(process.env.API_URL_ENTRIES, config);

	const ID_List = [];

	// Get all the current entries id's
	for (let i = 0; i < currentID.data.length; i++) {
		ID_List.push(currentID.data[i].Entry_ID);
	}

	// check if the new id is already in the database
	let newID = 0;

	while (ID_List.includes(newID)) {
		newID++;
	}

	return newID;
}

const config = {
	headers: {
		"x-api-key": `${process.env.API_KEY}`,
	},
};

// Get all entries
router.get("/", async (req, res) => {
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
	const productname = req.body.ProductName.trim();
	const unit = req.body.Unit.trim();
	const count = req.body.Count;
	const addedby = req.body.AddedBy.trim();

	if (productname.length < 2 || productname.length > 50) {
		res.json({ message: "Product name must be between 2 and 50 characters" });
		return;
	}

	if (unit.length < 2 || unit.length > 20) {
		res.json({ message: "Unit must be between 2 and 20 characters" });
		return;
	}

	if (count < 1 || count > 100) {
		res.json({ message: "Count must be between 1 and 100" });
		return;
	}

	const entry = new Entry({
		Entry_ID: await GenerateID(),
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

		res.send(result);
	} catch (error) {
		res.json({ message: error });
	}
});

// delete a specific entry
router.delete("/:Entry_ID", async (req, res) => {
	try {
		await Entry.deleteOne({Entry_ID: req.params.Entry_ID,});

		res.json({ message: "Entry deleted successfully" });

	} catch (error) {
		console.log(error);
		res.json({ message: error.toString() });
	}
});


// update a specific entry
router.patch("/:Entry_ID", async (req, res) => {
	try {
		const updatedEntry = await Entry.updateOne(
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

		//jsonString = ValidateToJson("updated_entry", updatedEntry);

		res.setHeader("Content-Type", "application/json");
		res.send(updatedEntry);
	} catch (error) {
		console.log(error);
		res.json({ message: error.toString() });
	}
});

module.exports = router;
