const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const middlewares = require("./middlewares");
const logs = require("./api/logs");

const app = express();
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(helmet());
// #region
const { connection: db } = mongoose;
db.on("connected", () => {
  console.log("database connected!");
});
// #endregion

app.get("/", async (_, res) => {
  res.json({ hello: "world!" });
});
app.use("/api/logs", logs);

app.use(middlewares.errorHandler);
app.use(middlewares.notFound);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log("server is now listening on port ", server.address().port);
});
