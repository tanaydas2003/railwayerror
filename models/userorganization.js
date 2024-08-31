import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class UserOrganization extends Model { }

UserOrganization.init({
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
  role_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'roles',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'UserOrganization',
  tableName: 'user_organizations',
  underscored: true,
  timestamps: false,
  primaryKey: false,
});

UserOrganization.removeAttribute('id');

export default UserOrganization;
