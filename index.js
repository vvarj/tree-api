const express = require("express");
const app = express();
const connect = require("./db/connect");

require("dotenv").config();
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const treeRouter = require("./routes/trees");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//for express to load static files
app.use("/static", express.static("static"));

app.use(express.json());
app.use("/api/v1/trees", treeRouter);
app.use(notFound);
app.use(errorHandler);

startServer();

async function startServer() {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server running at PORT ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}
