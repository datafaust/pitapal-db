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

//PULL ALL MENU ITEMS FROM STAGING
app.get('/menus',  function(req,res){
    var sql = "SELECT * FROM pitapaldb.menu_item_stg;";
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
        time_joined:req.query.time_joined,
        cart_name: req.query.cart_name,
        cart_address: req.query.cart_address,
        category: req.query.category
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

//POST TO PENDING MENU
app.post('/addMenuItem',  cors(), (req, res) => {
    //current_time = moment().utcOffset('-0400').format("YYYY-MM-DD HH:mm:ss").substr(0,18)+'0';
      var values = {
        id: req.query.id,
        cart_id: req.query.cart_id,
        item_name: req.query.item_name,
        category_id: req.query.category_id,
        description: req.query.description,
        price: req.query.price,
        active: req.query.active
       }

       let sql = 'INSERT INTO pitapaldb.menu_item_stg(id, cart_id, item_name, category_id, description, price, active) VALUES ?';

       // now the createStudent is an object you can use in your database insert logic.
       pool.query(sql, values, function (err, results) {
        if(err) {
            console.log(err)
            return res.send(err)
            
        } else {
            console.log(results)
            //return res.json({
            //    data: results
            //})
            return res.status(HttpStatus.OK).json({ message: 'ok', status: HttpStatus.OK })
        }
    });
});


//set server to listen 
app.listen(port,()=>console.log(`Express Server is Running on port ${port}`));

