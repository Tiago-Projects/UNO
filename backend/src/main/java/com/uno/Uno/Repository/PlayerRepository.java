package com.uno.Uno.Repository;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.uno.Uno.Model.Player;


@Repository
public class PlayerRepository {
    private Map<String, Player> players = new HashMap<>();;

    public void add(Player player) {
        players.put(player.getUUID(), player);
    }

    public Player remove(String uuid) {
        return players.remove(uuid);
    } 

    public Player get(String uuid) {
        return players.get(uuid);
    }

    public boolean exists(String uuid) {
        return players.containsKey(uuid);
    }

    public Collection<Player> getAll() {
        return players.values();
    }
}
