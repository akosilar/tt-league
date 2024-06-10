const express = require('express');
const {
    getMatches,
    getMatch,
    createMatch,
    deleteMatch,
    updateMatch
} = require('../controllers/matchController');

const router = express.Router();

//get all players
router.get('/', getMatches);

//get a single player
router.get('/:id', getMatch);

//post a new player
router.post('/', createMatch);

//delete a player
router.delete('/:id', deleteMatch);

//update a player
router.patch('/:id', updateMatch);

module.exports = router;