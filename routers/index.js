const router = require("express").Router();
const cartRouter = require("./cartRouter");
const orderRouter = require("./orderRouter");
const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const users2Router = require("./users2Router");

router.use("/users", userRouter);
router.use("/products", productRouter);
// router.use("/orders", orderRouter);
router.use("/cart", cartRouter)
router.use("/users2", users2Router)

module.exports = router;
