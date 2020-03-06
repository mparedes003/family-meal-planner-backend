require("dotenv").config();

const express = require("express");
const server = express();

const port = process.env.PORT || 9999;

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ Success: "We have lift off!!!" });
});

server.listen(port, () => {
  console.log(`\n===Server listening on port ${port}===\n`);
});
