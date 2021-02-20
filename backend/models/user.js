const {DataTypes} = require('sequelize')
const crypto = require('crypto')
require('dotenv').config()
const bcrypt = require('bcrypt')
const DB = require('../config/db')

const User = DB.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull:false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  resetPasswordToken: {
    type: DataTypes.STRING,
  },
  resetPasswordExpire: {
    type: DataTypes.DATE,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Date.now()
    }
  },
  role: {
    type: DataTypes.ENUM('publisher', 'user', 'admin'),
    allowNull: false,
    defaultValue: 'user'
  }
}, {
  modelName: 'User',
  freezeTableName: true
}, {
  instanceMethods: {

  }
})

// Encrypt password using bcrypt
User.beforeCreate(async (user, options) => {
  user.password = await bcrypt.hash(user.password, 11)
})

// Encrypt password after reset password
User.prototype.hashAfterRefresh = async (hashPass) => {
  return await bcrypt.hash(hashPass, 11)
}


// Generate and hash password token
User.prototype.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex')

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('SHA256')
    .update(resetToken)
    .digest('hex')

  // Set expire
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
  return resetToken
}



module.exports = User