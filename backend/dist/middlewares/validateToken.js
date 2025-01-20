"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonWebToken_1 = __importDefault(require("../helpers/jsonWebToken"));
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            res.status(401).json({ message: 'Token not found' });
            return;
        }
        const isValidToken = (authorization && typeof authorization === 'string')
            ? yield jsonWebToken_1.default.verify(authorization)
            : false;
        if (!isValidToken) {
            res.status(401).json({ message: 'Invalid token' });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = validateToken;
