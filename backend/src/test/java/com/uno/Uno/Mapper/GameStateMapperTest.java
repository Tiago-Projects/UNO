package com.uno.Uno.Mapper;

import java.util.List;

import org.junit.jupiter.api.Test;

import com.uno.Uno.Dto.GameStateDto;
import com.uno.Uno.Model.BotModel;
import com.uno.Uno.Model.CardModel;
import com.uno.Uno.Model.DeckModel;
import com.uno.Uno.Model.GameStateModel;
import com.uno.Uno.Model.Player;
import com.uno.Uno.Model.PlayerModel;


public class GameStateMapperTest {
    
    @Test
    public void testToDto() {
        DeckModel deckModel = new DeckModel();
        CardModel tableCard = deckModel.pop();
        Player currentPlayer = new PlayerModel("PlayerID", "Player");
        List<Player> players = List.of(currentPlayer, new BotModel("Bot1ID", "Bot 1"), new BotModel("Bot2ID", "Bot 2"), new BotModel("Bot3ID", "Bot 3"));

        GameStateModel gameStateModel = new GameStateModel(deckModel, tableCard, currentPlayer, players);

        GameStateDto gameStateDto = GameStateMapper.toDto(gameStateModel);

        DeckMapperTest.assertDeckDtoEquals(deckModel, gameStateDto.getDeck());
        CardMapperTest.assertCardDtoEquals(tableCard, gameStateDto.getTableCard());
        PlayerMapperTest.assertPlayerDtoEquals(currentPlayer, gameStateDto.getCurrentPlayer());

        for (int i = 0; i < gameStateDto.getPlayers().length; i++) {
            PlayerMapperTest.assertPlayerDtoEquals(players.get(i), gameStateDto.getPlayers()[i]);
        }
    }
}
