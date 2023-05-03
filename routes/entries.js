const express = require("express");
const router = express.Router();
const Entry = require("../models/entry_model");
const axios = require("axios");
const { ValidateToJson } = require("../functions/functions.js");

// localhost:3000/entries => get all entries
router.get("/", async (req, res) => {
	try {
		const entries = await Entry.find();

		// Convert the data to JSON using the ValidateToJson function
		jsonString = ValidateToJson("all_entries", entries);

		// Send JSON
		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (error) {
		res.json({ message: error.toString() });
	}
});

// localhost:3000/entries => submit a entry
router.post("/", async (req, res) => {
	// Get the current number of entries
	const currentID = await axios.get(process.env.API_URL_ENTRIES);

	const ID_List = [];

	// Get all the current entries id's
	for (let i = 0; i < currentID.data.length; i++) {
		ID_List.push(currentID.data[i].Entry_ID);
	}

	// check if the new id is already in the database
	let newID = 1;
	while (ID_List.includes(newID.toString())) {
		newID++;
	}

	newID = newID.toString();

	const entry = new Entry({
		Entry_ID: newID,
		ProductName: req.body.ProductName,
		Unit: req.body.Unit,
		Count: req.body.Count,
		AddedBy: req.body.AddedBy,
	});

	try {
		const savedEntry = await entry.save();

		jsonString = ValidateToJson("new_entry", savedEntry);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (err) {
		console.log(err);
		res.json({ message: err.toString() });
	}
});

// localhost:3000/entry/:entryId => get a specific entry
router.get("/:Entry_ID", async (req, res) => {
	try {
		const entry = await Entry.findById({ Entry_ID: req.params.Entry_ID });

		jsonString = ValidateToJson("specific_entry", entry);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (error) {
		res.json({ message: error });
	}
});

// delete a specific entry
router.delete("/:Entry_ID", async (req, res) => {
	try {
		const removedEntry = await Entry.deleteOne({
			Entry_ID: req.params.Entry_ID,
		});

		jsonString = ValidateToJson("removed_entry", removedEntry);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
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

		jsonString = ValidateToJson("updated_entry", updatedEntry);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (error) {
		console.log(error);
		res.json({ message: error.toString() });
	}
});

module.exports = router;
