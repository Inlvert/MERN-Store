const productRouter = require("express").Router();
const productController = require("../controllers/product.controller");
const { findProduct } = require("../middlewares/findProduct");
const { isAdmin } = require("../middlewares/isAdmin");
const { imageUpload } = require('../utils/imageUpload')

productRouter
  .route("/")
  .post(imageUpload.array("images", 10), productController.createProduct)
  .get(productController.getAllProducts);

productRouter
  .route("/:productId")
  .get(findProduct, productController.getProductById)
  .post(productController.addProductToCart);

module.exports = productRouter;
