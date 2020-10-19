const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

const app = express();
// call cors
app.use(cors()); 

const port = 3008;

//connection for database
const pool = mysql.createPool({
    host : "dbpitapalapi",  
    user : "root",
    password : "password",
    database : "pitapaldb",
    insecureAuth : true,
    port: "3009"
  });

//test generic serve access
app.get('/', (req, res) => res.send('wassup!'))

//test records from myql
app.get('/test',  function(req,res){
    var plate = req.params.plate;
    console.log(plate)
    console.log('attempting connection')
    var sql = "SELECT * FROM pitapaldb.carts";
    pool.query(sql, plate, function(err, results) {
        if(err) {
            return res.send(err)
        } else {
            console.log(results)
            return res.json({
                data: results
            })
        }
    });
});


//set server to listen 
app.listen(port,()=>console.log(`Express Server is Running on port ${port}`));

