package com.uno.Uno.Controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.uno.Uno.Dto.JoinRequestDto;
import com.uno.Uno.Dto.PlayerDto;
import com.uno.Uno.Dto.PlayerInSlotDto;
import com.uno.Uno.Dto.PlayerInSlotRequestDto;
import com.uno.Uno.Mapper.PlayerMapper;
import com.uno.Uno.Service.LobbyService;

@Controller
public class LobbyController {
    @Autowired
    private LobbyService lobbyService;


    // Connect

    @MessageMapping("/repository/add")
    @SendTo("/topic/repository/add")
    public List<PlayerDto> joinRepository(JoinRequestDto request) {
        lobbyService.addPlayer(request.getPlayerId(), request.getName());
        return getRepository();
    }

    @MessageMapping("/repository/get")
    @SendTo("/topic/repository/get")
    public List<PlayerDto> getRepository() {
        return lobbyService.getConnectedPlayers().stream().map(PlayerMapper::toDto).toList();
    }


    // Add Player into a Slot of Lobby

    @MessageMapping("/lobby/add")
    @SendTo("/topic/lobby/add")
    public List<PlayerInSlotDto> addPlayerToLobby(PlayerInSlotRequestDto playerInSlot) {
        lobbyService.addPlayerToSlot(playerInSlot.getUUID(), playerInSlot.getSlot()); 
        return getPlayersInLobby();
    }

    @MessageMapping("/lobby/get")
    @SendTo("/topic/lobby/get")
    public List<PlayerInSlotDto> getPlayersInLobby() {
        List<PlayerInSlotDto> playerInSlots = new ArrayList<>();

        for(Integer index: lobbyService.getPlayersInLobby().getSlots().keySet()) {
            PlayerInSlotDto playerInSlot = new PlayerInSlotDto();
            playerInSlot.setSlot(index);
            playerInSlot.setPlayerDto(PlayerMapper.toDto(lobbyService.getPlayersInLobby().getSlots().get(index)));
            playerInSlots.add(playerInSlot);
        }
        return playerInSlots;
    }


    // Check if Person is connected or on lobby.

    @MessageMapping("/global/check-connection")
    @SendTo("/topic/global/check-connection")
    public boolean checkConnection(String UUID) {
        return lobbyService.checkConnection(UUID);
    }


}
