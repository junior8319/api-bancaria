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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const Client_1 = __importDefault(require("../database/models/Client"));
const Pix_1 = __importDefault(require("../database/models/Pix"));
const jsonWebToken_1 = __importDefault(require("../helpers/jsonWebToken"));
const bCrypt = require('bcrypt');
class ClientsService {
    constructor() {
        this.bcrypt = bCrypt;
        this.getAllClients = () => __awaiter(this, void 0, void 0, function* () {
            try {
                const clients = yield Client_1.default.findAll({
                    attributes: { exclude: ['password'] },
                    include: [
                        { model: Pix_1.default, as: "receivedPix", attributes: ['id', 'value', 'message', 'status'] },
                        { model: Pix_1.default, as: "paidPix", attributes: ['id', 'value', 'message', 'status'] },
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
                        { model: Pix_1.default, as: "receivedPix", attributes: ['id', 'value', 'message', 'status', 'payerClientId'] },
                        { model: Pix_1.default, as: "paidPix", attributes: ['id', 'value', 'message', 'status', 'creditedClientId'] },
                    ],
                });
                if (!client)
                    return null;
                return client;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.getToken = (client) => __awaiter(this, void 0, void 0, function* () {
            try {
                const clientData = yield Client_1.default.findOne({ where: { cpf: client.cpf } });
                if (!clientData)
                    return null;
                const token = yield jsonWebToken_1.default.generate({
                    dataValues: {
                        id: clientData.dataValues.id,
                        name: clientData.dataValues.name
                    }
                });
                if (!token)
                    return null;
                return token;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.createClient = (clientData) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!clientData || !clientData.cpf)
                    return null;
                const encryptedPassword = yield bCrypt.hash(clientData.password, 10);
                clientData.password = encryptedPassword;
                const clientExists = yield _a.clientExists(clientData.cpf);
                if (clientExists)
                    return null;
                let createdClient = yield Client_1.default.create(Object.assign({}, clientData));
                if (!createdClient)
                    return null;
                const token = yield jsonWebToken_1.default.generate({
                    dataValues: {
                        id: createdClient.dataValues.id,
                        name: createdClient.dataValues.name
                    }
                });
                delete createdClient.dataValues.password;
                delete createdClient._previousDataValues;
                delete createdClient.uniqno;
                delete createdClient._changed;
                delete createdClient._options;
                delete createdClient.isNewRecord;
                return Object.assign(Object.assign({}, createdClient), { token });
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        _a.model = new Client_1.default();
    }
}
_a = ClientsService;
ClientsService.clientExists = (cpf) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const client = yield Client_1.default.findOne({ where: { cpf } });
        const exists = !!client;
        return exists;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.default = ClientsService;
