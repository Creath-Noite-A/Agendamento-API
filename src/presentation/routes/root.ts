import express, { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  // :)
  res.send(
    "<h1>Creath Seletiva</h1>" +
      '<p style="color: red">Agendamento API!!! 🕺💃</p>'
  );
});

export default router;
