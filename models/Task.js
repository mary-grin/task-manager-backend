const mongoose = require('mongoose');

const Task = mongoose.model('task', {
    createdIn: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: 'NEW',
        enum: ['NEW', 'IN PROCESS', 'DONE'],
        required: true
    },
    imgSrc: {
        type: String,
        default: ''
    },
    createdDate: {
        type: Object,
        required: true
    }
});

module.exports = {
  Task,
};