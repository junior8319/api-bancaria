"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_routes_1 = require("./routes/index.routes");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.app.get('/', (_req, res) => {
            res.send('Hello World');
        });
        this.app.use(index_routes_1.clientsRouter);
    }
    config() {
        const accessControl = (_req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000/*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        };
        this.app.use(accessControl);
        this.app.use(express_1.default.json());
    }
    start(PORT) {
        try {
            this.app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
        }
        catch (error) {
            console.log(`Error: ${error}`);
            console.log('Failed to start the server');
        }
    }
}
exports.default = App;
