const express = require("express");
const { PORT } = require("./config/serverConfig");

const app = express();

const prepareAndStartServer = async () => {
  app.listen(PORT, () => {
    console.log("Server listening on PORT:", PORT);
  });
};

prepareAndStartServer();
