import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Video extends Model { }

Video.init({
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
}, {
  sequelize,
  modelName: 'Video',
  tableName: 'videos',
  underscored: true,
  timestamps: true,
});

export default Video;
