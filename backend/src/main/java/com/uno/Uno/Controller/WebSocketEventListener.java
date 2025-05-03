package com.uno.Uno.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.uno.Uno.Service.LobbyService;

@Component
public class WebSocketEventListener {
    
    @Autowired
    LobbyService lobbyService;

    @EventListener
    public void handleDisconnect(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = headerAccessor.getSessionId();

        lobbyService.removePlayer(sessionId);
        System.out.println("Cliente disconectado: " + sessionId);
    }
}
