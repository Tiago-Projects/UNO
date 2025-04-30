package com.uno.Uno.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeckDto {
    private CardDto[] allDeck;

    public Integer deckSize() {
        return allDeck.length;
    }
}
