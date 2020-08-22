// DEPENDENCIES
const path = require("path");

// Only two pages to serve
module.exports = function(app) {
	// Page for reading, writing and deleting posts
	app.get("/notes", function(req,res){
		res.sendFile(path.join(__dirname, "../public/notes.html"));
	});

	// Home page for any other links
	app.get("*", function(req,res){
		res.sendFile(path.join(__dirname, "../public/index.html"));
	});
};