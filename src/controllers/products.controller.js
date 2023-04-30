const productsService = require('../services/products.service');

async function getProducts(req, res) {
  try {
    res.status(200).json(await productsService.getProducts(req.query));
  } catch ({ message, statusCode }) {
    res.status(statusCode ?? 502).json({ message });
  }
}
async function getDetails(req, res) {
  try {
    res.status(200).json(await productsService.getDetails(req.query));
  } catch ({ message, statusCode }) {
    res.status(statusCode ?? 502).json({ message });
  }
}
const productsController = {
  getProducts,
  getDetails,
};
module.exports = productsController;
