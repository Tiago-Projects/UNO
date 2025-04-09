package com.uno.Uno.Model;

import com.uno.Uno.Model.Enum.Suit;
import com.uno.Uno.Model.Enum.Type;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CardModel {
    private Suit suit;
    private Type type;

    @Override
    public String toString() {
        return "Card { type: " + this.type + ", suit: " + this.suit + "}";
    }
}
