const mongoose = require('mongoose');
const Player = require('../models/playerModel');

const {
    addPlayer,
    removePlayer,
    isPlayerCheckedIn,
    getCheckedInCount,
    getCheckedInPlayers
} = require('../controllers/checkedInPlayers');

// Check-in a player
const checkinPlayer = (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: `no such player: ${id}` });
    }

    if (isPlayerCheckedIn(id)) {
        removePlayer(id);
    } else {
        addPlayer(id);
    }
    res.status(200).json({ playerId: id, checkedIn: isPlayerCheckedIn(id) });
};

// Get the count of checked-in players
const getCheckedInPlayersCount = (req, res) => {
    res.status(200).json({ count: getCheckedInCount() });
};

// Get details of checked-in players
const getCheckedInPlayersDetails = async (req, res) => {
    try {
        const checkedInPlayerIds = getCheckedInPlayers();
        const players = await Player.find({ _id: { $in: checkedInPlayerIds } });
        res.status(200).json(players);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    checkinPlayer,
    getCheckedInPlayersCount,
    getCheckedInPlayersDetails
};

