package com.uno.Uno.Service;


import org.springframework.stereotype.Service;

import com.uno.Uno.Entity.PlayerEntity;
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
    
    public void addPlayer(String playerId, String name) {
        if (playerRepository.existsById(playerId)){
            throw new IllegalArgumentException("Player already exists with UUID: " + playerId);
        }

        playerRepository.save(new PlayerEntity(playerId, name));
    }

    public boolean existPlayer(String playerId) {
        return playerRepository.existsById(playerId);
    }
}
