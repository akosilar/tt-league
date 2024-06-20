const Player = require('../models/playerModel');
const mongoose = require('mongoose');
const {
    isPlayerCheckedIn
} = require('../controllers/checkedInPlayers');



//get all players
const getPlayers = async (req, res) => {
    const players = await Player.find({}).sort({ createdAt: -1 });
    const playersWithCheckInStatus = players.map(player => ({
        ...player._doc, // spread the player document
        checkedIn: isPlayerCheckedIn(player._id.toString())
    }));
    res.status(200).json(playersWithCheckInStatus);
};

//get a single player
const getPlayer = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `no such player: ${id}` });
    }

    const player = await Player.findById(id);
    if (!player) {
        res.status(404).json({ error: `no such player: ${id}` });
    }
    else {
        //res.status(200).json(player);
        const playerWithCheckInStatus = {
            ...player._doc, // spread the player document
            checkedIn: checkedInPlayers.includes(player._id.toString())
        };
        return res.status(200).json(playerWithCheckInStatus);
    }
};

/**Adds a player to the database
 * 
 * @param {*} req 
 * @param {*} res 
 */
const createPlayer = async (req, res) => {
    const { firstName, lastName, rating, email } = req.body;

    try {
        const player = await Player.create({ firstName, lastName, rating, email });
        res.status(200).json(player);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};

/**
 * deletes a player from the database 
 */
const deletePlayer = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `no such player: ${id}` })
    }

    const player = await Player.findOneAndDelete({ _id: id });

    if (!player) {
        return res.status(404).json({ error: `no such player: ${id}` });
    }
    else {
        res.status(200).json(player);
    }
}

/**
 * updates a single player
 * @param {*} req 
 * @param {*} res 
 */
const updatePlayer = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `no such player: ${id}` })
    }

    const player = await Player.findByIdAndUpdate(id, updates, { new: true });
    if (!player) {
        return res.status(404).json({ error: `no such player: ${id}` });
    }

    res.status(200).json(player);

};

// Check-in a player
const checkinPlayer = (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `no such player: ${id}` });
    }

    if (checkedInPlayers.includes(id)) {
        // If the player is already checked in, remove from the list (toggle off)
        checkedInPlayers = checkedInPlayers.filter(playerId => playerId !== id);
    } else {
        // Add to the list if not already present (toggle on)
        checkedInPlayers.push(id);
        console.log(checkedInPlayers)
    }

    res.status(200).json({ playerId: id, checkedIn: checkedInPlayers.includes(id) });
};

// Get the count of checked-in players
const getCheckedInPlayersCount = (req, res) => {
    res.status(200).json({ count: checkedInPlayers.length });
};


module.exports = {
    getPlayers,
    getPlayer,
    createPlayer,
    deletePlayer,
    updatePlayer,
};
