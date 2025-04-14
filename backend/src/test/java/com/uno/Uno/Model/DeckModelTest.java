package com.uno.Uno.Model;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DeckModelTest {
    DeckModel deckModel;

    @Test
    void testDeckCreation() {
        deckModel = new DeckModel();
        System.out.println(deckModel.getDeck());
        assertEquals(108, deckModel.deckSize(), "Deck size should be 108 after creation.");
    }
}