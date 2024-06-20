const mongoose = require('mongoose');

const {
    addPlayer,
    removePlayer,
    isPlayerCheckedIn,
    getCheckedInCount
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

module.exports = {
    checkinPlayer,
    getCheckedInPlayersCount
};

