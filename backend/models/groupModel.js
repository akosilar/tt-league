const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const matchSchema = require('./matchModel').schema;


const groupSchema = new Schema(
    {

        matches: {
            type: [[matchSchema]],
            required: true
        }
    });
    
module.exports = mongoose.model('Match', groupSchema);