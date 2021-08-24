const sql = require("./db.js");


// Constructor
const MenuItem =  function(menuItem)  {
  this.customer_id =  menuItem.customer_id,
  this.cart_id = menuItem.cart_id
  this.item_name = menuItem.item_name,
  this.category_id = menuItem.category_id,
  this.offer_id = menuItem.offer_id,
  this.item_description = menuItem.item_description,
  this.condiments = menuItem.condiments,
  this.price = menuItem.price,
  this.active = menuItem.active
};

MenuItem.create = (newMenuItem, result) => {
  sql.query("INSERT INTO pitapaldb.menu SET ?", newMenu, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Menu: ", { id: res.insertId, ...newMenu });
    result(null, { id: res.insertId, ...newMenu });
  });
};

MenuItem.findById = (customerId, result) => {
  sql.query(`SELECT * FROM pitapaldb.customer WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};
 
MenuItem.findByCart = (cartId, result) => {
  sql.query("SELECT * FROM pitapaldb.menu_item where cart_id = '"+cartId+"';", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found Menu: ", res);
      result(null, res);
      return res;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

MenuItem.getAll = result => {
  sql.query("SELECT * FROM pitapaldb.menu_item;", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("menu items: ", res);
    result(null, res);
  });
};

MenuItem.updateById = (id, customer, result) => {
  sql.query(
    "UPDATE pitapaldb.customer SET email = ?, name = ?, active = ? WHERE id = ?",
    [customer.email, customer.name, customer.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated customer: ", { id: id, ...customer });
      result(null, { id: id, ...customer });
    }
  );
};

MenuItem.remove = (id, result) => {
  sql.query("DELETE FROM pitapaldb.menu WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted customer with id: ", id);
    result(null, res);
  });
};

MenuItem.removeAll = result => {
  sql.query("DELETE FROM pitapaldb.customer", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} customers`);
    result(null, res);
  });
};

module.exports = MenuItem;