import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Topic extends Model { }

Topic.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'Topic',
  tableName: 'topics',
  underscored: true,
  timestamps: true,
});

export default Topic;
