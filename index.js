const express = require("express");
const server = express();

server.get("/", (rq, res) => {
  res.json({ status: "Success" });
});

server.listen(8080, () => {
  console.log("Server Started");
});
