const productRouter = require("express").Router();
const productController = require("../controllers/product.controller");

productRouter
  .route("/")
  .post(productController.createProduct)
  .get(productController.getAllProducts);

productRouter
  .route("/:productId")
  .get(productController.getProductById)
  .post(productController.addProductToCart);

module.exports = productRouter;
