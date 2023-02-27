const { Router } = require('express');

const { getProducts, createProduct, updateProduct, getProduct } = require('../controllers/productsController');
const router = Router();

router.get('/', getProducts);  
router.get('/:id', async (req, res) => {
      const product = await getProduct(req.params.id);
      res.json(product);
  });
  
router.post('/create', async (req, res) => {
      const product = await createProduct(req.body);
      res.json(product);
  });
  
  router.patch('/edit/:id', updateProduct);
module.exports = router;