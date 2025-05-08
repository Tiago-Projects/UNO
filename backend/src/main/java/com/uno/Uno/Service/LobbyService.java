package com.uno.Uno.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import org.springframework.stereotype.Service;

import com.uno.Uno.Exception.NoPlayerConnectedWithUUID;
import com.uno.Uno.Exception.PlayerAlreadyConnected;
import com.uno.Uno.Exception.PlayerAlreadyInLobby;
import com.uno.Uno.Model.Player;
import com.uno.Uno.Model.PlayerModel;

@Service
public class LobbyService {
    private final List<Player> playersConnected = new CopyOnWriteArrayList<>();
    private final List<Player> playersInLobby = new ArrayList<>(Collections.nCopies(4, null));


    public void addPlayer(String UUID, String name) {
        if (playersConnected.stream().anyMatch(p -> p.getUUID().equals(UUID))) {
            throw new PlayerAlreadyConnected("Player " + UUID + " with name '" + name + "' already connected.");
        }
        playersConnected.add(new PlayerModel(UUID, name));
    }

    public Player removeConnectedPlayer(String UUID) {
        if (playersConnected.stream().noneMatch(p -> p.getUUID().equals(UUID))) {
            throw new NoPlayerConnectedWithUUID("Player " + UUID + " is not connected.");
        }
        Player player = playersConnected.stream().filter(p -> p.getUUID().equals(UUID)).findFirst().get();
        playersConnected.removeIf(p -> p.getUUID().equals(UUID));
        return player;
    }

    public List<Player> getConnectedPlayers() {
        return playersConnected;
    }

    public List<Player> getPlayersInLobby() {
        return playersInLobby;
    }

    public boolean checkConnection(String UUID) {
        return isConnected(UUID) || inLobby(UUID);
    }

    private boolean isConnected(String UUID) {
        return playersConnected.stream().anyMatch(p -> p.getUUID().equals(UUID));
    }

    private boolean inLobby(String UUID) {
        for (Player player: playersInLobby) {
            if (player != null && player.getUUID().equals(UUID)) {
                return true;
            }
        }

        return false;
    }

    public void addPlayerToLobby(String UUID, Integer slot) {
        if (playersConnected.stream().noneMatch(p -> p.getUUID().equals(UUID))) {
            throw new NoPlayerConnectedWithUUID("Player " + UUID + " is not connected.");
        }
        if (inLobby(UUID)) {
            throw new PlayerAlreadyInLobby("Player " + UUID + " is already in lobby.");
        }

        Player player = removeConnectedPlayer(UUID);
        playersInLobby.set(slot, player);
    }
}
