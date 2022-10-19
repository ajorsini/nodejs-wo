// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;


const getProducts = () => {
  return JSON.stringify(productsList);
}

const getProductsById = (productId, done) => {
  let product = productsList.find((p) => p.id === productId);
  if(!product) return done("Requested product doesn't exist..!", null);
  return done(null, JSON.stringify(product));
}

const saveProduct = (newProduct, done) => {
  let product = productsList.find((p) => p.id === newProduct.id);
  if(product) return done("Product already exists..!", null);
  productsList.push(newProduct);
  return done(null, JSON.stringify(productsList));
}

const updateProduct = (productId, updateData, done) => {
  let i = productsList.findIndex((p) => p.id === productId);
  if(i === -1) return done("Requested product doesn't exist..!", null);
  if(updateData.name) productsList[i].name = updateData.name;
  if(updateData.description) productsList[i].description = updateData.description;
  if(updateData.price) productsList[i].price = updateData.price;
  if(updateData.quantity) productsList[i].quantity = updateData.quantity;
  return done(null, JSON.stringify(productsList));
}

const deleteProduct = (productId, done) => {
  let i = productsList.findIndex((p) => p.id === productId);
  if(i === -1) return done("Requested product doesn't exist..!", null);
  productsList.splice(i, 1);
  return done(null, JSON.stringify(productsList));
}


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}
