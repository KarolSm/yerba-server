const cors = require('cors')
const express = require("express");
const { yerbaRouter } = require("./yerba.router");
const bodyParser = require('body-parser');

const router = express.Router();
const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json())
app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/yerba", yerbaRouter);

app.listen(port, (error) => {
  console.log("server listening on port", port);
});
