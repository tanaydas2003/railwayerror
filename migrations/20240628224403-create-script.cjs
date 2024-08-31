const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('scripts', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
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
      topic_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'topics',
          key: 'id',
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: DataTypes.STRING,
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
    await queryInterface.dropTable('scripts');
  },
};
