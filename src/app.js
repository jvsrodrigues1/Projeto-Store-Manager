const express = require('express');
const bodyParser = require('body-parser');
const productRouters = require('./routes/product.routes');
const salesRouters = require('./routes/sales.routes');

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRouters);
app.use('/sales', salesRouters);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;