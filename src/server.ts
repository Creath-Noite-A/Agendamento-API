import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import router from "./presentation/router";

dotenv.config({ path: "./.env" });

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());

app.use(cookieParser());

app.use("/", router);

// App port e listen

const PORT = process.env.PORT || 3000;

if (!process.env.PORT) {
  throw new Error('Erro: arquivo ".env" não encontrado na root do projeto');
} else {
  app.listen(PORT, () => {
    // http://localhost:{PORT}
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}
