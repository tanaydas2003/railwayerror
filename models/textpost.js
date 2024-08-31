import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class TextPost extends Model { }

TextPost.init({
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
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  title: DataTypes.STRING,
  status: DataTypes.STRING,
}, {
  sequelize,
  modelName: 'TextPost',
  tableName: 'text_posts',
  underscored: true,
  timestamps: true,
});

export default TextPost;
