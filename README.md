# Music App Test Project

Just a test project to practice the basic structure of a web app

## How To Use

To clone and run this project locally, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. You'll also need to create a [MongoDB](https://www.mongodb.com/) database.

```bash
# Create the database
- Make a new project
- Add a cluster with a username and password
- Add a database 'Music' and a collection 'Library'
- Connect to the cluster with the MongoDB Drivers option
- Keep the connection string handy after replacing the demo user/password

# Clone this repository
$ git clone https://github.com/nikogenix/100devs-basic_music_app_test_project

# Go into the repository
$ cd 100devs-basic_music_app_test_project

# Install dependencies
$ npm install

# Create a .env file to set up the connection to the DB
$ touch .env

# Add the variable for the MongoDB connection string inside the .env file
DB_STRING = mongodb+srv://admin:<password>...

# Run the app
$ node server.js

```

Then, just open [localhost:8000](http://localhost:8000) in your browser.
