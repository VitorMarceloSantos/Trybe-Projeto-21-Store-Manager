const express = require('express');
const bodyParser = require('body-parser');
const routers = require('./routers');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use(routers);

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
// Iniciando o Projeto!
module.exports = app;