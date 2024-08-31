const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('comments', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      collaboration_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'collaborations',
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      timestamp: DataTypes.INTEGER,
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
    await queryInterface.dropTable('comments');
  },
};
