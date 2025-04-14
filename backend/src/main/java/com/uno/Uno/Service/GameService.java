package com.uno.Uno.Service;


import lombok.*;
import org.springframework.stereotype.Service;

import com.uno.Uno.Model.BotModel;
import com.uno.Uno.Model.CardModel;
import com.uno.Uno.Model.DeckModel;
import com.uno.Uno.Model.GameStateModel;
import com.uno.Uno.Model.Player;

import java.util.ArrayList;
import java.util.List;

@Getter
@Service    
public class GameService {
    private static final int NUMBER_PLAYERS = 4;
    private static final int NUMBER_INITIAL_CARDS = 7;

    private GameStateModel gameState;

    public GameService() {
    } 

    public void startGame() {
        DeckModel deck = new DeckModel();

        this.gameState = new GameStateModel();
        this.gameState.setTableCard(deck.pop());
        
        List<Player> players = new ArrayList<>();
        for (int i = 0; i < NUMBER_PLAYERS; i++) {
            List<CardModel> initialHand = this.drawCards(deck, NUMBER_INITIAL_CARDS);

            Player player = new BotModel("Bot " + (i + 1), initialHand);
            players.add(player);
        }

        this.gameState.setPlayers(players);
        this.gameState.setDeck(deck);
    }
    
    private List<CardModel> drawCards(DeckModel deck, int numberCards) {
        List<CardModel> drawnCards = new ArrayList<>();
        for (int i = 0; i < numberCards; i++) {
            drawnCards.add(deck.pop());
        }
        return drawnCards;
    }
}
