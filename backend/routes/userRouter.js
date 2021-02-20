const express = require('express')
const {loginUser} = require('../controllers/userController')
const router = express.Router()
const {errorValidationMiddleware} = require('../middlewares/errorValidationMiddleware')
const {verifyToken} = require('../middlewares/auth')
const {registerUser, forgotPassword, resetPassword, getMe, updateUserData, updateUserPassword, logoutUser, refreshToken} = require('../controllers/userController')
const {loginValidation, registerValidation, resetPasswordValidation, updateUserDetails} = require('../validations/validations')


router.route('/register').post(registerValidation, errorValidationMiddleware, registerUser)
router.route('/login').post(loginValidation, errorValidationMiddleware, loginUser)
router.route('/logout/:userId').post(logoutUser)

router.route('/me').get(verifyToken, getMe)
router.route('/updateUserData').put(verifyToken, updateUserDetails, errorValidationMiddleware, updateUserData)
router.route('/updateUserPassword').put(verifyToken, resetPasswordValidation, errorValidationMiddleware, updateUserPassword)

router.route('/forgotPassword').post(forgotPassword)
router.route('/resetPassword/:resettoken').put(resetPasswordValidation, errorValidationMiddleware, resetPassword)

router.route('/resetToken').post(refreshToken)


module.exports = router