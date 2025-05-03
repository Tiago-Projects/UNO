package com.uno.Uno.Model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class Player {
    String sessionId;
    String name;
    List<CardModel> hand;

    public boolean addCard(CardModel card) {
        return this.hand.add(card);
    }
}
