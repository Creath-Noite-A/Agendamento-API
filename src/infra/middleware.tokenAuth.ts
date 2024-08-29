import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

import GatewayUsuario from "../app/gateways/supabase.GatewayUsuario";
import EntrarUsuario from "../app/usecases/EntrarUsuario";

dotenv.config({ path: "./.env" });

const tokenSecretKey = process.env.TOKEN_SECRET_KEY || "belo barbeiro";
if (!process.env.TOKEN_SECRET_KEY) {
  console.log(
    'AVISO: a chave secreta não foi carregada do arquivo ".env", uma padrão foi posta por hardcoding'
  );
}

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await req.cookies.access_token;

    console.log(token);

    if (!token) {
      throw new Error("Token de acesso nulo");
    }

    const verif = jwt.verify(token, tokenSecretKey);

    req.body = verif;
    next();
  } catch (err) {
    res.status(401).send("É necessária autenticação ");
  }
};

export const genToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { telefone, senha } = req.body;

    if (telefone == null || senha == null) {
      throw new Error("Parâmetros nulos na pesquisa de usuário");
    }

    const gatewayUsuario = new GatewayUsuario();
    const entrarUsuario = new EntrarUsuario(gatewayUsuario);

    const usuario = await entrarUsuario.execute({ telefone, senha });

    if (usuario == null || !usuario.pronto()) {
      throw new Error("Usuário nulo");
    }

    const { id, nome } = usuario;

    const token = jwt.sign({ id, telefone, nome }, tokenSecretKey, {
      expiresIn: 60000 * 10, // <- 10 minutos
    });

    if (token == null) {
      throw new Error("Token nulo na geração de token");
    }

    res
      .cookie("access_token", token, {
        httpOnly: false,
        secure: false,
      })
      .status(200)
      .json({
        message: "Login efetuado com sucesso",
        data: usuario,
        error: false,
      });
    next();
  } catch (err) {
    if (err instanceof Error) {
      return res.status(400).json({ error: false, message: err.message });
    } else {
      return res
        .status(500)
        .json({ error: false, message: "Erro desconhecido" });
    }
  }
};
