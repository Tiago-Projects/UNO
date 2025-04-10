package com.uno.Uno.Controller;

import com.uno.Uno.Dto.CardDto;
import com.uno.Uno.Dto.DeckDto;
import com.uno.Uno.Mapper.CardMapper;
import com.uno.Uno.Mapper.DeckMapper;
import com.uno.Uno.Model.Enum.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.uno.Uno.Model.CardModel;
import com.uno.Uno.Model.DeckModel;


@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("api")
public class GameController {

    @GetMapping("get-deck")
    public ResponseEntity<?> getDeck() {
        DeckModel deckModel = new DeckModel();

        DeckDto deckDto = DeckMapper.toDto(deckModel);

        return ResponseEntity.ok(deckDto);
    }
}
