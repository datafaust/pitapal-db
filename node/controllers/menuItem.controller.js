const MenuItem = require("../models/menuItem.model.js");

// Create and Save a new Customer
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Menu Item
    const menuItem = new MenuItem({
      customer_id: req.query.customer_id,
      cart_id: req.query.cart_id,
      item_name: req.query.item_name,
      category_id: req.query.category_id,
      offer_id: req.query.offer_id,
      item_description: req.query.item_description,
      condiments: req.query.condiments,
      price: req.query.price,
      active: req.query.active
    });

    console.log(menuItem)
 

    // Save Customer in the database
    MenuItem.create(menuItem, (err, data) => {
         if (err)
             res.status(500).send({
                 message:
                     err.message || "Some error occurred while creating the Customer."
             });
         else res.send(data);
     });
};
 
// Retrieve all Customers from the database.
exports.findAll = (req, res) => {
    MenuItem.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving customers."
            });
        else res.send(data);
    });
};

// Find a single Customer with a customerId
exports.findOne = (req, res) => {

};

// Find a single Cart with a customerId
exports.findOneWithCart = (req, res) => {
    MenuItem.findByCart(req.params.cart_id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            return []
            //res.status(404).send({
            //  message: `Not found Customer with id ${req.params.customer_id}.`
            //});
          } else {
            res.status(500).send({
              message: "Error retrieving Customer with id " + req.params.cart_id
            });
          }
        } else res.send(data);
      });
};

// Update a Customer identified by the customerId in the request
exports.update = (req, res) => {

};

// Delete a Cart with the specified cartId in the request
exports.delete = (req, res) => {
    console.log('FIRING DELETE....', req.params.id)
      MenuItem.remove(req.params.id, (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              return []
              //res.status(404).send({
              //  message: `Not found Cart with id ${req.params.id}.`
              //});
            } else {
              res.status(500).send({
                message: "Could not delete Cart with id " + req.params.id
              });
            }
          } else res.send({ message: `Cart was deleted successfully!` });
        });
};

// Delete all Customers from the database.
exports.deleteAll = (req, res) => {

};