const createHttpError = require("http-errors");
const { Product } = require("../models");
const e = require("express");

module,
  (exports.findProduct = async (req, res, next) => {
    try {
      const {
        params: { productId },
      } = req;

      const product = await Product.findById(productId);

      if (!product) {
        return next(createHttpError(404, "product not found"));
      }

      req.product = product;

      next();
    } catch (error) {
      next(error);
    }
  });
