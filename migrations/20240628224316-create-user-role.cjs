const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('user_roles', {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      role_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_roles');
  },
};
