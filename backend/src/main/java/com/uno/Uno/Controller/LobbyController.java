package com.uno.Uno.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.uno.Uno.Dto.PlayerDto;
import com.uno.Uno.Mapper.PlayerMapper;
import com.uno.Uno.Model.Player;
import com.uno.Uno.Service.LobbyService;

import lombok.Data;


@Controller
public class LobbyController {
    @Autowired
    private LobbyService lobbyService;


    // Connect

    @MessageMapping("/lobby/joinConnected")
    @SendTo("/topic/lobby/joinConnected")
    public List<PlayerDto> joinLobby(JoinRequest request) {
        lobbyService.addPlayer(request.getPlayerId(), request.getName());
        return getConnectedPlayers();
    }

    @MessageMapping("/lobby/getConnectedPlayers")
    @SendTo("/topic/lobby/getConnectedPlayers")
    public List<PlayerDto> getConnectedPlayers() {
        return lobbyService.getConnectedPlayers().stream().map(PlayerMapper::toDto).toList();
    }


    // Add Player into a Slot of Lobby

    @MessageMapping("/lobby/addPlayerToLobby")
    @SendTo("/topic/lobby/addPlayerToLobby")
    public List<PlayerInSlotDto> addPlayerToLobby(PlayerInSlot playerInSlot) {
        lobbyService.addPlayerToSlot(playerInSlot.getUUID(), playerInSlot.getSlot()); 
        return getPlayersInLobby();
    }

    @MessageMapping("/lobby/getPlayersInLobby")
    @SendTo("/topic/lobby/getPlayersInLobby")
    public List<PlayerInSlotDto> getPlayersInLobby() {
        List<PlayerInSlotDto> playerInSlots = new ArrayList<>();

        for(Integer index: lobbyService.getPlayersInLobby().getSlots().keySet()) {
            PlayerInSlotDto playerInSlot = new PlayerInSlotDto();
            playerInSlot.setSlot(index);
            playerInSlot.setPlayerDto(PlayerMapper.toDto(lobbyService.getPlayersInLobby().getSlots().get(index)));
            playerInSlots.add(playerInSlot);
        }
        return playerInSlots;
    }


    // Check if Person is connected or on lobby.

    @MessageMapping("/lobby/check-connection")
    @SendTo("/topic/lobby/check-connection")
    public boolean checkConnection(String UUID) {
        return lobbyService.checkConnection(UUID);
    }

    @Data
    public static class JoinRequest {
        private String name;
        private String playerId;
    }

    @Data 
    public static class PlayerInSlot {
        @JsonProperty("UUID")
        private String UUID;
        private Integer slot;
    }


    @Data 
    public static class PlayerInSlotDto {
        private Integer slot;
        private PlayerDto playerDto;
    }
}
