import React, { createContext, useState, useContext, useEffect } from 'react';

const PlayersContext = createContext();

export const usePlayers = () => {
    return useContext(PlayersContext);
};

export const PlayersProvider = ({ children }) => {
    const [checkedPlayers, setCheckedPlayers] = useState([]);

    //load checked players from local storage
    useEffect(() => {
        const storedPlayers = JSON.parse(localStorage.getItem('checkedPlayers'));
        if (storedPlayers) {
            //dbg
            console.log('setting checked players', storedPlayers);
            setCheckedPlayers(storedPlayers);
        }
    }, []);

    const handleCheckboxChangeHook = (player, isChecked) => {
        
        setCheckedPlayers(prevCheckedPlayers => {
            let updatedCheckedPlayers;
    
            // Load checked players from local storage
            const storedPlayers = JSON.parse(localStorage.getItem('checkedPlayers')) || [];
    
            if (isChecked) {
                // Add player to checked players list
                updatedCheckedPlayers = [...prevCheckedPlayers, player];
            } else {
                // Remove player from checked players list
                updatedCheckedPlayers = prevCheckedPlayers.filter(checkedPlayer => checkedPlayer._id !== player._id);
            }
    
            // Update local storage with the updated list
            console.log('updating local storage', updatedCheckedPlayers);
            localStorage.setItem('checkedPlayers', JSON.stringify(updatedCheckedPlayers));
    
            return updatedCheckedPlayers;
        });
    };

    useEffect(() => {
        localStorage.setItem('checkedPlayers', JSON.stringify(checkedPlayers));
    }, [checkedPlayers]);

    return (
        <PlayersContext.Provider value={{ checkedPlayers, handleCheckboxChangeHook }}>
            {children}
        </PlayersContext.Provider>
    );
};

