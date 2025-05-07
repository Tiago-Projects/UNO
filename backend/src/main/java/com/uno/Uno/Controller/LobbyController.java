package com.uno.Uno.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.uno.Uno.Dto.PlayerDto;
import com.uno.Uno.Mapper.PlayerMapper;
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
        return lobbyService.getPlayersInLobby().stream().map(PlayerMapper::toDto).toList();
    }

    @MessageMapping("/lobby/check-connection")
    @SendTo("/topic/lobby/check-connection")
    public boolean checkConnection(String UUID) {
        return lobbyService.checkConnection(UUID);
    }

    @MessageMapping("/lobby/addPlayerToLobby")
    @SendTo("/topic/lobby/addPlayerToLobby")
    public void addPlayerToLobby(String UUID) {
        lobbyService.addPlayerToLobby(UUID); 
    }

    @Data
    public static class JoinRequest {
        private String name;
        private String playerId;
    }
}
