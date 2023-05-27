// Get the current date in YYYYMMDD format
Date.prototype.yyyymmdd = function () {
	let mm = this.getMonth() + 1; // getMonth() is zero-based
	let dd = this.getDate();

	return [
		(dd > 9 ? "" : "0") + dd,
		(mm > 9 ? "" : "0") + mm,
		this.getFullYear(),
	].join(".");
};

function ValidateDate() {
	let date = new Date();
	return date.yyyymmdd();
}

async function GetNewID() {
	let newID = 0;

	const entries = await Entry.find();

	// get all the id's
	const result = entries.map((entry) => {
		return entry.ID;
	});

	// check if the new id is already in the database
	while (result.includes(newID)) {
		newID++;
	}

	return newID;
}

async function Authenticate(token) {
	try {
		const oneUser = await User.findOne({ UserToken: token });
		return !!oneUser; // Returns true if oneUser exists, false otherwise
	} catch (error) {
		return false;
	}
}

module.exports = {
    GetCurrentDate : ValidateDate,
	generateID : GetNewID,
	AuthenticateUser : Authenticate
}