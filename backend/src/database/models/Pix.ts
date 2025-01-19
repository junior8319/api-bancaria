import { DataTypes, Model } from "sequelize";
import db from ".";
import Client from "./Client";

class Pix extends Model {
  public id!: number;
  public creditedClientId!: number;
  public payerClientId!: number;
  public value!: number;
  public pixKey!: string;
  public message!: string;
  public status!: string;
}

Pix.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  creditedClientId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  payerClientId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  value: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  pixKey: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM("pendente", "concluído", "cancelado"),
    allowNull: false,
    defaultValue: "pendente"
  }
}, {
  underscored: true,
  sequelize: db,
  tableName: "pix_s",
  modelName: "Pix"
});

// Pix.belongsTo(Client, { foreignKey: "creditedClientId", as: "creditor" });
// Pix.belongsTo(Client, { foreignKey: "payerClientId", as: "payer" });

export default Pix;