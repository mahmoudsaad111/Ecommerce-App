const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const adminRouter=require('./routes/adminRoute'); 
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const reviewRouter = require("./routes/reviewRoute");
const cartRouter = require("./routes/cartRoute");
const orderRouter = require("./routes/orderRoute");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const globalError = require("./controllers/errorController");
const AppError = require("./utils/appError");
const cors = require("cors");
const boom=require('@hapi/boom'); 

dotenv.config({ path: "/.env" });

const app = express();

// static files
app.use(express.static(path.join(__dirname, "public")));

// midlewares
app.use(cookieParser());

// this accept json data in req.body and raw data in req.rawBody
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/review", reviewRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/admin", adminRouter);

app.use("*", (req, res, next) => {
  return next(boom.notFound(`Can't find ${req.originalUrl} on this server!`));
});

app.use(globalError);
module.exports = app;
