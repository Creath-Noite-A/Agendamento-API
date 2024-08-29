import { Router } from "express";

import { genToken } from "../../infra/middleware.tokenAuth";

const router = Router();

router.post("/", genToken);

export default router;
