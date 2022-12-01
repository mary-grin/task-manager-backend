const { Board } = require("../models/Board");
const { Task } = require('../models/Task');
const errorHandler = require("../utils/errorHandler");

async function getBoard(req, res) {
    if(req.url) {
        try {
            const board = await Board.findById(req.params.id);
            const tasks = await Task.find({createdIn: req.params.id});
            res.status(200).json(tasks); 
        } catch (e) {
            errorHandler(res, e);
        }
    } else {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
}

async function getAllUserBoards(req, res) {
    const boards = await Board.find({createdBy: req.user.userId});
    res.status(200).json(boards);
}

async function addBoard(req, res) {
    const {name, description} = req.body;

    if(name) {
        const board = new Board({
            createdBy: req.user.userId,
            name,
            description,
            createdDate: req._startTime
        });
        try {
            await board.save();
            res.status(200).json(board);
        } catch (e) {
            errorHandler(res, e);
        }
    } else {
        res.status(400).json({
            message: 'Type name for creating a board'
        })
    }
}

async function editBoard(req, res) {
    const {name, description} = req.body;
    try {
        const board = await Board
        .findByIdAndUpdate({_id: req.params.id, 
            createdBy: req.user.userId}, 
            { name, description }, 
            {returnOriginal: false});
        res.status(200).json(board);
    } catch (e) {
        errorHandler(res, e);
    }
}

async function deleteBoard(req, res) {
    try {
        await Board.findOneAndDelete({ _id: req.params.id, createdBy: req.user.userId });
        await Task.deleteMany({createdIn: req.params.id});
        res.status(200).json(req.params.id) 
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports = {
    getBoard,
    getAllUserBoards, 
    addBoard, 
    editBoard, 
    deleteBoard,
}