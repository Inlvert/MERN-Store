const productRouter = require("express").Router();
const productController = require("../controllers/product.controller");
const { isAdmin } = require("../middlewares/isAdmin");

productRouter
  .route("/")
  .post(isAdmin, productController.createProduct)
  .get(productController.getAllProducts);

productRouter
  .route("/:productId")
  .get(productController.getProductById)
  .post(productController.addProductToCart);

module.exports = productRouter;
