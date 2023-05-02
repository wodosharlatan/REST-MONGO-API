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

module.exports = {
    ValidateToJson : ValidateData
}