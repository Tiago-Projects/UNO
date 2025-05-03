package com.uno.Uno.Exception;

public class NoPlayerConnectedWithSessionId extends RuntimeException{
    public NoPlayerConnectedWithSessionId(String message) {
        super(message);
    }
}
