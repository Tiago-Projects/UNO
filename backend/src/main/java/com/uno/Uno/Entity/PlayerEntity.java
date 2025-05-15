package com.uno.Uno.Entity;

import jakarta.annotation.Nonnull;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


/**
 *  Represent a player in the UNO game.
 *  <p>
 *  This entity is mapped to the "player" table in the database and stores basic information
 *  about a player.
 *  <p>
 *  TODO: Future extensions may include additional player-related data such as score, 
 *  statistics, avatar, status, and game history.
 */
@Entity
@Table(name = "player")
public class PlayerEntity {
    
    @Id
    @Nonnull
    private String id;

    @Nonnull
    private String name;

    public PlayerEntity() {}

    public PlayerEntity(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Player Entity [ playerId=").append(this.id).append(" ; name=").append(this.name).append(" ]");
        return sb.toString();
    }
}
