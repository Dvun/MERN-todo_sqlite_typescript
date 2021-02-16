const User = require('../models/user')
const RefreshToken = require('../models/refreshToken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')
const {sendTokenCookie, refreshGenerateToken, generatedToken} = require('../middlewares/auth')

module.exports = {

  // Register new user
  registerUser: async (req, res) => {
    const {firstName, lastName, email, password, role} = req.body
    try {
      const user = await User.findOne({where: {email}})
      if (user) {
        return res.status(404).json({success: false, errorMsg: `User with email ${email} already exist!`})
      } else {
        await User.create({
          success: true,
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          role: role,
        })
        res.status(201).json({success: true, msg: 'User registered!'})
      }
    } catch (e) {
      res.status(500).json({success: false, errorMsg: 'Server Error!'})
    }
  },

// Login user
  loginUser: async (req, res) => {
    const ip = req.ip
    const {email, password} = req.body
    try {
      const user = await User.findOne({where: {email}})
      if (!user) {
        return res.status(401).json({success: false, errorMsg: `User with email ${email} not registered!`})
      }
      // Password validation
      const validPass = await bcrypt.compare(password, user.password)
      if (!validPass) {
        return res.status(401).json({success: false, errorMsg: 'Email or password is not correct!'})
      }
      // Token generation
      const token = await generatedToken(user)
      // Refresh Token generation
      const refreshToken = await refreshGenerateToken(user)
      await RefreshToken.create({
        userId: user.id,
        createdByIp: ip,
        refreshToken: refreshToken
      })
      // // Send token to cookie
      // await sendTokenCookie(user, token, refreshToken, res)

      res.status(200).json({
        success: true,
        user: {
          firstName: user.firstName,
          email: user.email,
          id: user.id,
          role: user.role,
        },
        token,
      })
    } catch (e) {
      console.log(e)
      res.status(500).json({success: false, errorMsg: 'Server Error!'})
    }
  },

// User logout and clear cookies
  logoutUser: async (req, res) => {
    res.clearCookie('token', {path: '/'})
    res.clearCookie('refresh_token', {path: '/'})
    try {
      res.status(200).json({
        success: true,
        user: null,
      })
    } catch (e) {
      res.status(500).json({success: false, errorMsg: 'Server Error!'})
    }
  },

// Forgot password request
  forgotPassword: async (req, res, next) => {
    const {email} = req.body
    try {
      const user = await User.findOne({where: {email}})
      if (!user) {
        return next(res.status(404).json({errorMsg: 'There is not user with that email!'}))
      }

      // Get reset token
      const resetToken = user.getResetPasswordToken()
      await user.save({validate: false})

      // Create reset url
      const resetUrl = `${req.protocol}://localhost:3000/resetPassword/${resetToken}`

      const message = `
            <div>
              <p>You are receiving this email because you (or someone else) has requested the reset of a password.</p>
              <p>Please click on the link to reset your password:
                <a href='${resetUrl}' 
                    style="cursor: pointer; 
                    background: #4051B5; 
                    padding: 10px 5px 10px 5px; 
                    border: 1px solid #4051B5;
                    border-radius: 5px;
                    color: whitesmoke;
                    text-decoration: none;
                    "
                >
                  Reset Password
                </a>
              </p>
            </div>
                    `

      try {
        await sendEmail({
          email: user.dataValues.email,
          subject: 'Password reset token',
          message,
        })
        res.status(200).json({
          success: true,
          msg: 'Check please your email address!',
        })
      } catch (e) {
        user.resetPasswordToken = null
        user.resetPasswordExpire = null
        await user.save({validate: false})
        return res.status(500).json({errorMsg: 'Email could not be sent!'})
      }
      next()
    } catch (e) {
      res.status(500).json({success: false, errorMsg: 'Server Error!'})
    }
  },

// Reset Password from link
  resetPassword: async (req, res, next) => {
    // Get hashed token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resettoken).digest('hex')
    try {
      const user = await User.findOne({
        where: {resetPasswordToken: resetPasswordToken},
      })
      if (!user) {
        return next(res.status(400).json({success: false, errorMsg: 'Invalid Token!'}))
      } else {
        const hashPass = await user.hashAfterRefresh(req.body.password)
        // Set a new password
        await user.update({
          password: hashPass,
          resetPasswordExpire: null,
          resetPasswordToken: null,
        }, {where: {id: user.dataValues.id}})
      }
      res.status(201).json({success: true, msg: 'Password successfully changed. Please login!'})
    } catch (e) {
      res.status(500).json({success: false, errorMsg: 'Server Error!'})
    }
  },

// Receive user data
  getMe: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.dataValues.id)
      res.status(200).json({
        success: true,
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      })
      next()
    } catch (e) {
      res.status(500).json({success: false, errorMsg: 'Server Error!'})
    }
  },

// Update user
  updateUserData: async (req, res) => {
    try {
      const user = await User.findByPk(req.user.dataValues.id)
      if (!user) {
        return res.status(401).json({errorMsg: 'User not found!'})
      }
      await user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      }, {where: {id: req.user.dataValues.id}})
      res.status(200).json({
        success: true,
        user,
        msg: 'User details updated successfully!',
      })
    } catch (e) {
      res.status(500).json({success: false, errorMsg: 'Server Error!'})
    }
  },

// Update user password
  updateUserPassword: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.dataValues.id)
      if (!user) {
        return res.status(401).json({errorMsg: 'User not found!'})
      }

      // Password validation
      const oldPassword = await bcrypt.compare(req.body.currentPassword, user.dataValues.password)
      if (!oldPassword) {
        return next(res.status(401).json({success: false, errorMsg: 'Old password is incorrect!'}))
      }
      await user.update({
        password: await user.hashAfterRefresh(req.body.newPassword),
      }, {where: {id: user.dataValues.id}})
      // Token generation
      const token = await generatedToken(user.id)
      // Send token to cookie
      await sendTokenCookie(user, token, res)
      // res.status(200).json({msg: 'User password updated successfully!'})
    } catch (e) {
      res.status(500).json({success: false, errorMsg: 'Server Error!'})
    }
  }

}

