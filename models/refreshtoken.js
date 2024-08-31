import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class RefreshToken extends Model { }

RefreshToken.init({
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'RefreshToken',
  tableName: 'refresh_tokens',
  underscored: true,
  timestamps: true,
});

export default RefreshToken;
