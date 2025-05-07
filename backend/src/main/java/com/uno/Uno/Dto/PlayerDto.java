package com.uno.Uno.Dto;

import com.uno.Uno.Model.Player;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDto {
    private String name;
    private CardDto[] hand; // Changed from List<CardDto> to CardDto[]
}
