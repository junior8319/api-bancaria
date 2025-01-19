"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const Pix_1 = __importDefault(require("./Pix"));
class Client extends sequelize_1.Model {
}
Client.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    cpf: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    underscored: true,
    sequelize: _1.default,
    tableName: "clients"
});
Client.hasMany(Pix_1.default, { foreignKey: "creditedClientId", as: "receivedPix" });
Client.hasMany(Pix_1.default, { foreignKey: "payerClientId", as: "paidPix" });
exports.default = Client;
