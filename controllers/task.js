const { Task } = require('../models/Task');
const errorHandler = require('../utils/errorHandler');

async function getTask(req, res) {
    if(req.url) {
        try {
            const task = await Task.findById(req.params.id);
            res.status(200).json(task); 
        } catch (e) {
            errorHandler(res, e);
        }
    } else {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
}

async function addTask(req, res) {
    const {name, description, status} = req.body.task;

    if(name && status) {
        const task = new Task({
            createdIn: req.params.idBoard,
            name,
            description,
            status,
            imgSrc: req.file ? req.file.path : '',
            createdDate: req._startTime
        });
        try {
            await task.save();
            res.status(200).json(task);
        } catch (e) {
            errorHandler(res, e);
        }
    } else {
        res.status(400).json({
            message: 'Type name and status for creating a board'
        })
    }
}

async function editTask(req, res) {
    const {name, description} = req.body;
    try {
        await Task.findByIdAndUpdate({_id: req.params.id}, { name, description, imgSrc: req.file ? req.file.path : '' });
        res.status(200).json({
            message: 'Task was updated'
        });
    } catch (e) {
        errorHandler(res, e);
    }
}

async function changeStatus(req, res) {
    const { status } = req.body;
    if(status) {
        try {
           await Task.findByIdAndUpdate({_id: req.params.id}, {status});
            res.status(200).json({
                message: 'Status was updated'
            }); 
        } catch(e) {
            errorHandler(res, e);
        }
    } else {
        res.status(400).json({
            message: 'Type status to update'
        });
    }
}

async function deleteTask(req, res) {
    try {
        await Task.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({
            message: 'Task was deleted'
        }) 
    } catch(e) {
        errorHandler(res, e);
    }
}

module.exports = {
    getTask, 
    addTask, 
    editTask,
    changeStatus,
    deleteTask
}