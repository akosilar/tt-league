import React, { createContext, useState, useContext } from 'react';

const PlayersContext = createContext();

export const usePlayers = () => {
    return useContext(PlayersContext);
};

export const PlayersProvider = ({ children }) => {
    const [checkedPlayers, setCheckedPlayers] = useState([]);

    const handleCheckboxChangeHook = (playerId, playerFirstName, playerLastName, playerRating, isChecked) => {
        setCheckedPlayers(prevState => {
            if (isChecked) {
                return [...prevState, playerId, playerFirstName, playerLastName, playerRating];
            } else {
                return prevState.filter(id => id !== playerId);
            }
        });
    };

    return (
        <PlayersContext.Provider value={{ checkedPlayers, handleCheckboxChangeHook }}>
            {children}
        </PlayersContext.Provider>
    );
};

