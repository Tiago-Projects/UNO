package com.uno.Uno.Service;


import org.springframework.stereotype.Service;

import com.uno.Uno.Entity.PlayerEntity;
import com.uno.Uno.Exception.PlayerAlreadyConnected;
import com.uno.Uno.Repository.PlayerRepository;


/**
 * Service responsible for managing player registation and lobby access. <p>
 * 
 * This service interacts with the {@link PlayerRepository} to persists and verify players.
 * TODO: Interacts with LobbyManager.
 * 
 */
@Service
public class LobbyService {

    private final PlayerRepository playerRepository;

    public LobbyService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }
    
    /**
     * Registers a new player in the system if they are not already present.
     * 
     * @param playerId the unique identifier of the player
     * @param name     the name of the player
     * @throws PlayerAlreadyConnected if a player with the given ID already exists
     */
    public void addPlayer(String playerId, String name) {
        if (playerRepository.existsById(playerId)){
            throw new PlayerAlreadyConnected("Player already exists with UUID: " + playerId);
        }

        playerRepository.save(new PlayerEntity(playerId, name));
    }

    /**
     * Checks if a player with the given ID exists in the system.
     * 
     * @param playerId the ID to check
     * @return true if the player exists; false otherwise
     */
    public boolean existPlayer(String playerId) {
        return playerRepository.existsById(playerId);
    }
}
