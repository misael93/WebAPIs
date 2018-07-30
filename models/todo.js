var mongoose = require('mongoose');

var TodoSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', TodoSchema);
