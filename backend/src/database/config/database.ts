import 'dotenv/config';
import { Options } from "sequelize";

const config: Options = {
  username: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_ROOT_PASSWORD || '123456',
  database: process.env.MYSQL_DATABASE || 'banking_api',
  host: process.env.DB_HOST || 'db',
  port: Number(process.env.DB_PORT || '3306'),
  dialect: 'mysql',
  logging: false
};

module.exports = config;