package com.uno.Uno.Controller;

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

    @MessageMapping("/lobby/joinConnected")
    public void joinLobby(JoinRequest request) {
        lobbyService.addPlayer(request.getPlayerId(), request.getName());
    }

    @MessageMapping("/lobby/getConnectedPlayers")
    @SendTo("/topic/lobby/getConnectedPlayers")
    public List<PlayerDto> getConnectedPlayers() {
        return lobbyService.getConnectedPlayers().stream().map(PlayerMapper::toDto).toList();
    }

    @MessageMapping("/lobby/getPlayersInLobby")
    @SendTo("/topic/lobby/getPlayersInLobby")
    public List<PlayerDto> getPlayersInLobby() {
        return lobbyService.getPlayersInLobby().stream()
            .map(player -> player != null ? PlayerMapper.toDto(player) : null)
            .toList();
    }

    @MessageMapping("/lobby/check-connection")
    @SendTo("/topic/lobby/check-connection")
    public boolean checkConnection(String UUID) {
        return lobbyService.checkConnection(UUID);
    }

    @MessageMapping("/lobby/addPlayerToLobby")
    @SendTo("/topic/lobby/addPlayerToLobby")
    public void addPlayerToLobby(PlayerInSlot playerInSlot) {
        lobbyService.addPlayerToLobby(playerInSlot.getUUID(), playerInSlot.getSlot()); 
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
}
