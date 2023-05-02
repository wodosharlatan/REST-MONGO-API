const express = require("express");
const router = express.Router();
const Entry = require("../models/entry_model");
const fs = require("fs");
const path = require("path");
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
		res.json({ message: error });
	}
});

// localhost:3000/entries => submit a entry
router.post("/", async (req, res) => {
	const entry = new Entry({
		title: req.body.title,
		description: req.body.description,
	});

	try {
		const savedEntry = await entry.save();

		jsonString = ValidateToJson("new_entry", savedEntry);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (err) {
		console.log(err);
		res.json({ message: err });
	}
});

// localhost:3000/entry/:entryId => get a specific entry
router.get("/:entryId", async (req, res) => {
	try {
		const entry = await Entry.findById(req.params.entryId);

		jsonString = ValidateToJson("specific_entry", entry);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (error) {
		res.json({ message: error });
	}
});

// delete a specific entry
router.delete("/:entryId", async (req, res) => {
	try {
		const removedEntry = await Entry.deleteOne({ _id: req.params.entryId });

		jsonString = ValidateToJson("removed_entry", removedEntry);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (error) {
		console.log(error);
		res.json({ message: error });
	}
});

// update a specific entry
router.patch("/:entryId", async (req, res) => {
	try {
		const updatedEntry = await Entry.updateOne(
			{ _id: req.params.entryId },
			{ $set: { title: req.body.title } }
		);

		jsonString = ValidateToJson("updated_entry", updatedEntry);

		res.setHeader("Content-Type", "application/json");
		res.send(jsonString);
	} catch (error) {
		console.log(error);
		res.json({ message: error });
	}
});

module.exports = router;
