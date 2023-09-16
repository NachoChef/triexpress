"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchRouter = void 0;
const express_1 = require("express");
exports.searchRouter = (0, express_1.Router)();
/* GET page. */
exports.searchRouter.get('/', function (req, res, next) {
    res.sendStatus(200);
});
