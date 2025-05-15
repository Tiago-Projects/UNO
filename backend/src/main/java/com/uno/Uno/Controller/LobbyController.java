package com.uno.Uno.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import com.uno.Uno.Dto.PlayerExistsResponse;
import com.uno.Uno.Dto.CheckPlayer;
import com.uno.Uno.Dto.PlayerToRepository;
import com.uno.Uno.Service.LobbyService;

@Controller
public class LobbyController {
    @Autowired
    private LobbyService lobbyService;

    @MessageMapping("/player/register")
    public void registerPlayer(PlayerToRepository request) {
        lobbyService.addPlayer(request.getPlayerId(), request.getName());
    }

    @MessageMapping("/player/exists")
    @SendToUser("/queue/player/exists")
    public PlayerExistsResponse checkPlayerExists(CheckPlayer request) {
        boolean exists = lobbyService.existPlayer(request.getPlayerId());
        return new PlayerExistsResponse(request.getPlayerId(), exists);
    }
}
