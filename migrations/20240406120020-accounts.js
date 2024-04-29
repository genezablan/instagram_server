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
        CREATE TABLE IF NOT EXISTS public.accounts (
          id serial4 NOT NULL,
          "name" varchar(100) NOT NULL,
          created_at timestamp NULL DEFAULT now(),
          updated_at timestamp NULL DEFAULT now(),
          CONSTRAINT accounts_pk PRIMARY KEY (id),
          CONSTRAINT accounts_un UNIQUE (name)
        );`
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
