const express = require('express');
const upload = require('../middleware/upload');
const { login, register, getAuth, logout } = require('../controllers/auth')
const router = express.Router();

router.post('/login', login);
router.post('/register', upload.single('image'), register);
router.get('/', getAuth);
router.post('/logout', logout);

module.exports = router;