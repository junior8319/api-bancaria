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
                        { model: Pix_1.default, as: "receivedPix", attributes: [
                                'id',
                                'payerClientId',
                                'pixKey',
                                'value',
                                'message',
                                'status',
                                'createdAt',
                                'updatedAt'
                            ] },
                        { model: Pix_1.default, as: "paidPix", attributes: [
                                'id',
                                'creditedClientId',
                                'pixKey',
                                'value',
                                'message',
                                'status',
                                'createdAt',
                                'updatedAt'
                            ] },
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
                        { model: Pix_1.default, as: "receivedPix", attributes: [
                                'id',
                                'payerClientId',
                                'pixKey',
                                'value',
                                'message',
                                'status',
                                'createdAt',
                                'updatedAt'
                            ] },
                        { model: Pix_1.default, as: "paidPix", attributes: [
                                'id',
                                'creditedClientId',
                                'pixKey',
                                'value',
                                'message',
                                'status',
                                'createdAt',
                                'updatedAt'
                            ] },
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
        this.getClientByName = (name) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield Client_1.default.findOne({
                    where: { name },
                    attributes: { exclude: ['password'] },
                    include: [
                        { model: Pix_1.default, as: "receivedPix", attributes: [
                                'id',
                                'payerClientId',
                                'pixKey',
                                'value',
                                'message',
                                'status',
                                'createdAt',
                                'updatedAt'
                            ] },
                        { model: Pix_1.default, as: "paidPix", attributes: [
                                'id',
                                'creditedClientId',
                                'pixKey',
                                'value',
                                'message',
                                'status',
                                'createdAt',
                                'updatedAt'
                            ] },
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
        this.getClientByCpf = (cpf) => __awaiter(this, void 0, void 0, function* () {
            try {
                const client = yield Client_1.default.findOne({
                    where: { cpf },
                    attributes: { exclude: ['password'] },
                    include: [
                        { model: Pix_1.default, as: "receivedPix", attributes: [
                                'id',
                                'payerClientId',
                                'pixKey',
                                'value',
                                'message',
                                'status',
                                'createdAt',
                                'updatedAt'
                            ] },
                        { model: Pix_1.default, as: "paidPix", attributes: [
                                'id',
                                'creditedClientId',
                                'pixKey',
                                'value',
                                'message',
                                'status',
                                'createdAt',
                                'updatedAt'
                            ] },
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
                const clientData = yield Client_1.default.findOne({
                    where: { cpf: client.cpf },
                    attributes: { exclude: ['password'] },
                    include: [
                        { model: Pix_1.default, as: "receivedPix", attributes: [
                                'id',
                                'payerClientId',
                                'pixKey',
                                'value',
                                'message',
                                'status',
                                'createdAt',
                                'updatedAt'
                            ] },
                        { model: Pix_1.default, as: "paidPix", attributes: [
                                'id',
                                'creditedClientId',
                                'pixKey',
                                'value',
                                'message',
                                'status',
                                'createdAt',
                                'updatedAt'
                            ] },
                    ],
                });
                if (!clientData)
                    return null;
                console.log('EM GETTOKEN:', clientData);
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
                createdClient = _a.cleanClientData(createdClient);
                const message = `Cliente cadastrado com sucesso! ID: ${createdClient.dataValues.id}`;
                return {
                    dataValues: {
                        id: createdClient.dataValues.id,
                        name: createdClient.dataValues.name,
                        cpf: createdClient.dataValues.cpf,
                    },
                    token,
                    message
                };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
        this.login = (clientData) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!clientData || (!clientData.cpf && !clientData.name) || !clientData.password)
                    return null;
                if (!clientData.cpf) {
                    if (!clientData.name)
                        return null;
                    let client = yield this.getClientByName(clientData.name);
                    if (!client)
                        return null;
                    const passwordMatch = yield bCrypt.compare(clientData.password, client.dataValues.password);
                    if (!passwordMatch)
                        return null;
                    client = _a.cleanClientData(client);
                    const token = yield this.getToken({
                        id: client.dataValues.id,
                        name: client.dataValues.name,
                        cpf: client.dataValues.cpf,
                        dataValues: client.dataValues
                    });
                    if (!token)
                        return null;
                    const message = `Login efetuado com sucesso! Boas vindas, ${client.dataValues.name}!`;
                    return { dataValues: Object.assign({}, client.dataValues), token, message };
                }
                let client = yield Client_1.default.findOne({ where: { cpf: clientData.cpf } });
                if (!client)
                    return null;
                const passwordMatch = yield bCrypt.compare(clientData.password, client.dataValues.password);
                if (!passwordMatch)
                    return null;
                client = _a.cleanClientData(client);
                const token = yield this.getToken({
                    id: client.dataValues.id,
                    name: client.dataValues.name,
                    cpf: client.dataValues.cpf,
                    dataValues: client.dataValues
                });
                if (!token)
                    return null;
                const message = `Login efetuado com sucesso! Boas vindas, ${client.dataValues.name}!`;
                return { dataValues: Object.assign({}, client.dataValues), token, message };
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
ClientsService.cleanClientData = (client) => {
    console.log(client);
    delete client._previousDataValues;
    delete client.uniqno;
    delete client._changed;
    delete client._options;
    delete client.isNewRecord;
    return Object.assign({}, client);
};
exports.default = ClientsService;
