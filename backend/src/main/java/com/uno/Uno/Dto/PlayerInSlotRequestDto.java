package com.uno.Uno.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlayerInSlotRequestDto {
    @JsonProperty("UUID")
    private String UUID;
    private Integer slot;
}
