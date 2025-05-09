package com.uno.Uno.Dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PlayerInSlotDto {
    private Integer slot;
    private PlayerDto playerDto;
}
