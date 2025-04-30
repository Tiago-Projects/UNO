package com.uno.Uno.Controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.uno.Uno.Dto.GameStateDto;
import com.uno.Uno.Mapper.GameStateMapper;
import com.uno.Uno.Service.GameServiceTest;

@Controller
public class GameWebSocketController {

    @Autowired
    private GameServiceTest gameService;

    @MessageMapping("/game-state")
    @SendTo("/topic/game-state")
    public GameStateDto getGameState() throws Exception {
        return GameStateMapper.toDto(gameService.getGameState());
    }

    @MessageMapping("/draw-card")
    @SendTo("/topic/game-state")
    public GameStateDto drawCard(Principal principal) throws Exception {
        gameService.drawCard();
        return GameStateMapper.toDto(gameService.getGameState());
    }
}
