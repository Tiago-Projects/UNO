package com.uno.Uno.Service;

import java.util.Collection;

import org.springframework.stereotype.Service;

import com.uno.Uno.Exception.NoPlayerConnectedWithUUID;
import com.uno.Uno.Exception.PlayerAlreadyConnected;
import com.uno.Uno.Model.Lobby;
import com.uno.Uno.Model.Player;
import com.uno.Uno.Model.PlayerModel;
import com.uno.Uno.Repository.PlayerRepository;

@Service
public class LobbyService {

    private final PlayerRepository playerRepository;
    private final LobbyManager lobbyManager;

    public LobbyService(PlayerRepository playerRepository, LobbyManager lobbyManager) {
        this.playerRepository = playerRepository;
        this.lobbyManager = lobbyManager;
    }
 
    public void addPlayer(String uuid, String name) {
        if (playerRepository.exists(uuid)) {
            throw new PlayerAlreadyConnected("Player already exists with UUID: " + uuid);
        }

        playerRepository.add(new PlayerModel(uuid, name));
    }

    public void addPlayerToSlot(String uuid, int slot) {
        Player player = playerRepository.get(uuid);
        if (player == null) {
            throw new NoPlayerConnectedWithUUID(uuid);
        }

        String lobbyID = "Lobby 1"; // TODO: change this when needed more lobbies.
        Lobby lobby = lobbyManager.getLobby(lobbyID);
        lobby.assignPlayerToSlot(uuid, playerRepository.get(uuid), slot);

        // playerRepository.remove(uuid); // TODO: maybe add this. Careful with checkConnection.
    }

    public Collection<Player> getConnectedPlayers() {
        return playerRepository.getAll();
    }

    public Lobby getPlayersInLobby() {
        String lobbyID = "Lobby 1"; // TODO: change this when needed more lobbies.
        return lobbyManager.getLobby(lobbyID);
    }

    public boolean checkConnection(String uuid) {
        return playerRepository.exists(uuid);
    }
}
