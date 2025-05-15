package com.uno.Uno.Repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.uno.Uno.Entity.PlayerEntity;



@Repository
public interface PlayerRepository extends CrudRepository<PlayerEntity, String>{

}

