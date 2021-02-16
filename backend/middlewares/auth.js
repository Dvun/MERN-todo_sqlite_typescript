const User = require('../models/user')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// Generate user token
exports.generatedToken = ({id, role}) => {
  return jwt.sign({id, role}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_TIME})
}

exports.refreshGenerateToken = () => {
  return jwt.sign({}, process.env.REFRESH_JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_TIME})
}

// Verify user token
exports.verifyToken = async (req, res, next) => {
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
}

// // Send token to cookie
// exports.sendTokenCookie = (user, token, refreshToken, res) => {
//   const options = {
//     expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
//     httpOnly: true,
//   }
//   if (process.env.NODE_ENV === 'production') {
//     options.secure = true
//   }
//   res
//     .cookie('token', token, options)
//     .cookie('refresh_token', refreshToken, options)
//     .json({
//       success: true,
//       firstName: user.firstName,
//       email: user.email,
//       id: user.id,
//       role: user.role,
//       token,
//       refreshToken
//     })
// }

// Grand access to specific roles
exports.authorize = (...roles) => {
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
}
