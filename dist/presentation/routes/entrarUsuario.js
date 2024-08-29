"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_tokenAuth_1 = require("../../infra/middleware.tokenAuth");
const router = (0, express_1.Router)();
router.post("/", middleware_tokenAuth_1.genToken);
exports.default = router;
