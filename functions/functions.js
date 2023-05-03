const fs = require("fs");
const path = require("path");

function ValidateData(filename,nonJsonData){
    fs.writeFileSync(
        `./JSON_data/${filename}.json`,
        JSON.stringify(nonJsonData),
        (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File written successfully\n");
            }
        }
    );

    const filePath = path.join(__dirname, "..", "JSON_data", `${filename}.json`);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const entriesJson = JSON.parse(fileContent);

    const jsonString = JSON.stringify(entriesJson, null, 2);

    return jsonString;
}

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
    ValidateToJson : ValidateData,
    GetCurrentDate : ValidateDate
}