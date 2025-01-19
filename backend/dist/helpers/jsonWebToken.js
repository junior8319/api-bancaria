"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const fileSystem = __importStar(require("fs/promises"));
class JsonWebToken {
    constructor() {
        this.jwt = jwt;
    }
    generate(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = yield _a.secret();
                const token = this.jwt.sign(payload, secret, _a.config);
                return token;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    verify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const secret = yield _a.secret();
                const decoded = this.jwt.verify(token, secret, _a.config);
                return decoded;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
_a = JsonWebToken;
JsonWebToken.secret = () => __awaiter(void 0, void 0, void 0, function* () { return fileSystem.readFile('jwt.evaluation.key', 'utf8'); });
JsonWebToken.config = {
    expiresIn: '1d',
    algorithm: 'HS256',
};
exports.default = new JsonWebToken();
