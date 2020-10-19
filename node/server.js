const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

const app = express();
// call cors
app.use(cors()); 

//connection for database
const pool = mysql.createPool({
    host : "mysql",  
    user : "root",
    password : "password",
    database : "platenet",
    insecureAuth : true
  });

//test generic serve access
app.get('/', (req, res) => res.send('wassup!'))

//test records from myql
app.get('/test',  function(req,res){
    var plate = req.params.plate;
    console.log(plate)
    console.log('attempting connection')
    var sql = "SELECT * FROM platenet.my_data";
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
app.listen(3001,()=>console.log('Express Server is Running on port 3001'));

