package com.uno.Uno.Model;

import java.util.ArrayList;
import java.util.List;


public class BotModel extends Player {
    
    public BotModel(String sessionId, String name) {
        super(sessionId, name, new ArrayList<>());
    }

    public BotModel(String sessionId, String name, List<CardModel> hand) {
        super(sessionId, name, hand);
    }
}       
