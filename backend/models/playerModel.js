const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema(

{
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Player', playerSchema);