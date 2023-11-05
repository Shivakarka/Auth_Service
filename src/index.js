const express = require("express");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const prepareAndStartServer = async () => {
  app.use("/api", apiRoutes);

  app.listen(PORT, () => {
    console.log("Server listening on PORT:", PORT);
  });
};

prepareAndStartServer();
