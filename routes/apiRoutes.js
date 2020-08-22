const fs = require("fs");
const uid = require("uid");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = function(app) {
    app.get("/api/notes", function(req,res){
        readFileAsync("./db/db.json","utf8").then(data=>{
            const db = JSON.parse(data);
            res.json(db);
        }).catch(err=>{
            if(err) throw err;
        })
    })
    
    app.post("/api/notes", function(req,res){
        readFileAsync("./db/db.json","utf8").then(data=>{
            // console.log(req.body);
            req.body.id = uid();
            const db = JSON.parse(data);
            db.push(req.body);

            writeFileAsync("./db/db.json",JSON.stringify(db)).then(()=>{
                res.json(true)
            });
        }).catch(err=>{
            if(err) throw err; 
        })
    });

    app.delete("/api/notes/:id", function(req,res){
        readFileAsync("./db/db.json","utf8").then(data=>{
            const db = JSON.parse(data);
            
            writeFileAsync("./db/db.json",JSON.stringify(db.filter(ele => ele.id != req.params.id)))
            .then(()=>{
                res.json(true);
            })
        }).catch(err=>{
            if(err) throw err; 
        })  
    });
}