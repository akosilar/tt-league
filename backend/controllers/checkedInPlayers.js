let checkedInPlayers = [];

const addPlayer = (id) => {
    if (!checkedInPlayers.includes(id)) {
        checkedInPlayers.push(id);
    }
};

const removePlayer = (id) => {
    checkedInPlayers = checkedInPlayers.filter(playerId => playerId !== id);
};

const isPlayerCheckedIn = (id) => {
    return checkedInPlayers.includes(id);
};

const getCheckedInPlayers = () => {
    return checkedInPlayers;
};

const getCheckedInCount = () => {
    return checkedInPlayers.length;
};

module.exports = {
    addPlayer,
    removePlayer,
    isPlayerCheckedIn,
    getCheckedInPlayers,
    getCheckedInCount
};

