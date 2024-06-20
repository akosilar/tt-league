const express = require('express');
const {
    checkinPlayer,
    getCheckedInPlayersCount,
    getCheckedInPlayersDetails

} = require('../controllers/matchController');

const router = express.Router();

// get checked in players
router.get('/', getCheckedInPlayersDetails);


//check in a player
router.post('/:id/checkin', checkinPlayer);

// Get checked-in players count
router.get('/checkin/count', getCheckedInPlayersCount);

module.exports = router;
