const {DataTypes} = require('sequelize')
require('dotenv').config()
const DB = require('../config/db')

const RefreshToken = DB.define('RefreshToken', {
  refreshToken: {type: DataTypes.STRING},
  expires: {type: DataTypes.DATE},
  created: {type: DataTypes.STRING, defaultValue: Math.round(Date.now() / 1000)},
  createdByIp: {type: DataTypes.STRING},
  revoked: {type: DataTypes.DATE},
  revokedByIp: {type: DataTypes.STRING},
  replacedByToken: {type: DataTypes.STRING},
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