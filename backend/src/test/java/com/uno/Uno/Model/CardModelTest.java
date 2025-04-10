package com.uno.Uno.Model;

import com.uno.Uno.Exception.ImpossibleCardException;
import com.uno.Uno.Model.Enum.Suit;
import com.uno.Uno.Model.Enum.Type;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.function.Executable;


import static org.junit.jupiter.api.Assertions.*;

class CardModelTest {
    CardModel card;


    @Test
    void testCreatePossibleCard() {
        card = new CardModel(Type.ZERO, Suit.RED);

        assertEquals(card.getType(), Type.ZERO);
        assertEquals(card.getSuit(), Suit.RED);
    }


    @Test
    void testCreateImpossibleCard() {
        Exception exception = assertThrows(ImpossibleCardException.class, () -> {
            card = new CardModel(Type.ONE, Suit.WILD);
        });
        assertEquals(exception.getMessage(), "Impossible card: type=ONE; suit=WILD");


        exception = assertThrows(ImpossibleCardException.class, () -> {
            card = new CardModel(Type.WILD, Suit.RED);
        });
        assertEquals(exception.getMessage(), "Impossible card: type=WILD; suit=RED");
    }


    @Test
    void testToString() {
        card = new CardModel(Type.ZERO, Suit.RED);

        assertEquals(card.toString(), "Card { type: ZERO, suit: RED}");
    }
}