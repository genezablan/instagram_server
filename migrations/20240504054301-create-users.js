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
        CREATE TABLE public.users (
          id serial NOT NULL,
          username varchar(100) NULL,
          hashed_password text NULL,
          salt text NULL,
          created_at timestamp NULL DEFAULT NOW(),
          updated_at timestamp NULL,
          roles _jsonb NULL,
          CONSTRAINT users_pk PRIMARY KEY (id),
          CONSTRAINT users_un UNIQUE (username)
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
