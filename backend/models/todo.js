const {DataTypes} = require('sequelize');
const DB = require('../config/db')

const Todo = DB.define('Todo', {
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'user',
      key: 'id'
    }
  }
}, {
  modelName: 'Todo',
  freezeTableName: true
})


module.exports = Todo