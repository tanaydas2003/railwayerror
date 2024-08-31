import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Comment extends Model { }

Comment.init({
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
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comments',
  underscored: true,
  timestamps: true,
});

export default Comment;
