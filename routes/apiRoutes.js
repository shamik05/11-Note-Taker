// Dependencies
// =============================================================
const fs = require("fs");
const uid = require("uid");
const util = require("util");

// The built-in util package can be used to create Promise-based versions of functions using node style callbacks
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = function(app) {
    // API GET Requests
    app.get("/api/notes", function(req,res){

        // Read the db.json file 
        readFileAsync("./db/db.json","utf8").then(data=>{
            const db = JSON.parse(data);

            // Return the response as json object
            res.json(db);
        }).catch(err=>{
            if(err) throw err;
        })
    })
    
    // API POST Requests
    app.post("/api/notes", function(req,res){

        // Read the db.json file 
        readFileAsync("./db/db.json","utf8").then(data=>{
            // console.log(req.body);
            // Add an id key to req.body
            req.body.id = uid();
            const db = JSON.parse(data);

            // Add post information from req.body
            db.push(req.body);

            // Write the updated db back to db.json
            writeFileAsync("./db/db.json",JSON.stringify(db)).then(()=>{

                // Return the response as json true
                res.json(true)
            });
        }).catch(err=>{
            if(err) throw err; 
        })
    });

    // API Delete Requests
    app.delete("/api/notes/:id", function(req,res){
        // Read the db.json file 
        readFileAsync("./db/db.json","utf8").then(data=>{
            const db = JSON.parse(data);
            
            // Filter DB to exclude the deleted post identified by its id then rewrite the db file
            writeFileAsync("./db/db.json",JSON.stringify(db.filter(ele => ele.id != req.params.id)))
            .then(()=>{
                res.json(true);
            })
        }).catch(err=>{
            if(err) throw err; 
        })  
    });
}