const express = require("express");
const router = express.Router();
const Entry = require("../models/entry_model");
const fs = require("fs");
const path = require("path");

// localhost:3000/entries => get all entries
router.get("/", async (req, res) => {
	try {
		const entries = await Entry.find();

		// Write to JSON file
		fs.writeFileSync(
			"./JSON_data/all_entries.json",
			JSON.stringify(entries),
			(err) => {
				if (err) {
					console.log(err);
				} else {
					console.log("File written successfully\n");
				}
			}
		);

		// Read from JSON file
		const filePath = path.join(__dirname, "..", "JSON_data", "all_entries.json");
		const fileContent = fs.readFileSync(filePath, "utf8");
		const entriesJson = JSON.parse(fileContent);

		// Validate JSON
		const validatedJson = entriesJson.map((entry) => ({
			_id: entry._id,
			title: entry.title,
			description: entry.description,
			date: entry.date,
			__v: entry.__v,
		}));

		// Print JSON
		const jsonString = JSON.stringify(validatedJson, null, 2);
		
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

		fs.writeFileSync(
			"./JSON_data/new_entry.json",
			JSON.stringify(savedEntry),
			(err) => {
				if (err) {
					console.log(err);
				} else {
					console.log("File written successfully\n");
				}
			}
		);

		const filePath = path.join(__dirname, "..", "JSON_data", "new_entry.json");
		const fileContent = fs.readFileSync(filePath, "utf8");
		const entriesJson = JSON.parse(fileContent);

		const jsonString = JSON.stringify(entriesJson, null, 2);
		
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
		res.json(entry);
	} catch (error) {
		res.json({ message: error });
	}
});

// delete a specific entry
router.delete("/:entryId", async (req, res) => {
	try {
		const removedEntry = await Entry.deleteOne({ _id: req.params.entryId });
		res.json(removedEntry);
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
		res.json(updatedEntry);
	} catch (error) {
		console.log(error);
		res.json({ message: error });
	}
});

module.exports = router;
