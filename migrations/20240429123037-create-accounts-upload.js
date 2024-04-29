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
        CREATE TABLE IF NOT EXISTS accounts_upload (
          id serial4 NOT NULL,
          filename text NULL,
          accounts_id int4 NULL,
          created_at timestamp NULL DEFAULT now(),
          updated_at timestamp NULL DEFAULT now(),
          "type" varchar(100) NULL,
          CONSTRAINT accounts_upload_pk PRIMARY KEY (id)
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
