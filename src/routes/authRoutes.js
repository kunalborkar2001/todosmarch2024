const express = require('express')
const router = express.Router()

const authController = require('../controllers/authController')
const authanticateToken = require('../middleware/authenticateToken')

router.post("/register", authController.register)
router.post("/login",authanticateToken ,authController.login)

module.exports = router