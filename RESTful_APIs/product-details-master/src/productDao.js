
//import fs module
const fs = require('fs');
const productsFileName = './src/products.json';


//The getProducts function take done as callback
//It will read the product.json file
const getProducts = function(done) {
  fs.readFile(productsFileName, (err, txtData) => {
    if(err) {
      return done('Encountered error while getting products details');
    }
    let productsData = JSON.parse(txtData);
    return done(undefined, productsData);
  });
}


//The function getProductById will take two parameters first the id and second the callback
//It will read the product.json file
const getProductById = function(id, done){
  getProducts((err, products) => {
    if(err) return done(err);
    let product = products.find((p) => p.id === id);
    if(!product) return done('Product ${id} not found!');
    return done(undefined, product);
  });
}


//The saveProductDetails method will take productDetails and done as callback
//It will read the product.json file
const saveProductDetails = function (ProductDetails, done) {
  getProducts((err, products) => {
    if(err) return done(err);
    let product = products.find((p) => p.name === ProductDetails.name);
    if(product) return done(`Product ${ProductDetails.name} already exists!`);
    ProductDetails.id = products.reduce((p, v) => p > v.id ? p : v.id, 0) + 1;
    products.push(ProductDetails);
    fs.writeFile(productsFileName, JSON.stringify(products), (err) => {
      if(err) return done(err);
      else return done(undefined, ProductDetails);
    });
  });
}

  //The method deleteProductById will take productId and done as parameters
  //It will read the product.json file

const deleteProductById = function(productId, done) {
  getProducts((err, products) => {
    if(err) return done(err);
    let i = products.findIndex((p) => p.id === productId);
    if(i === -1) return done(`Product ${productId} not found!`);
    products.splice(i, 1);
    fs.writeFile(productsFileName, JSON.stringify(products), (err, pDet) => {
      if(err) return done(err);
      else return done(undefined, pDet);
    });
  });
}


module.exports ={
    getProducts,
    getProductById,
    saveProductDetails,
    deleteProductById

}
