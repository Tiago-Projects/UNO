package com.uno.Uno.Model;

import com.uno.Uno.Exception.ImpossibleCardException;
import com.uno.Uno.Model.Enum.Suit;
import com.uno.Uno.Model.Enum.Type;
import lombok.Getter;


@Getter
public class CardModel {
    private final Type type;
    private final Suit suit;

    public CardModel (Type type, Suit suit) {
        if (suit == Suit.WILD ^ (type == Type.WILD || type == Type.WILD_DRAW_FOUR)) {
            throw new ImpossibleCardException("Impossible card: type=" + type + "; suit=" + suit);
        }

        this.type = type;
        this.suit = suit;
    }

    @Override
    public String toString() {
        return "Card { type: " + this.type + ", suit: " + this.suit + "}";
    }
}
