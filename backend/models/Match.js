const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const playerSchema = require('./Player').schema;

const matchSchema = new Schema(
{
    date: {
        type: Date,
        required: true
    },
    player1: {
        type: playerSchema,
        required: true
    },
    player2: {
        type: playerSchema,
        required: true
    },
    p1wins:{
        type: Number,
        required: true
    },
    p2wins:{
        type: Number,
        required: true
    }
        
    
});

module.exports = mongoose.model('Match', matchSchema);