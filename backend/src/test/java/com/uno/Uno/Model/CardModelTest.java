package com.uno.Uno.Model;

import com.uno.Uno.Exception.ImpossibleCardException;
import com.uno.Uno.Model.Enum.Suit;
import com.uno.Uno.Model.Enum.Type;
import org.junit.jupiter.api.Test;


import static org.junit.jupiter.api.Assertions.*;

class CardModelTest {
    CardModel card;


    @Test
    void testCreatePossibleCard() {
        card = new CardModel(Type.ZERO, Suit.RED);

        assertEquals(card.getType(), Type.ZERO, "Type should be ZERO");
        assertEquals(card.getSuit(), Suit.RED, "Suit should be RED");
    }


    @Test
    void testCreateImpossibleCard() {
        Exception exception = assertThrows(ImpossibleCardException.class, () -> {
            card = new CardModel(Type.ONE, Suit.WILD);
        }, "Creating a card with type ONE and suit WILD should throw ImpossibleCardException.");
        assertEquals(exception.getMessage(), "Impossible card: type=ONE; suit=WILD");


        exception = assertThrows(ImpossibleCardException.class, () -> {
            card = new CardModel(Type.WILD, Suit.RED);
        }, "Creating a card with type WILD and suit RED should throw ImpossibleCardException.");
        assertEquals(exception.getMessage(), "Impossible card: type=WILD; suit=RED");
    }


    @Test
    void testToString() {
        card = new CardModel(Type.ZERO, Suit.RED);

        assertEquals(card.toString(), "Card { type: ZERO, suit: RED}", "toString() should return the correct string representation of the card.");
    }
}