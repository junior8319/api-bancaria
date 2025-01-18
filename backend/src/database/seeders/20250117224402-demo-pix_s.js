'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('pix_s', [
      {
        credited_client_id: 1,
        payer_client_id: 2,
        value: 100.00,
        pix_key: 'zealguem@alguem.com',
        message: 'Dinheiro para compras',
        status: 'concluído',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        credited_client_id: 1,
        payer_client_id: 2,
        value: 150.00,
        pix_key: '000.000.002-02',
        message: 'Dinheiro para pagar contas',
        status: 'pendente',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('pix_s', null, {});
  }
};
