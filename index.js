const cors = require("cors");
const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const userRouter = require("./routes/userRoutes");

// dotenv config
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

require("./config/db");

// rest object
const app = express();
app.use(cors({}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  "/uploads",
  express.static(path.join(__dirname, "middlewares/uploads"))
);

// routes
app.use("/", userRouter);

// port
const port = process.env.PORT || 8080;

// listen port
app.listen(port, () => {
  console.log(
    `Server Running is${process.env.NODE_MODE} mode on port ${process.env.PORT}`
  );
});
