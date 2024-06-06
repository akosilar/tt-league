const Player = require('../models/playerModel');
const mongoose = require('mongoose');

//get all players
const getPlayers = async (req, res) => {
    const players = await Player.find({}).sort({createdAt: -1});
    res.status(200).json(players);
};

//get a single player
const getPlayer = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: `no such player: ${id}`});
    }

    const player = await Player.findById(id);
    if(!player){
        res.status(404).json({error: `no such player: ${id}`});
    }
    else{
        res.status(200).json(player);
    }
};

/**Adds a player to the database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const createPlayer = async(req, res) => {
    const {firstName, lastName, rating, email} = req.body;

    try{
        const player = await Player.create({firstName, lastName, rating, email});
        res.status(200).json(player);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
};

/**
 * deletes a player from the database 
 */
const deletePlayer = async(req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: `no such player: ${id}`})
    }

    const player = await Player.findOneAndDelete({_id: id});

    if(!player){
        return res.status(404).json({error: `no such player: ${id}`});
    }
    else{
        res.status(200).json(player);
    }
}

/**
 * updates a single player
 * @param {*} req 
 * @param {*} res 
 */
const updatePlayer = async(req, res) => {
    const {id} = req.params;
    const updates = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: `no such player: ${id}`})
    }
    
    const player = await Player.findByIdAndUpdate(id, updates, {new: true});
    if(!player){
        return res.status(404).json({error: `no such player: ${id}`});
    }

    res.status(200).json(player);

};

module.exports = {
    getPlayers,
    getPlayer,
    createPlayer,
    deletePlayer,
    updatePlayer
};