const mongoose = require("mongoose");
const { GetCurrentDate } = require("../functions/functions.js");


const entrySchema = mongoose.Schema({
	Entry_ID: {
		type: String,
		required: true,
	},
	ProductName: {
		type: String,
		required: true,
	},
	Unit: {
		type: String,
		required: true,
	},
	Count: {
		type: String,
		required: true,
	},
	AddedBy: {
		type: String,
		required: true,
	},
	TimeStamp: {
		type: String,
		default: GetCurrentDate(),
	},
});

module.exports = mongoose.model("Entries", entrySchema);
