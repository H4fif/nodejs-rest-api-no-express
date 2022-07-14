const Product = require('../models/productModel');
const { getRequestBody } = require('../utils');

/**
 * @function getProducts
 * @description Get all products from using findAll() from Product Model
 * @param {http.ClientRequest} req - HTTP Request
 * @param {http.ServerResponse} res - HTTP Response
 * @returns {http.ServerResponse} http response with products in JSON format
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
 * @param {http.ClientRequest} req - HTTP Request
 * @param {http.ServerResponse} res - HTTP Response
 * @param {integer} id - the product ID
 * @returns {http.ServerResponse} http response with product if exists or a message if not found in JSON format
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

/**
 * @function createProduct
 * @description Create product using create() from Product Model
 * @param {http.ClientRequest} req - HTTP Request
 * @param {http.ServerResponse} res - HTTP Response
 * @returns {http.ServerResponse} http response
 */
const createProduct = async (req, res) => {
  try {
    const body = await getRequestBody(req);
    const { title, description, price } = JSON.parse(body);
    const product = { title, description, price };
    const newProduct = await Product.create(product);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newProduct));
  } catch (error) {
    console.log('ERROR GET PRODUCTS >>> ', error);
  }
};

/**
 * @function updateProduct
 * @description Create product using create() from Product Model
 * @param {http.ClientRequest} req - HTTP Request
 * @param {http.ServerResponse} res - HTTP Response
 * @param {number} id - the product ID
 * @returns {http.ServerResponse} http response
 */
const updateProduct = async (req, res, id) => {
  try {
    const findProduct = await Product.findById(id);

    if (!findProduct) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Product not found' }));
    } else {
      const body = await getRequestBody(req);
      const { title, description, price } = JSON.parse(body);

      const product = {
        title: title || findProduct.title,
        description: description || findProduct.description,
        price: price || findProduct.price,
      };

      const updatedProduct = await Product.update(id, product);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updatedProduct));
    }
  } catch (error) {
    console.log('ERROR GET PRODUCTS >>> ', error);
  }
};

/**
 * @function deleteProduct
 * @description Delete product from using remove() from Product Model
 * @param {http.ClientRequest} req - HTTP Request
 * @param {http.ServerResponse} res - HTTP Response
 * @param {integer} id - the product ID
 * @returns {http.ServerResponse} http response with product if exists or a message if not found in JSON format
 */
 const deleteProduct = async (req, res, id) => {
  try {
    const product = await Product.findById(id);
    
    if (!product) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'Product not found' }));
    } else {
      await Product.remove(id);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: 'The product has been removed'}));
    }
  } catch (error) {
    console.log('ERROR GET PRODUCTS >>> ', error);
  }
};

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};