package com.uno.Uno.Mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.uno.Uno.Dto.CardDto;
import com.uno.Uno.Model.CardModel;
import com.uno.Uno.Model.Enum.Suit;
import com.uno.Uno.Model.Enum.Type;


public class CardMapperTest {
    
    @Test
    public void testToDto() {
        CardModel card = new CardModel(Type.ZERO, Suit.BLUE);

        CardDto cardDto = CardMapper.toDto(card);

        assertCardDtoEquals(card, cardDto);
    } 


    public static void assertCardDtoEquals(CardModel card, CardDto dto) {
        assertEquals(card.getSuit(), dto.getSuit());
        assertEquals(card.getType(), dto.getType());
    }
}
