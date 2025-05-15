package com.uno.Uno.Service;


import org.springframework.stereotype.Service;

import com.uno.Uno.Entity.PlayerEntity;
import com.uno.Uno.Exception.PlayerAlreadyConnected;
import com.uno.Uno.Repository.PlayerRepository;

@Service
public class LobbyService {

    private final PlayerRepository playerRepository;
    private final LobbyManager lobbyManager;

    public LobbyService(PlayerRepository playerRepository, LobbyManager lobbyManager) {
        this.playerRepository = playerRepository;
        this.lobbyManager = lobbyManager;
    }
 
    public void addPlayer(String playerId, String name) {
        for (PlayerEntity playerEntity: playerRepository.findAll()) {
            System.out.println(playerEntity);
        }
        if (playerRepository.existsById(playerId)){
            throw new PlayerAlreadyConnected("Player already exists with UUID: " + playerId);
        }

        playerRepository.save(new PlayerEntity(playerId, name));
    }

    public boolean existPlayer(String playerId) {
        return playerRepository.existsById(playerId);
    }


    // public void addPlayerToSlot(String uuid, int slot) {
    //     Player player = playerRepository.get(uuid);
    //     if (player == null) {
    //         throw new NoPlayerConnectedWithUUID(uuid);
    //     }
    //     String lobbyID = "Lobby 1"; // TODO: change this when needed more lobbies.

    //     if (lobbyManager.isPlayerInLobby(lobbyID, uuid)) {
    //         throw new IllegalArgumentException("Player " + uuid + " already in lobby.");
    //     }

    //     Lobby lobby = lobbyManager.getLobby(lobbyID);
    //     lobby.assignPlayerToSlot(lobbyID, playerRepository.get(uuid), slot);

    //     // playerRepository.remove(uuid); // TODO: maybe add this. Careful with checkConnection.
    // }

    // public void addBotToSlot(int slot) {
    //     Player player = new BotModel("Bot " + slot, "Bot " + slot);

    //     String lobbyID = "Lobby 1"; // TODO: change this when needed more lobbies.

    //     Lobby lobby = lobbyManager.getLobby(lobbyID);
    //     lobby.assignPlayerToSlot(lobbyID, player, slot);
    // }

    // public Lobby getPlayersInLobby() {
    //     String lobbyID = "Lobby 1"; // TODO: change this when needed more lobbies.
    //     return lobbyManager.getLobby(lobbyID);
    // }

    // public boolean checkConnection(String uuid) {
    //     return playerRepository.exists(uuid);
    // }
}
