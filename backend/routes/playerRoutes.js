const express = require('express');
const {
    getPlayers,
    getPlayer,
    createPlayer,
    deletePlayer,
    updatePlayer,
    checkinPlayer
} = require('../controllers/playerController');

const router = express.Router();

//get all players
router.get('/', getPlayers);

//get a single player
router.get('/:id', getPlayer);

//post a new player
router.post('/', createPlayer);

//delete a player
router.delete('/:id', deletePlayer);

//update a player
router.patch('/:id', updatePlayer);


//check in a player
router.post('/:id/checkin', checkinPlayer);

module.exports = router;
