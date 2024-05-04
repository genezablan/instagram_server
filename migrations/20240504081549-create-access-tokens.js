'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

      await queryInterface.sequelize.query(
        `
        CREATE TABLE IF NOT EXISTS access_tokens (
          id serial NULL,
          users_id integer NULL,
          client_id varchar(100) NULL,
          "token" text NULL,
          created_at timestamp NULL DEFAULT NOW(),
          updated_at timestamp NULL
        );
        `
      );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
