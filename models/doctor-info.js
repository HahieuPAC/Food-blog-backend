'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class doctor_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      doctor_info.belongsTo(models.user, {foreignKey: 'doctorId'});

      doctor_info.belongsTo(models.Allcode, { foreignKey: 'priceId', targetKey: 'keyMap', as: 'priceTypeData' });
      doctor_info.belongsTo(models.Allcode, { foreignKey: 'provinceId', targetKey: 'keyMap', as: 'provinceTypeData' });
      doctor_info.belongsTo(models.Allcode, { foreignKey: 'paymentId', targetKey: 'keyMap', as: 'paymentTypeData' });
    }   
    };
    doctor_info.init({
    doctorId: DataTypes.INTEGER,
    specialtyId: DataTypes.INTEGER,
    clinicId: DataTypes.INTEGER,
    priceId: DataTypes.STRING,
    provinceId: DataTypes.STRING,
    paymentId: DataTypes.STRING,
    addressClinic: DataTypes.STRING,
    nameClinic: DataTypes.STRING,
    note: DataTypes.STRING,
    count: DataTypes.INTEGER,
    }, {
    sequelize,
    modelName: 'doctor_info',
    freezeTableName: true
    });
    return doctor_info;
};