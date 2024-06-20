const express = require('express');
const {
    checkinPlayer,
    getCheckedInPlayersCount

} = require('../controllers/matchController');

const router = express.Router();


//check in a player
router.post('/:id/checkin', checkinPlayer);

// Get checked-in players count
router.get('/checkin/count', getCheckedInPlayersCount);

module.exports = router;
