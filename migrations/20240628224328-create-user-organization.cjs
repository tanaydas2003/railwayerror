const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('user_organizations', {
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      organization_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'organizations',
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
    await queryInterface.dropTable('user_organizations');
  },
};
