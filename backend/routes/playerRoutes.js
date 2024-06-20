const express = require('express');
const {
    getPlayers,
    getPlayer,
    createPlayer,
    deletePlayer,
    updatePlayer,
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




module.exports = router;
