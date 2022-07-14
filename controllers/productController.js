const Product = require('../models/productModel');

/**
 * @function getProducts
 * @description Get all products from using findAll() from Product Model
 * @returns HttpResponse with products in JSON format
 */
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(products));
  } catch (error) {
    console.log('ERROR GET PRODUCTS >>> ', error);
  }
};

/**
 * @function getProduct
 * @description Get product from using findById() from Product Model
 * @returns HttpResponse with product if exists or a message if not found in JSON format
 */
const getProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);
    
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Product not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(product));
    }
  } catch (error) {
    console.log('ERROR GET PRODUCTS >>> ', error);
  }
};

module.exports = {
  getProducts,
  getProduct,
};