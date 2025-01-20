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
const ClientsService_1 = __importDefault(require("../services/ClientsService"));
class ClientsController {
    constructor() {
        this.getAllClients = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const clients = yield this.clientsService.getAllClients();
            if (clients && clients.length > 0) {
                res.status(200).json(clients);
            }
            else {
                res.status(404).json({ message: 'No clients found' });
            }
        });
        this.getClientById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = Number(req.params.id);
            const client = yield this.clientsService.getClientById(id);
            if (client) {
                res.status(200).json(client);
            }
            else {
                res.status(404).json({ message: `Client with id ${id} not found` });
            }
        });
        this.createClient = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const clientData = req.body;
            const client = yield this.clientsService.createClient(clientData);
            if (client) {
                res.status(201).json(client);
            }
            else {
                res.status(500).json(this.serverErrorMessage);
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const loginData = req.body;
            const client = yield this.clientsService.login(loginData);
            if (client) {
                res.status(200).json(client);
            }
            else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        });
        this.clientsService = new ClientsService_1.default();
    }
}
exports.default = new ClientsController();
