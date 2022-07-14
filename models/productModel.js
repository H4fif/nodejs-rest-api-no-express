const products = require('../data/products.json');
const { v4: uuidv4 } = require('uuid');
const { writeDataToFile } = require('../utils');

/**
 * @function findAll
 * @description query to get all products
 * @returns {Promise} Promise
 */
const findAll = () => {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
};

/**
 * @function findById
 * @description query to get product by ID
 * @param {number} id - the product ID
 * @returns {Promise} Promise
 */
const findById = (id) => {
  return new Promise((resolve, reject) => {
    const product = products.find(product => product.id === id);
    resolve(product);
  });
};

/**
 * @function create
 * @description query to get product by ID
 * @param {object} product - new product object refer to product model
 * @returns {Promise} Promise
 */
const create = (product) => {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeDataToFile('data/products.json', products);
    resolve(newProduct);
  });
};

/**
 * @function update
 * @description query to get product by ID
 * @param {number} id - the product ID
 * @param {object} product - new product object refer to product model
 * @returns {Promise} Promise
 */
const update = (id, product) => {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((product) => product.id === id);
    products[index] = {id,  ...product };
    writeDataToFile('data/products.json', products);
    resolve(products[index]);
  });
};

module.exports = {
  findAll,
  findById,
  create,
  update,
};