package com.uno.Uno.Service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.uno.Uno.Model.Lobby;


@Component
public class LobbyManager {
    private final Map<String, Lobby> lobbies = new HashMap<>();

    public Lobby getLobby(String lobbyId) {
        return lobbies.computeIfAbsent(lobbyId, id -> new Lobby(lobbyId));
    }   

    public Map<String, Lobby> getAllLobbies() {
        return Map.copyOf(lobbies);
    }

    public void removeLobby(String lobbyId) {
        lobbies.remove(lobbyId);
    }

    public boolean isPlayerInLobby(String lobbyId, String playerUuid) {
        return lobbies.get(lobbyId).isPlayerInLobby(playerUuid);
    }
}
