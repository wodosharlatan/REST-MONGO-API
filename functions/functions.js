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


module.exports = {
    GetCurrentDate : ValidateDate
}