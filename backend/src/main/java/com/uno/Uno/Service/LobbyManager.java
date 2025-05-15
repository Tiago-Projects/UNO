package com.uno.Uno.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import com.uno.Uno.Entity.PlayerEntity;
import com.uno.Uno.Model.Lobby;


/**
 * Manages multiple game lobbies identifies by unique lobby IDs. <p>
 * 
 * Responsible for creating, removing, and accessing {@link Lobby} instances. <p>
 * 
 * Thread-safe implementation using {@link ConcurrentHashMap} to handle concurrent access.
 */
@Component
public class LobbyManager {
    private final Map<String, Lobby> lobbies = new ConcurrentHashMap<>();

    public Lobby getLobby(String lobbyId) {
        return lobbies.computeIfAbsent(lobbyId, id -> new Lobby(lobbyId));
    }

    public void addLobby(String lobbyId) {
        lobbies.put(lobbyId, new Lobby(lobbyId));
    }

    public void removeLobby(String lobbyId) {
        lobbies.remove(lobbyId);
    }

    public Map<String, Lobby> getAllLobbies() {
        return Map.copyOf(lobbies);
    }

    public boolean isPlayerInLobby(String lobbyId, String playerId) {
        Lobby lobby = getLobby(lobbyId);
        if (lobby == null) {
            throw new IllegalArgumentException("Lobby " + lobbyId + " does not exist.");
        }
        return lobby.isPlayerInLobby(playerId);
    }

    public void addPlayerToLobby(String lobbyId, PlayerEntity player) {
        Lobby lobby = getLobby(lobbyId);
        if (lobby == null) {
            throw new IllegalArgumentException("Lobby " + lobbyId + " does not exist.");
        }
        lobby.addPlayer(player);
    }

    public void removePlayerFromLobby(String lobbyId, String playerId) {
        Lobby lobby = getLobby(lobbyId);
        if (lobby == null) {
            throw new IllegalArgumentException("Lobby " + lobbyId + " does not exist.");
        }
        lobby.removePlayer(playerId);
        if (lobby.isEmpty()) {
            System.out.println("Lobby " + lobbyId + " is empty.");
        }
    }

    public Lobby findLobbyByPlayerId(String playerId) {
        return lobbies.values().stream()
            .filter(lobby -> lobby.isPlayerInLobby(playerId))
            .findFirst()
            .orElse(null);
    }

}
