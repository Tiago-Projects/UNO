package com.uno.Uno.Service;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;

import com.uno.Uno.Model.GameStateModel;

public class GameServiceTest {

    @Test
    void testGameStart() {
        GameService gameService = new GameService();

        GameStateModel gameState = gameService.getGameState();

        assertEquals(GameService.getNumberPlayers(), gameState.getPlayers().size());
        
        for(int i = 0; i < gameState.getPlayers().size(); i++) {
            assertEquals(GameService.getNumberInitialCards(), gameState.getPlayers().get(i).getHand().size());
        }
    }

    @Test
    void testDrawCard() {
        GameService gameService = new GameService();

        gameService.drawCard();

        assertEquals(GameService.getNumberInitialCards()+1, gameService.getGameState().getCurrentPlayer().getHand().size());
    }
}