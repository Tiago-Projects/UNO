package com.uno.Uno.Model;

import com.uno.Uno.Model.Enum.Suit;
import com.uno.Uno.Model.Enum.Type;

import com.uno.Uno.Exception.NoCardInDeckException;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import lombok.Getter;



@Getter
public class DeckModel {

    private List<CardModel> deck;
    private final Random random;

    public DeckModel() {
        this.random = new Random();
        this.deck = initializeDeck();
    }

    public DeckModel(Random random) {
        this.random = random;
        this.deck = initializeDeck();
    }

    private List<CardModel> initializeDeck() {
        List<CardModel> allDeck = new ArrayList<>();

        for (Suit suit: Suit.values()) {
            if (suit == Suit.WILD) continue;

            /* One 0 of each color */

            allDeck.add(new CardModel(Type.ZERO, suit));

            /* Two from the other type */

            for (Type type: Type.values()) {
                if(type == Type.ZERO || type == Type.WILD || type == Type.WILD_DRAW_FOUR) continue;
                allDeck.add(new CardModel(type, suit));
                allDeck.add(new CardModel(type, suit));
            }

        }

        /* Four wild cards */
        for (int i = 0; i < 4; i++) {
            allDeck.add(new CardModel(Type.WILD, Suit.WILD));
            allDeck.add(new CardModel(Type.WILD_DRAW_FOUR, Suit.WILD));
        }

        return allDeck;
    }


    public Integer deckSize() {
        return this.deck.size();
    }

    public CardModel popRandom() {
        if (this.deck.isEmpty()) throw new NoCardInDeckException("No cards in deck");
        int randomIndex = random.nextInt(this.deckSize());
        return this.deck.remove(randomIndex);
    }

    public CardModel pop() {
        if (this.deck.isEmpty()) throw new NoCardInDeckException("No cards in deck");
        return this.deck.removeFirst();
    }
}
