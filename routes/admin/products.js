const express = require('express');
const multer = require('multer');

const { handleErrors, requireAuth } = require('./middlewares');
const ProductRepo = require('../../repositories/products');
const { requireTitle, requirePrice } = require('./validators');
const productsNewTemplates = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const productsEditTemplate = require('../../views/admin/products/edit');
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products/new', requireAuth, (req, res) => {
  res.send(productsNewTemplates({}));
});
router.get('/admin/products', requireAuth, async (req, res) => {
  const products = await ProductRepo.getAll();
  res.send(productsIndexTemplate({ products }));
});
router.post(
  '/admin/products/new',
  requireAuth,
  upload.single('image'),
  [requireTitle, requirePrice],
  handleErrors(productsNewTemplates),
  async (req, res) => {
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;
    await ProductRepo.create({ title, price, image });
    res.redirect('/admin/products');
  },

  router.get('/admin/products/:id/edit', requireAuth, async (req, res) => {
    const product = await ProductRepo.getOne(req.params.id);

    if (!product) {
      return res.send('Product not found');
    }
    res.send(productsEditTemplate({ product }));
  }),

  router.post(
    '/admin/products/:id/edit',
    requireAuth,
    upload.single('image'),
    [requireTitle, requirePrice],
    handleErrors(productsEditTemplate, async (req) => {
      const product = await ProductRepo.getOne(req.params.id);
      return { product };
    }),
    async (req, res) => {
      const changes = req.body;
      if (req.file) {
        changes.image = req.file.buffer.toString(base64);
      }
      try {
        console.log(req.param.id);
        await ProductRepo.update(req.params.id, changes);
      } catch (error) {
        return res.send('could not find item');
      }

      res.redirect('/admin/products');
    },
    router.post('/admin/products/:id/delete', requireAuth, async (req, res) => {
      await ProductRepo.delete(req.params.id);
      res.redirect('/admin/products');
    }),
  ),
);
module.exports = router;
