const { User } = require("../models/User");
const { Board } = require('../models/Board');
const errorHandler = require("../utils/errorHandler");

async function getUserInfo(req, res) {
    try {
        console.log(req.user.userId);
        const user = await User.findOne({ _id: req.user.userId });
        if(user) {
            res.status(200).json({
                username: user.username,
                imgSrc: user.imgSrc,
                createdDate: user.createdDate
            });
        } else {
            res.status(404).json({
                message: 'Not found'
            })
        }
      } catch (e) {
        errorHandler(res, e);
      }
}

async function editUserInfo(req, res) {
    const {username} = req.body;
    const {imgSrc} = req.file ? req.file.path : ''
    const user = await User.findOne({username: username});

    if(user) {
        res.status(400).json({
            message: 'This username is already exist'
        })
    } else {
        try {
            await User.findByIdAndUpdate({_id: req.user.userId}, {username, imgSrc});
            const user = await User.findOne({_id: req.user.userId})
            res.status(200).json(user);
        } catch (e) {
            errorHandler(res, e)
        }
    }
}

async function changePhoto(req, res) {
    console.log(req.file);
    try {
        console.log(req.file.path)
        await User.findByIdAndUpdate({_id: req.user.userId}, {imgSrc: req.file ? req.file.path : ''});
        res.status(200).json(req.file.path);
    } catch(e) {
        errorHandler(res, e);
    }
}

async function deleteUser(req, res) {
    try {
        await User.findOneAndDelete({ _id: req.user.userId });
        await Board.deleteMany({createdBy: req.user.userId});
        res.status(200).json({
            message: 'User was deleted'
        }) 
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports = {
    getUserInfo,
    editUserInfo,
    changePhoto,
    deleteUser
}