const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('organizations', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      owner_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      description: DataTypes.TEXT,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('organizations');
  },
};
