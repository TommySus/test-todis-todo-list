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
        'Checklists',
        'CardId',
        {
          type: Sequelize.INTEGER,
          reference: {
            model: {
              tableName: 'Cards'
            }
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        }
      );
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return queryInterface.removeColumn('Checklists', 'CardId')
  }
};
