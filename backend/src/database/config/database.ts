import 'dotenv/config';
import { Options } from "sequelize";


const config: Options = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  database: process.env.DB_NAME || 'banking_api',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || '3306'),
  dialect: 'mysql',
  logging: false
};

module.exports = config;