package com.uno.Uno.Mapper;

import org.junit.jupiter.api.Test;

import com.uno.Uno.Dto.DeckDto;
import com.uno.Uno.Model.DeckModel;

import static org.junit.jupiter.api.Assertions.*;


public class DeckMapperTest {
    
    @Test
    void testToDto() {
        DeckModel deckModel = new DeckModel();

        DeckDto deckDto = DeckMapper.toDto(deckModel);

        assertEquals(deckModel.deckSize(), deckDto.deckSize());

        for (int i = 0; i < deckDto.deckSize(); i++) {
            CardMapperTest.assertCardDtoEquals(deckModel.getDeck().get(i), deckDto.getAllDeck()[i]);
        }
    }

    public static void assertDeckDtoEquals(DeckModel model, DeckDto dto) {
        assertEquals(model.deckSize(), dto.deckSize());

        for (int i = 0; i < dto.deckSize(); i++) {
            CardMapperTest.assertCardDtoEquals(model.getDeck().get(i), dto.getAllDeck()[i]);
        }
    }

}
