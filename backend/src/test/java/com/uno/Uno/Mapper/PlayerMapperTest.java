package com.uno.Uno.Mapper;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.uno.Uno.Model.CardModel;
import com.uno.Uno.Model.Player;
import com.uno.Uno.Model.PlayerModel;
import com.uno.Uno.Model.BotModel;
import com.uno.Uno.Model.Enum.Suit;
import com.uno.Uno.Model.Enum.Type;
import com.uno.Uno.Dto.PlayerDto;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
public class PlayerMapperTest {
    
    @Test
    void testToDtoBot() {
        Player bot = new BotModel("Bot 1");

        CardModel card1 = new CardModel(Type.FOUR, Suit.RED);
        CardModel card2 = new CardModel(Type.WILD, Suit.WILD);

        bot.addCard(card1);
        bot.addCard(card2);

        PlayerDto botDto = PlayerMapper.toDto(bot);

        assertEquals(botDto.getName(), "Bot 1");

        assertEquals(botDto.getHand().length, 2);
        assertEquals(botDto.getHand()[0].getSuit(), card1.getSuit());
        assertEquals(botDto.getHand()[0].getType(), card1.getType());

        assertEquals(botDto.getHand()[1].getSuit(), card2.getSuit());
        assertEquals(botDto.getHand()[1].getType(), card2.getType());
    }


    @Test
    void testToDtoPlayer() {
        Player player = new PlayerModel("Bot 1");

        CardModel card1 = new CardModel(Type.FOUR, Suit.RED);
        CardModel card2 = new CardModel(Type.WILD, Suit.WILD);

        player.addCard(card1);
        player.addCard(card2);

        PlayerDto playerDto = PlayerMapper.toDto(player);

        assertEquals(playerDto.getName(), "Bot 1");

        assertEquals(playerDto.getHand().length, 2);
        assertEquals(playerDto.getHand()[0].getSuit(), card1.getSuit());
        assertEquals(playerDto.getHand()[0].getType(), card1.getType());

        assertEquals(playerDto.getHand()[1].getSuit(), card2.getSuit());
        assertEquals(playerDto.getHand()[1].getType(), card2.getType());
    }
}
