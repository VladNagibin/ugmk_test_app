const csv = require('csv/sync');
const fs = require('fs');
const moment = require('moment');
const { HttpError } = require('../types/httpError');

let data = [];

function parseFile() {
  data = csv
    .parse(fs.readFileSync('./products.csv'), {
      columns: ['id', 'factory_id', 'date', 'product1', 'product2', 'product3'],
      fromLine: 2,
    })
    .map(product => {
      return {
        ...product,
        date: product.date
          ? moment.utc(product.date, 'DD-MM-YYYY').toDate()
          : null,
      };
    })
    .filter(product => product.date);
}
parseFile();

async function getProducts({ factoryId, from, to, productId }) {
  if (isNaN(Number(from ?? 0)) || isNaN(Number(to ?? 0))) {
    throw new HttpError(400, 'incorrect data params');
  }
  let products = data;
  if (factoryId) {
    products = products.filter(product => product.factory_id === factoryId);
  }
  if (from) {
    products = products.filter(product => product.date.getTime() >= from);
  }
  if (to) {
    products = products.filter(product => product.date.getTime() < to);
  }
  const productQuery = productId && Number(productId) !== 0;
  products = products.map(product => ({
    ...product,
    month: new Date(product.date).getMonth(),
    productsSum: productQuery
      ? Number(product[`product${productId}`])
      : Number(product.product1) +
        Number(product.product2) +
        Number(product.product3),
  }));

  const productsBucket = {};
  products.forEach(product => {
    if (productsBucket[product.month]) {
      switch (product.factory_id) {
        case '1': {
          productsBucket[product.month].factory1Products += product.productsSum;
          break;
        }
        case '2': {
          productsBucket[product.month].factory2Products += product.productsSum;
          break;
        }
      }
    } else {
      productsBucket[product.month] = {
        month: product.month,
        factory1Products: product.factory_id === '1' ? product.productsSum : 0,
        factory2Products: product.factory_id === '2' ? product.productsSum : 0,
      };
    }
  });
  return productsBucket;
}

async function getDetails({ factoryId, month }) {
  let returnedObject = {
    month,
    factoryId,
    product1: 0,
    product2: 0,
    product3: 0,
  };
  let products = data;
  products
    .filter(product => product.factory_id === factoryId)
    .forEach(product => {
      returnedObject.product1 += Number(product.product1) || 0;
      returnedObject.product2 += Number(product.product2) || 0;
      returnedObject.product3 += Number(product.product3) || 0;
    });

  return returnedObject;
}

const productsService = {
  getProducts,
  getDetails,
};

module.exports = productsService;
