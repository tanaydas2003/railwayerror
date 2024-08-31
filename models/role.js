import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Role extends Model { }

Role.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Role',
  tableName: 'roles',
  underscored: true,
  timestamps: true,
});

export default Role;
