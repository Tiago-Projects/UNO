package com.uno.Uno.Model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GameStateModel {
    private DeckModel deck;
    private CardModel tableCard;
    private Player currentPlayer;
    
    private List<Player> players;
}
