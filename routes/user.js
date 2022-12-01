const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const { getUserInfo, editUserInfo, changePhoto, deleteUser } = require('../controllers/user');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

router.get('/', isAuth, getUserInfo);
router.patch('/', isAuth, editUserInfo);
router.patch('/photo', isAuth, upload.single('image'), changePhoto);
router.delete('/', isAuth, deleteUser);

module.exports = router;




// passport.authenticate('jwt', {session: false})