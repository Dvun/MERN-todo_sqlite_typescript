const {DataTypes} = require('sequelize')
require('dotenv').config()
const DB = require('../config/db')

const RefreshToken = DB.define('RefreshToken', {
  refreshToken: {type: DataTypes.STRING},
  expires: {type: DataTypes.STRING},
  createdByIp: {type: DataTypes.STRING},
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  }
})



module.exports = RefreshToken