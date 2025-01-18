'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('clients', [
      {
        name: 'Zé Alguém',
        cpf: '000.000.002-02',
        password: bcrypt.hashSync('123456', 10),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Maria Alguém',
        cpf: '000.000.001-01',
        password: bcrypt.hashSync('012345', 10),
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clients', null, {});
  }
};
