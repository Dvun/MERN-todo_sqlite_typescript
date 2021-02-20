const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {logoutUser} = require('../controllers/userController')
require('dotenv').config()


module.exports = {

  // Generate user token
  generatedToken: ({id, role}) => {
    return jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_TIME})
  },

  refreshGenerateToken: ({id, role}) => {
    return jwt.sign({id, role}, process.env.REFRESH_JWT_SECRET, {expiresIn: process.env.REFRESH_JWT_EXPIRES_TIME})
  },

  // Verify user token
  verifyToken: async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    try {
      if (token) {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findByPk(decoded.id)
        next()
      } else {
        return res.status(401).json({errorMsg: 'Not authorized, token failed!'})
      }
    } catch (e) {
      return res.status(401).json({errorMsg: 'Not authorized, token failed!'})
    }
  },

  // Grand access to specific roles
  authorize: (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.dataValues.role)) {
        return next(
          res.status(404).json({
            success: false,
            errorMsg: `User role ${req.user.dataValues.role} is not authorized to access this route!`,
          }),
        )
      }
      next()
    }
  },

}