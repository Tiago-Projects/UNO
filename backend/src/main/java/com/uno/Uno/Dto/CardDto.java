package com.uno.Uno.Dto;


import com.uno.Uno.Model.Enum.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardDto {
    private Suit suit;
    private Type type;
}
