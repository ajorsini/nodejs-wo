

//import the modules require
const express = require('express');
const router = express.Router();
const productsController = require('./productsController');

//This method will get all the Product form the product.json
router.get("/", (req, res) => {
  try {
    productsController.getProducts((err, pRes) => {
      if(err) return res.status(400).send(err);
      else return res.status(200).send({STATUS: 'OK', data: pRes});
    });
  } catch (err) {
    return res.status(500).send('Unexpected error, try after sometime');
  }
});

//This method will get the product with given productId form the product.json
router.get("/:productId", (req, res) => {
  const productId = parseInt(req.params.productId);
  try {
    productsController.getProductById(productId, (err, pRes) => {
      if(err) return res.status(400).send(err);
      else return res.status(200).send({STATUS: 'OK', data: pRes});
    });
  } catch (err) {
    return res.status(500).send('Unexpected error, try after sometime');
  }
});

//This method will save/post a new product in the product.json
router.post("/", (req, res) => {
  try {
    const productDetails = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity
    }
    productsController.saveProductDetails(productDetails, (err, pRes) => {
      if(err) return res.status(400).send(err);
      else return res.status(201).send({STATUS: 'OK', data: pRes});
    });
  } catch (err) {
    return res.status(500).send('Unexpected error, try after sometime');
  }
});

//This method will delete product with specific productid from the product.json
router.delete("/:productId", (req, res) => {
  try {
     const productId = parseInt(req.params.productId);
     productsController.deleteProductById(productId, (err, pRes) => {
      if(err) return res.status(400).send(err);
      else return res.status(200).send({STATUS: 'OK', data: pRes});
    });
  } catch (err) {
    return res.status(500).send('Unexpected error, try after sometime');
  }
});

module.exports = router;
