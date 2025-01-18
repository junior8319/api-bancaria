"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
class Pix extends sequelize_1.Model {
}
Pix.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    creditedClientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    payerClientId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    pixKey: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: sequelize_1.DataTypes.ENUM("pendente", "concluído", "cancelado"),
        allowNull: false,
        defaultValue: "pendente"
    }
}, {
    underscored: true,
    sequelize: _1.default,
    tableName: "pix_s",
    modelName: "Pix"
});
// Pix.belongsTo(Client, { foreignKey: "creditedClientId", as: "creditor" });
// Pix.belongsTo(Client, { foreignKey: "payerClientId", as: "payer" });
exports.default = Pix;
