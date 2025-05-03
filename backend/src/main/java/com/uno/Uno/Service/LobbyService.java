package com.uno.Uno.Service;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Service;

import com.uno.Uno.Exception.NoPlayerConnectedWithSessionId;
import com.uno.Uno.Exception.PlayerAlreadyConnected;
import com.uno.Uno.Model.Player;
import com.uno.Uno.Model.PlayerModel;

@Service
public class LobbyService {
    private final List<Player> playersConnected = new CopyOnWriteArrayList<>();

    public void addPlayer(String sessionId, String name) {
        if (playersConnected.stream().anyMatch(p -> p.getSessionId().equals(sessionId))) {
            throw new PlayerAlreadyConnected("Player " + sessionId + " with name '" + name + "' already connected.");
        }
        playersConnected.add(new PlayerModel(sessionId, name));
    }

    public void removePlayer(String sessionId) {
        if (playersConnected.stream().noneMatch(p -> p.getSessionId().equals(sessionId))) {
            throw new NoPlayerConnectedWithSessionId("Player " + sessionId + " is not connected.");
        }
        playersConnected.removeIf(p -> p.getName().equals(sessionId));
    }

    public List<Player> getPlayers() {
        return playersConnected;
    }
}
