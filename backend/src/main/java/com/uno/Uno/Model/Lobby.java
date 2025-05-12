package com.uno.Uno.Model;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class Lobby {
    private final String id;
    private final Map<Integer, Player> slots = new ConcurrentHashMap<>();

    public Lobby(String id) {
        this.id = id;
    }

    public void assignPlayerToSlot(String lobbyId, Player player, int slot) {
        if (slot < 0 || slot > 3) {
            throw new IllegalArgumentException("Invalid slot number: " + slot);
        }

        if (player == null) {
            throw new IllegalStateException("No player found with UUID: " + player.getUUID());
        }

        slots.put(slot, player);
    }

    public Map<Integer, Player> getSlots() {
        return this.slots;
    }

    public boolean isPlayerInLobby(String playerUuid) {
        for (Player player: slots.values()) {
            if (player.getUUID().equals(playerUuid)) {
                return true;
            }
        }
        return false;
    }
}
