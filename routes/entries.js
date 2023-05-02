const express = require("express");
const router = express.Router();
const Entry = require("../models/entry_model");

// localhost:3000/entries => get all entries
router.get("/", async (req, res) => {
	try {
		const entries = await Entry.find();
		res.json(entries);
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
		res.json(savedEntry);
	} catch (err) {
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
