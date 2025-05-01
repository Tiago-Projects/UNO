package com.uno.Uno.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.uno.Uno.Model.Player;
import com.uno.Uno.Service.LobbyService;

import lombok.Data;

@Controller
public class LobbyController {
    @Autowired
    private LobbyService lobbyService;

    @MessageMapping("lobby/join")
    @SendTo("/topic/lobby")
    public List<Player> joinLobby(JoinRequest request) {
        lobbyService.addPlayer(request.getName());

        return lobbyService.getPlayers();
    }


    @Data
    public static class JoinRequest {
        private String name;
    }
}
