const productRouter = require("express").Router();
const productController = require("../controllers/product.controller");
const { findProduct } = require("../middlewares/findProduct");
const { isAdmin } = require("../middlewares/isAdmin");
const { checkAccessToken } = require("../middlewares/token.mw");
const { imageUpload } = require('../utils/imageUpload')

productRouter
  .route("/")
  .post(imageUpload.array("images", 10), productController.createProduct)
  .get(productController.getAllProducts);

productRouter
  .route("/:productId")
  .post(checkAccessToken, findProduct, productController.addProductToCart)
  .get(findProduct, productController.getProductById);

module.exports = productRouter;
