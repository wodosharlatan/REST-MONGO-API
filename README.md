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
```

4. Start the server development by running the following command:

```sh
npm start
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

const entrySchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
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
	User_ID: { // << This is Auto Incremented
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Users", userSchema);
```

# License
This project is licensed under the MIT License - see the <a href="https://github.com/wodosharlatan/REST-API-DB/blob/main/LICENSE">LICENSE</a> file for details.
