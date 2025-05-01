package com.uno.Uno.Service;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Service;

import com.uno.Uno.Model.Player;
import com.uno.Uno.Model.PlayerModel;

@Service
public class LobbyService {
    private final List<Player> players = new CopyOnWriteArrayList<>();

    public void addPlayer(String name) {
        if (players.stream().noneMatch(p -> p.getName().equals(name))) {
            players.add(new PlayerModel(name));
        }
    }

    public void removePlayer(String name) {
        players.removeIf(p -> p.getName().equals(name));
    }

    public List<Player> getPlayers() {
        return players;
    }
}
