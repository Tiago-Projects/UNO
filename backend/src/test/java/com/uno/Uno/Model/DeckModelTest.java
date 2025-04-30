package com.uno.Uno.Model;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.uno.Uno.Exception.NoCardInDeckException;
import com.uno.Uno.Model.Enum.Suit;
import com.uno.Uno.Model.Enum.Type;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Random;


class DeckModelTest {

    @Test
    void testDeckCreation() {
        DeckModel deckModel = new DeckModel();
        System.out.println(deckModel.getDeck());
        assertEquals(108, deckModel.deckSize(), "Deck size should be 108 after creation.");
    }


    
    @Test
    void testDeckPopRandom() {
        Random notThatRandom = new Random(1);
        DeckModel deckModel = new DeckModel(notThatRandom);

        CardModel firstCard = new CardModel(Type.WILD_DRAW_FOUR, Suit.WILD);
        CardModel secondCard = new CardModel(Type.ONE, Suit.YELLOW);

        assertEquals(deckModel.popRandom().compareTo(firstCard), 0);
        assertEquals(deckModel.popRandom().compareTo(secondCard), 0);
        assertEquals(106, deckModel.deckSize(), "Deck size should be 106 after 2 pops.");
    }

    @Test
    void testDeckPopRandomEmpty() {
        DeckModel deckModel = new DeckModel();

        while (deckModel.deckSize() > 0) {
            deckModel.popRandom();
        }

        Exception exception = assertThrows(NoCardInDeckException.class, () -> {
            deckModel.popRandom();
        }, "Popping from a empty deck should be illegal.");
        assertEquals("No cards in deck", exception.getMessage());
    }


    @Test 
    void testDeckPop() {
        DeckModel deckModel = new DeckModel();

        CardModel firstCard = new CardModel(Type.ZERO, Suit.RED);
        CardModel secondCard = new CardModel(Type.ONE, Suit.RED);

        assertEquals(deckModel.pop().compareTo(firstCard), 0);
        assertEquals(deckModel.pop().compareTo(secondCard), 0);
        assertEquals(106, deckModel.deckSize(), "Deck size should be 106 after 2 pops.");
    }

    @Test
    void testDeckPopEmpty() {
        DeckModel deckModel = new DeckModel();

        while (deckModel.deckSize() > 0) {
            deckModel.pop();
        }

        Exception exception = assertThrows(NoCardInDeckException.class, () -> {
            deckModel.pop();
        }, "Popping from a empty deck should be illegal.");
        assertEquals("No cards in deck", exception.getMessage());
    }


    @Test
    void testDrawCards() {
        Random random = new Random(1);
        DeckModel deckModel = new DeckModel(random);

        List<CardModel> cards = deckModel.drawCards(3);

        assertEquals(3, cards.size());
        assertTrue(cards.get(0).compareTo(new CardModel(Type.ONE, Suit.YELLOW)) == 0);
        assertTrue(cards.get(1).compareTo(new CardModel(Type.WILD, Suit.WILD)) == 0);
        assertTrue(cards.get(2).compareTo(new CardModel(Type.WILD_DRAW_FOUR, Suit.WILD)) == 0);
    }
}