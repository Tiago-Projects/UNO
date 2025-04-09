package com.uno.Uno.Controller;

import com.uno.Uno.Dto.CardDto;
import com.uno.Uno.Model.Enum.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("api")
public class GameController {

    @GetMapping("get-card")
    public ResponseEntity<?> getCard() {
        CardDto cardDto = new CardDto(Suit.RED, Type.EIGHT);
        return ResponseEntity.ok(cardDto);
    }
}
