import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

import Usuario from "../domain/models/Usuario";

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
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error("Token de acesso nulo");
    }

    const verif = jwt.verify(token, tokenSecretKey);
    (req as CustomRequest).token = verif;
  } catch (err) {
    res.status(401).send("É necessária autenticação");
  }
};

export interface ReadyToken {
  usuario: { id: string; telefone: string; nome: string } | null;
  token: string | null;
  status: number;
}

export const genToken = async (
  dadosUsuario:
    | Usuario
    | {
        id: string;
        telefone: string;
        nome: string;
      }
): Promise<ReadyToken> => {
  try {
    const { id, telefone, nome } = dadosUsuario;
    if (id == null || telefone == null || nome == null) {
      throw new Error("Dados nulos na geração de token");
    }
    const token = jwt.sign({ id, telefone, nome }, tokenSecretKey, {
      expiresIn: 60000 * 10, // <- 10 minutos
    });

    if (token == null) {
      throw new Error("Token nulo na geração de token");
    }

    const retorno = {
      usuario: {
        id,
        telefone,
        nome,
      },
      token,
      status: 200,
    };

    return retorno;
  } catch (err) {
    return {
      usuario: null,
      token: null,
      status: 500,
    };
  }
};
