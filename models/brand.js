import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class Brand extends Model { }

Brand.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  organization_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'organizations',
      key: 'id',
    },
  },
  description: DataTypes.TEXT,
}, {
  sequelize,
  modelName: 'Brand',
  tableName: 'brands',
  underscored: true,
  timestamps: true,
});

export default Brand;
