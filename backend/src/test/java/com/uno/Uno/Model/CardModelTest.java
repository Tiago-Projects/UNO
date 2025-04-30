package com.uno.Uno.Model;

import com.uno.Uno.Exception.ImpossibleCardException;
import com.uno.Uno.Model.Enum.Suit;
import com.uno.Uno.Model.Enum.Type;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
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

    @Test
    void testCompareToEqual() {
        card = new CardModel(Type.ZERO, Suit.RED);
        CardModel other = new CardModel(Type.ZERO, Suit.RED);

        assertEquals(card.compareTo(other), 0);
    }

    @Test 
    void testCompareToDifferentSuit() {
        /* Suit order -> RED, GREEN, YELLOW, BLUE, WILD */
        CardModel red = new CardModel(Type.ZERO, Suit.RED);
        CardModel green = new CardModel(Type.ZERO, Suit.GREEN);
        CardModel yellow = new CardModel(Type.ZERO, Suit.YELLOW);
        CardModel blue = new CardModel(Type.ZERO, Suit.BLUE);
        CardModel wild = new CardModel(Type.WILD, Suit.WILD);

        assertTrue(red.compareTo(green) < 0);
        assertTrue(green.compareTo(yellow) < 0);
        assertTrue(yellow.compareTo(blue) < 0);
        assertTrue(blue.compareTo(wild) < 0);
    }

    @Test 
    void testCompareToDifferentTypes() {
        /* Type order -> ZERO, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, SKIP, REVERSE, DRAW_TWO, WILD, WILD_DRAW_FOUR*/

        CardModel zero = new CardModel(Type.ZERO, Suit.RED);
        CardModel four = new CardModel(Type.FOUR, Suit.RED);
        CardModel nine = new CardModel(Type.NINE, Suit.RED);
        CardModel skip = new CardModel(Type.SKIP, Suit.RED);
        CardModel reverse = new CardModel(Type.REVERSE, Suit.RED);
        CardModel draw_two = new CardModel(Type.DRAW_TWO, Suit.RED);

        assertTrue(zero.compareTo(four) < 0);
        assertTrue(four.compareTo(nine) < 0);
        assertTrue(nine.compareTo(skip) < 0);
        assertTrue(skip.compareTo(reverse) < 0);
        assertTrue(reverse.compareTo(draw_two) < 0);


        CardModel wild = new CardModel(Type.WILD, Suit.WILD);
        CardModel wild_draw_four = new CardModel(Type.WILD_DRAW_FOUR, Suit.WILD);

        assertTrue(wild.compareTo(wild_draw_four) < 0);
    }
}