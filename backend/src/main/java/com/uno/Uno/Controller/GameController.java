package com.uno.Uno.Controller;

import com.uno.Uno.Dto.DeckDto;
import com.uno.Uno.Dto.GameStateDto;
import com.uno.Uno.Mapper.DeckMapper;
import com.uno.Uno.Mapper.GameStateMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.uno.Uno.Model.DeckModel;
import com.uno.Uno.Model.GameStateModel;
import com.uno.Uno.Service.GameService;


@Deprecated
@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("api")
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping("get-deck")
    public ResponseEntity<?> getDeck() {
        DeckModel deckModel = new DeckModel();

        DeckDto deckDto = DeckMapper.toDto(deckModel);

        return ResponseEntity.ok(deckDto);
    }

    @GetMapping("get-game-state")
    public ResponseEntity<?> getGameState() {
        GameStateModel gameStateModel = gameService.getGameState();
        GameStateDto deckDto = GameStateMapper.toDto(gameStateModel);
        return ResponseEntity.ok(deckDto);
    }

    @GetMapping("start-game")
    public ResponseEntity<?> startGame() {
        gameService.startGame();
        return getGameState();        
    }

}
