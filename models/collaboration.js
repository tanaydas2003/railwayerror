import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Collaboration extends Model { }

Collaboration.init({
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
}, {
  sequelize,
  modelName: 'Collaboration',
  tableName: 'collaborations',
  underscored: true,
  timestamps: true,
});

export default Collaboration;
