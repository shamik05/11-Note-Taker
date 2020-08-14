const fs = require("fs");

module.exports = function(app) {
    app.get("/api/notes", function(req,res){
        fs.readFile("./db/db.json","utf8", function(err,data){
            if(err) throw err;
            const db = JSON.parse(data);
            res.json(db);
        })
    })
    
    app.post("/api/notes", function(req,res){
        fs.readFile("./db/db.json","utf8", function(err,data){
            if(err) throw err;
            const db = JSON.parse(data);
            db.push(req.body);
            console.log(JSON.stringify(db));

            fs.writeFile("./db/db.json",JSON.stringify(db),function(){
                if(err) throw err;
                res.json(true);
            })
        })
    })

    app.delete("/api/notes/:id", function(req,res){
        let test = req.params.id;
        console.log(test);
        // fs.readFile("./db/db.json","utf8", function(err,data){
        //     if(err) throw err;
        //     const db = JSON.parse(data);
        // })
        res.json(true);
    });
}