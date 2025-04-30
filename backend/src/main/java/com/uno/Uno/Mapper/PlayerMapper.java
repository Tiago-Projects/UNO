package com.uno.Uno.Mapper;

import com.uno.Uno.Dto.PlayerDto;
import com.uno.Uno.Model.Player;

public class PlayerMapper {
    public static PlayerDto toDto(Player player) {
        return new PlayerDto(
                player.getName(),
                player.getHand().stream()
                    .map(CardMapper::toDto)
                    .toArray(com.uno.Uno.Dto.CardDto[]::new)
        );
    }
}
