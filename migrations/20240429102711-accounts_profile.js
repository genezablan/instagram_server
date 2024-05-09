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
      CREATE TABLE if not exists public.accounts_profile (
        id serial4 NOT NULL,
        bio text NULL,
        accounts_id int4 NOT NULL,
        email varchar(255) NULL,
        "location" text NULL,
        "name" text NULL,
        created_at timestamp NULL,
        updated_at timestamp NULL,
        instagram_id varchar(100) NULL,
        email_verified bool NULL DEFAULT false,
        approved bool NULL DEFAULT false,
        approver_id int4 NULL,
        CONSTRAINT accounts_profile_pk PRIMARY KEY (id),
        CONSTRAINT accounts_profile_un UNIQUE (accounts_id)
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
