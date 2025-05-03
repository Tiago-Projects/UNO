package com.uno.Uno.Service;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Service;

import com.uno.Uno.Exception.PlayerAlreadyConnected;
import com.uno.Uno.Model.Player;
import com.uno.Uno.Model.PlayerModel;

@Service
public class LobbyService {
    private final List<Player> players = new CopyOnWriteArrayList<>();

    public void addPlayer(String sessionId, String name) {
        if (players.stream().anyMatch(p -> p.getSessionId().equals(sessionId))) {
            throw new PlayerAlreadyConnected("Player " + sessionId + " with name '" + name + "' already connected.");
        }
        if (players.stream().noneMatch(p -> p.getSessionId().equals(sessionId))) {
            players.add(new PlayerModel(sessionId, name));
        }
    }

    public void removePlayer(String sessionId) {
        players.removeIf(p -> p.getName().equals(sessionId));
    }

    public List<Player> getPlayers() {
        return players;
    }
}
