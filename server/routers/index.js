const router = require("express").Router();
const authRouter = require("./authRouter");
const cartRouter = require("./cartRouter");

const productRouter = require("./productRouter");
const userRouter = require("./userRouter");
const users2Router = require("./users2Router");

router.use("/auth", authRouter);

router.use("/users", userRouter);
router.use("/products", productRouter);

router.use("/cart", cartRouter);
router.use("/users2", users2Router);

module.exports = router;
