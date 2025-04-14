package com.uno.Uno.Exception;

public class NoCardInDeckException extends RuntimeException {
    public NoCardInDeckException(String message) {
        super(message);
    }
}
