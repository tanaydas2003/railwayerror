const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('videos', {
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
      file_path: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      duration: DataTypes.INTEGER,
      variation: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
      },
      review_status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
      },
      approver_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
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
    await queryInterface.dropTable('videos');
  },
};
