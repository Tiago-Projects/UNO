package com.uno.Uno.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.uno.Uno.Entity.PlayerEntity;


/**
 * Repository interface for accessing and managing {@link PlayerEntity} data.
 * <p>
 * Extend {@link CrudRepository} to provide basic CRUD operations.
 * <p>
 * Additional custom query methods can be defined here if needed.
 */
@Repository
public interface PlayerRepository extends CrudRepository<PlayerEntity, String>{

}

