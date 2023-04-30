const express = require('express');
const productsRouter = require('./routers/products.router');
const path = require('path');

const app = express();
app.use(express.json());
app.use('/api/products', productsRouter);

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('server has been started');
});
