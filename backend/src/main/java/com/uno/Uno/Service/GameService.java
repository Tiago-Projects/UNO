package com.uno.Uno.Service;


import org.springframework.stereotype.Service;

import com.uno.Uno.Model.BotModel;
import com.uno.Uno.Model.CardModel;
import com.uno.Uno.Model.DeckModel;
import com.uno.Uno.Model.GameStateModel;
import com.uno.Uno.Model.Player;

import lombok.Getter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Getter
public class GameService {
    private static final int NUMBER_PLAYERS = 4;
    private static final int NUMBER_INITIAL_CARDS = 7;

    private GameStateModel gameState;

    public GameService() {
        startGame();
    }

    public static int getNumberPlayers() {
        return GameService.NUMBER_PLAYERS;
    }

    public static int getNumberInitialCards() {
        return GameService.NUMBER_INITIAL_CARDS;
    }

    public void startGame() {
        DeckModel deck = new DeckModel();

        this.gameState = new GameStateModel();
        this.gameState.setTableCard(deck.pop());
        
        List<Player> players = new ArrayList<>();
        for (int i = 0; i < NUMBER_PLAYERS; i++) {
            List<CardModel> initialHand = deck.drawCards(NUMBER_INITIAL_CARDS);

            Player player = new BotModel("Bot " + (i + 1), initialHand);
            players.add(player);
        }

        this.gameState.setPlayers(players);
        this.gameState.setDeck(deck);
        this.gameState.setCurrentPlayer(players.get(0)); // TODO: change this to randomly select a player
    }

    public void drawCard() {
        Player player = this.gameState.getCurrentPlayer();
        DeckModel deck = this.gameState.getDeck();
        CardModel drawnCard = deck.popRandom();

        player.addCard(drawnCard);
        Collections.sort(player.getHand());
    }
}
