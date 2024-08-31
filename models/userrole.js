import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class UserRole extends Model { }

UserRole.init({
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'roles',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'UserRole',
  tableName: 'user_roles',
  underscored: true,
  timestamps: false,
  primaryKey: false,
});

UserRole.removeAttribute('id');

export default UserRole;
