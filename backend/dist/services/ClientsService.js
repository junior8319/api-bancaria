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
const Client_1 = __importDefault(require("../database/models/Client"));
const Pix_1 = __importDefault(require("../database/models/Pix"));
class ClientsService {
    constructor() {
        this.getAllClients = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield Client_1.default.findAll({
                    attributes: { exclude: ['password'] },
                    include: [
                        { model: Pix_1.default, as: "creditor", attributes: ['id', 'value', 'message', 'status'] },
                        { model: Pix_1.default, as: "payer", attributes: ['id', 'value', 'message', 'status'] },
                    ],
                });
                if (!clients || clients.length === 0)
                    return null;
                return clients;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getClientById = (id) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield Client_1.default.findByPk(id, {
                    attributes: { exclude: ['password'] },
                    include: [
                        { model: Pix_1.default, as: "creditor", attributes: ['id', 'value', 'message', 'status'] },
                        { model: Pix_1.default, as: "payer", attributes: ['id', 'value', 'message', 'status'] },
                    ],
                });
                return client;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        ClientsService.model = new Client_1.default();
    }
}
exports.default = ClientsService;
