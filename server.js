const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const PORT = 8000;
require("dotenv").config;

let db,
	dbConnectionStr = process.env.DB_STRING,
	dbName = "Music",
	clName = "Library";

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true }).then((client) => {
	console.log(`Connected to "${dbName} Database, ${clName} Cluster" `);
	db = client.db(dbName);
	cl = client.db(dbName).collection(clName);
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", async (request, response) => {
	try {
		const libraryItems = await cl.find().toArray();
		response.render("index.ejs", { items: libraryItems });
	} catch (error) {
		console.log(error);
	}
});

app.post("/addMusic", (request, response) => {
	cl.insertOne({ artist: request.body.artist, song: request.body.song, rating: request.body.rating })
		.then((result) => {
			console.log("Music Added");
			response.redirect("/");
		})
		.catch((error) => console.error(error));
});

app.put("/editMusic", (request, response) => {
	cl.updateOne(
		{ artist: request.body.artistOld, song: request.body.songOld },
		{
			$set: {
				artist: request.body.artistNew,
				song: request.body.songNew,
			},
		},
		{
			sort: { _id: -1 },
			upsert: false,
		}
	)
		.then((result) => {
			console.log("Edit Complete");
			response.json("Edit Complete");
		})
		.catch((error) => console.error(error));
});

app.delete("/deleteMusic", (request, response) => {
	cl.deleteOne({ artist: request.body.artist, song: request.body.song })
		.then((result) => {
			console.log("Music Deleted");
			response.json("Music Deleted");
		})
		.catch((error) => console.error(error));
});

app.listen(process.env.PORT || PORT, () => {
	console.log(`Server running`);
});
