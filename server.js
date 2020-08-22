// Dependencies
// =============================================================
const express = require("express");
const app = express();

// Sets up Express Port for local and heroku access
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static("db"));

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
})