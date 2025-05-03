package com.uno.Uno.Exception;

public class PlayerAlreadyConnected extends RuntimeException{
    public PlayerAlreadyConnected(String message) {
        super(message);
    }
}
