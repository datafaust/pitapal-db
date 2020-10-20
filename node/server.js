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


//POST TO DATABASE
app.post('/addCustomer',  cors(), (req, res) => {
    //current_time = moment().utcOffset('-0400').format("YYYY-MM-DD HH:mm:ss").substr(0,18)+'0';
    var my_data = {
        id: req.query.id,
        customer_name: req.query.customer_name,
        city_id:req.query.city_id,
        phone:req.query.phone,
        email:req.query.email,
        time_joined:req.query.time,
        category: req.query.cart
       }
       // now the createStudent is an object you can use in your database insert logic.
       pool.query('INSERT INTO pitapaldb.customer SET ?', my_data, function (err, results) {
        if(err) {
            console.log(err)
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

