# REST-API
This is a simple REST API built using Node.js and MongoDB to manage shopping items and users.

## Requirements
* Node.js v14 or higher
* MongoDB v4.2 or higher

## Installation
1. Clone the repository or download the source code
2. Navigate to the project directory in your terminal and run the following command to install the required dependencies:

```sh
npm install
```

3. Create a .env file in the root directory of the project and set the following variables:

```env
DB_CONNECTION=<your MongoDB connection string>
PORT=<port number for the server>
API_URL_USERS=<URL to the API hosting service providing USERS.JSON >
API_URL_ENTRIES=<URL to the API hosting service providing ENTRIES.JSON >
API_KEY=<your API key (contact me if you want to use my service)>
```

4. Start the server development by running the following command:

```sh
npm run dev
```
## API Endpoints

1. Shopping Items

* `GET /entries` - Get all shopping items
* `POST /entries` - Create a new shopping item
* `GET /entries/:entryId` - Get a specific shopping item
* `PATCH /entries/:entryId` - Update a specific shopping item
* `DELETE /entries/:entryId` - Delete a specific shopping item

2. Users

* `GET /users` - Get all users
* `POST /users` - Create a new user
* `GET /users/:userId` - Get a specific user
* `PATCH /users/:userId` - Update a specific user
* `DELETE /users/:userId` - Delete a specific user

## Model Schemas

### 1. Entries
```js
const mongoose = require("mongoose");
const { GetCurrentDate } = require("../functions/functions.js");


const entrySchema = mongoose.Schema({
	Entry_ID: { // <-- This is Auto Incremented (Routes -> entries.js -> entry.post => add new entry )
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
		default: GetCurrentDate(), // <-- Always returns Current Date in DD.MM.YYYY format
	},
});

module.exports = mongoose.model("Entries", entrySchema);

```

### 2. Users
```js
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	Username: {
		type: String,
		required: true,
	},
	Password: {
		type: String,
		required: true,
	},
	User_ID: { // <-- This is Auto Incremented (Routes -> users.js -> router.post => submit a user )
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Users", userSchema);
```

## Security

This API handles requests using API key in header

```js

app.use((req,res,next) => {
  const providedApiKey = req.headers['x-api-key']
  if(!providedApiKey || providedApiKey !== process.env.API_KEY){
    return res.status(401).json({message: "Invalid API key"})
  }
  next();
});

```

# License
This project is licensed under the MIT License - see the <a href="https://github.com/wodosharlatan/REST-API-DB/blob/main/LICENSE">LICENSE</a> file for details.
