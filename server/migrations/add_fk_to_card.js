'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return queryInterface.addColumn(
        'Cards',
        'BoardId',
        {
          type: Sequelize.INTEGER,
          reference: {
            model: {
              tableName: 'Boards'
            }
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        });
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.removeColumn('Cards', 'BoardId');
  }
};
