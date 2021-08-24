module.exports = app => {
    const images = require("../controllers/image.controller.js");
  
    // Create a new Image
    app.post("/images", images.create);
  
    // Retrieve all Image
    app.get("/images", images.findAll);
  
    // Retrieve a single Image with customerId
    app.get("/images/:imageId", images.findOne);
  
    // Update a Image with customerId
    app.put("/images/:imageId", images.update);
  
    // Delete a Image with customerId
    app.delete("/images/:imageId", images.delete);
  
    // Delete a new Image
    app.delete("/images", images.deleteAll);
  };