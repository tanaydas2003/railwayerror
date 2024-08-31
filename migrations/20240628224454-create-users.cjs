const { DataTypes } = require('sequelize');

module.exports = {
    async up(queryInterface) {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
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
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        });
    },

    async down(queryInterface) {
        await queryInterface.dropTable('users');
    },
};
