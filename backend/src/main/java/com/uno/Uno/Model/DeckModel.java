package com.uno.Uno.Model;

import com.uno.Uno.Model.Enum.Suit;
import com.uno.Uno.Model.Enum.Type;

import java.util.ArrayList;
import java.util.List;

public class DeckModel {

    private List<CardModel> allDeck;

    public DeckModel() {
        this.allDeck = shuffleDeck(initializeDeck());
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

    private List<CardModel> shuffleDeck(List<CardModel> allDeckUnshuffled) {
        List<CardModel> allDeckShuffled = new ArrayList<>();

        while (!allDeckUnshuffled.isEmpty()) {
            int randomIndex = (int) (Math.random() * allDeckUnshuffled.size());
            allDeckShuffled.add(allDeckUnshuffled.get(randomIndex));
            allDeckUnshuffled.remove(randomIndex);
        }

        return allDeckShuffled;
    }

    public List<CardModel> getAllDeck() {
        return allDeck;
    }

    public Integer deckSize() {
        return allDeck.size();
    }
}
