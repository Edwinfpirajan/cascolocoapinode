const { Router } = require('express');
const { getProducts, createProduct, updateProduct, getProduct } = require('../controllers/api');
const router = Router();

router.get('/', (req, res) => {
    res.end('servidor cascoloco')
  })
  
router.get('/products', async (req, res) => {
      const products = await getProducts();
      res.json(products);
  });

  /* Importar función getProduct*/
  
router.get('/products/:id', async (req, res) => {
      const product = await getProduct(req.params.id);
      res.json(product);
  });
  
router.post('/products/create', async (req, res) => {
      const product = await createProduct(req.body);
      res.json(product);
  });
  
router.put('/products/edit/', async (req, res) => {
      const product = await updateProduct(req.body);
      res.json(product);
  });

  module.exports = router;