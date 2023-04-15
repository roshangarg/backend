const express = require('express')

const router = express.Router()

const { loginUser , signupUser } = require('../controllers/userController')

// Log in Route
router.post('/login', loginUser)

// signup Route
router.post('/signup', signupUser)

module.exports = router