"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    // :)
    res.send("<h1>Creath Seletiva</h1>" +
        '<p style="color: red">Agendamento API!!! 🕺💃</p>');
});
exports.default = router;
