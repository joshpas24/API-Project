'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId'
      });
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId'
      });
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId'
      });
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId'
      })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users'
      },
      onDelete: 'CASCADE'
    },
    address: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    city: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    state: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    country: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};