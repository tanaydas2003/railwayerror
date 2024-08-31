import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Script extends Model { }

Script.init({
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
}, {
  sequelize,
  modelName: 'Script',
  tableName: 'scripts',
  underscored: true,
  timestamps: true,
});

export default Script;
