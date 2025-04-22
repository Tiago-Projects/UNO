package com.uno.Uno.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameStateDto {
    private DeckDto deck;
    private CardDto tableCard;
    private PlayerDto currentPlayer;
    
    private PlayerDto[] players;
}
