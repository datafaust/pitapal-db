const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

const app = express();
// call cors
app.use(cors()); 

const port = 3008;

//connection for database
const pool = mysql.createPool({
    host : "mysql",  
    user : "root",
    password : "password",
    database : "pitapaldb",
    insecureAuth : true
  });

//test generic serve access
app.get('/', (req, res) => res.send('wassup!'))

//PULL ALL CARTS
app.get('/carts',  function(req,res){
    var sql = "SELECT * FROM pitapaldb.carts;";
    pool.query(sql, function(err, results) {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});

//PULL ALL CUSTOMERS
app.get('/customer',  function(req,res){
    var sql = "SELECT * FROM pitapaldb.customer;";
    pool.query(sql, function(err, results) {
        if(err) {
            return res.send(err)
        } else {
            return res.json({
                data: results
            })
        }
    });
});


//set server to listen 
app.listen(port,()=>console.log(`Express Server is Running on port ${port}`));

