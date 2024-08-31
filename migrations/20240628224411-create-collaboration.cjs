const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable('collaborations', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      video_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'videos',
          key: 'id',
        },
      },
      text_post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'text_posts',
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
      guest_email: DataTypes.STRING,
      can_comment: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      can_suggest: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable('collaborations');
  },
};
