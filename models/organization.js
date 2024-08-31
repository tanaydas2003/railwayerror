import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Organization extends Model { }

Organization.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  owner_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  description: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'Organization',
  tableName: 'organizations',
  underscored: true,
  timestamps: true,
});

export default Organization;
