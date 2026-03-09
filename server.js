const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB com sucesso.");

    app.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor rodando em http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar no MongoDB:", error.message);
  });