const express = require("express");
const router = express.Router();
const Entry = require("../models/entry_model");
const { AuthenticateUser } = require("../functions/functions.js");

// Import .env variables
require("dotenv/config");


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

module.exports = router;