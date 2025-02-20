import { DataTypes, Model } from "sequelize";
import db from ".";
import PixModel from "./Pix";

class Client extends Model {
  public id!: number;
  public name!: string;
  public cpf!: string;
  public password!: string;
}

Client.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  underscored: true,
  sequelize: db,
  tableName: "clients"
});

Client.hasMany(PixModel, { foreignKey: "creditedClientId", as: "receivedPix" });
Client.hasMany(PixModel, { foreignKey: "payerClientId", as: "paidPix" });

export default Client;