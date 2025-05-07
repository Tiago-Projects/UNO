package com.uno.Uno.Exception;

public class NoPlayerConnectedWithUUID extends RuntimeException{
    public NoPlayerConnectedWithUUID(String message) {
        super(message);
    }
}
