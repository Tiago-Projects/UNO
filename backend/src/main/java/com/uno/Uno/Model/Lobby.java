package com.uno.Uno.Model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.uno.Uno.Entity.PlayerEntity;


/**
 * Represents a game lobby where player can join and wait for a match to start.<p>
 * 
 * Each lobby has a unique identifier and supports up to 4 players.
 * Players are stores in the order they join. The lobby ensures that no duplicate
 * player are added and that the maximum player limit is respected.
 * 
 */
public class Lobby {
    private final String id;
    private final List<PlayerEntity> players = Collections.synchronizedList(new ArrayList<>());

    public Lobby(String id) {
        this.id = id;
    }

    public String getId() {
        return this.id;
    }

    public List<PlayerEntity> getPlayers() {
        return this.players;
    }

    public synchronized void addPlayer(PlayerEntity player) {
        if (isPlayerInLobby(player.getId())) {
            throw new IllegalStateException("Player already in lobby: " + player);
        }

        if (isFull()) {
            throw new IllegalStateException("Lobby is full.");
        }

        players.add(player);
    }

    public synchronized void removePlayer(String playerId) {
        players.removeIf(p -> p.getId().equals(playerId));
    }

    public boolean isPlayerInLobby(String playerId) {
        return players.stream().anyMatch(p -> p.getId().equals(playerId));
    }

    public boolean isEmpty() {
        return players.isEmpty();
    }

    public boolean isFull() {
        return players.size() >= 4;
    }
}
