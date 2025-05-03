package com.uno.Uno.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

import com.uno.Uno.Dto.PlayerDto;
import com.uno.Uno.Mapper.PlayerMapper;
import com.uno.Uno.Service.LobbyService;

import lombok.Data;


@Controller
public class LobbyController {
    @Autowired
    private LobbyService lobbyService;

    @MessageMapping("/lobby/join")
    public void joinLobby(SimpMessageHeaderAccessor headerAccessor, JoinRequest request) {
        lobbyService.addPlayer(headerAccessor.getSessionId(), request.getName());
    }

    @MessageMapping("/lobby/getPlayers")
    @SendTo("/topic/lobby/getPlayers")
    public List<PlayerDto> getPlayers() {
        return lobbyService.getPlayers().stream().map(PlayerMapper::toDto).toList();
    }

    @Data
    public static class JoinRequest {
        private String name;
    }
}
