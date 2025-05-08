package com.uno.Uno.Exception;

public class NoPlayerConnectedWithUUID extends RuntimeException{
    public NoPlayerConnectedWithUUID(String message) {
        super("No Player connected with UUID: " + message);
    }
}
