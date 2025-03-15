const { Model, DataTypes } = require('sequelize');
const bycrypt = require('bcrypt');
const sequelize = require('../../config/connection');


class Profile extends Model {
    async checkPasword(loginPassword){
        try {
            return await bycrypt.compare(loginPassword, this.password);
        } catch (err){
            console.log(err);
            throw new Error('Error checking password');
        }
    };
};

Profile.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        validate: {
            len: [3, 30]
        }
    },
    email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [8]
        }
    },
    subscription: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    hooks: {
        beforeCreate: async (newProfileData) => {
            newProfileData.password = await bycrypt.hash(newProfileData.password, 10);
            return newProfileData;
        },
        beforeUpdate: async (updatedProfileData) => {
            updatedProfileData.password = await bycrypt.hash(updatedProfileData.password, 10);
            return updatedProfileData;
        },

    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'profile'
});
