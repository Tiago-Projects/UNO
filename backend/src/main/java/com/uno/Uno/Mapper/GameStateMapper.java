package com.uno.Uno.Mapper;

import com.uno.Uno.Model.GameStateModel;

import com.uno.Uno.Dto.GameStateDto;

public class GameStateMapper {
    public static GameStateDto toDto (GameStateModel gameState) {
        return new GameStateDto(
                DeckMapper.toDto(gameState.getDeck()),
                CardMapper.toDto(gameState.getTableCard()),
                PlayerMapper.toDto(gameState.getCurrentPlayer()),
                gameState.getPlayers().stream()
                    .map(PlayerMapper::toDto)
                    .toArray(com.uno.Uno.Dto.PlayerDto[]::new)
        );
    }
}
