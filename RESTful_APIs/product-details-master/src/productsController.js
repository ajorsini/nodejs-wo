

//import the productService
const productsService = require('./productsService')

const getProducts = (done) => {
   productsService.getProducts(done)
}

const getProductById = (productId, done) => {
  productsService.getProductById(productId, done)
}

const saveProductDetails = (productDetails, done) => {
  productsService.saveProductDetails(productDetails, done)
}

const deleteProductById = (productId, done) => {
   productsService.deleteProductById(productId, done)
}


module.exports = {
  getProducts, getProductById, saveProductDetails, deleteProductById
}
