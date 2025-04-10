package com.uno.Uno.Mapper;

import com.uno.Uno.Dto.DeckDto;
import com.uno.Uno.Model.DeckModel;

public class DeckMapper {
    public static DeckDto toDto(DeckModel deckModel) {
        return new DeckDto(deckModel.getAllDeck().stream()
                .map(CardMapper::toDto)
                .toList());
    }
}
