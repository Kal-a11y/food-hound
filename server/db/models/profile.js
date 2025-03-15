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

