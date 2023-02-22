/* crear server puerto 3001 e importar las funciones de api.js */
require('dotenv').config();
const cors = require('cors')
const express = require('express');
const port = process.env.PORT;
//const xml2js = require('xml2js');
const app = express();
// Routes Availables
let paths = {
  api:   '/',
  buscar:   '/api/buscar',
  products:     '/api/products',
  stock:  '/api/stock',
  pedidos:    '/api/pedidos',
}
// Middlewares
middlewares()
// api routes
routes(paths);

function middlewares() {  
  // CORS
  app.use(cors());
  // Read and Parse from Body
  app.use( express.json({ limit: '50mb' }) );
}

function routes(path) {
  //Route Ediwn`s
  app.use( path.api, require('./routes/apiRoutes'));
  app.use( path.products, require('./routes/productsRoutes'));
  app.use( path.pedidos, require('./routes/ordersRoutes'));
  app.use( path.stock, require('./routes/stockRoutes'));
}

// Server run in Port
app.listen(port, () => {
  console.log(`Servidor corriendo ${port}`);
});