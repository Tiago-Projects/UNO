package com.uno.Uno.Model;

import java.util.ArrayList;

public class PlayerModel extends Player {

    public PlayerModel(String sessionId, String name) {
        super(sessionId, name, new ArrayList<>());
    }
}
