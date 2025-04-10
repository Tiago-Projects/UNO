package com.uno.Uno.Mapper;

import com.uno.Uno.Dto.CardDto;
import com.uno.Uno.Model.CardModel;

public class CardMapper {
    public static CardDto toDto(CardModel cardModel) {
        return new CardDto(cardModel.getType(), cardModel.getSuit());
    }
}
