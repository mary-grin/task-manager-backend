const mongoose = require('mongoose');

const Board = mongoose.model('board', {
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    createdDate: {
        type: Object,
        required: true
    }
});

module.exports = {
  Board,
};