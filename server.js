const http = require('http');

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
} = require('./controllers/productController');

const server = http.createServer((request, response) => {
  const { method, url } = request || {};

  if (url === '/api/products' && method === 'GET') {
    getProducts(request, response);
  } else if (url.match(/\/api\/products\/[\w]+/) && method === 'GET') {
    const id = url.split('/')[3];
    getProduct(request, response, id);
  } else if (url === '/api/products' && method === 'POST') {
    createProduct(request, response);
  } else if (url.match(/\/api\/products\/[\w]+/) && method === 'PUT') {
    const id = url.split('/').pop();
    updateProduct(request, response, id);
  } else {
    response.writeHead(404, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));