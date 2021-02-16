const {Sequelize} = require('sequelize')

const DB = new Sequelize({
  dialect: 'sqlite',
  storage: `./backend/data/database.sqlite3`,
})



module.exports = DB
