const express = require('express');
const passport = require('passport');
const upload = require('../middleware/upload');
const { getBoard, getAllUserBoards, addBoard, editBoard, deleteBoard } = require('../controllers/board')
const { getTask, addTask, editTask, changeStatus, deleteTask } = require('../controllers/task');
const isAuth = require('../middleware/isAuth');
const router = express.Router();

router.get('/:id', getBoard);
router.get('/', isAuth, getAllUserBoards);
router.post('/', isAuth, addBoard);
router.patch('/:id', isAuth, editBoard);
router.delete('/:id', isAuth, deleteBoard);

router.get('/:idBoard/:id', isAuth, getTask);
router.post('/:idBoard', isAuth, upload.single('image'), addTask);
router.patch('/:idBoard/:id', isAuth, editTask);
router.patch('/:idBoard/status/:id', isAuth, changeStatus);
router.delete('/:idBoard/:id', isAuth, deleteTask);

module.exports = router;