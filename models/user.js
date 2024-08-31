import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

class User extends Model { }

User.init({
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
    password_hash: DataTypes.STRING,
    google_id: {
        type: DataTypes.STRING,
        unique: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    account_type: DataTypes.STRING,
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    timestamps: true,
});

export default User;
