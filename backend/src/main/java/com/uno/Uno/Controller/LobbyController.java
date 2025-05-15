package com.uno.Uno.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;


import com.uno.Uno.Dto.ConnectPlayerDto;
import com.uno.Uno.Service.LobbyService;

@Controller
public class LobbyController {
    @Autowired
    private LobbyService lobbyService;


    // Connect

    @MessageMapping("/repository/add")
    @SendTo("/topic/repository/add")
    public void connectPlayer(ConnectPlayerDto request) {
        lobbyService.addPlayer(request.getPlayerId(), request.getName());
    }

    @MessageMapping("/repository/checkPlayer")
    @SendTo("/topic/repository/checkPlayer")
    public boolean existPlayer(String playerId) {
        return lobbyService.existPlayer(playerId);
    }


    // Add Player into a Slot of Lobby

    // @MessageMapping("/lobby/add")
    // @SendTo("/topic/lobby/add")
    // public List<PlayerInSlotDto> addPlayerToLobby(PlayerInSlotRequestDto playerInSlotRequestDto) {
    //     lobbyService.addPlayerToSlot(playerInSlotRequestDto.getUUID(), playerInSlotRequestDto.getSlot()); 
    //     return getPlayersInLobby();
    // }
    
    // @MessageMapping("/lobby/addBot")
    // @SendTo("/topic/lobby/addBot")
    // public List<PlayerInSlotDto> addBotToLobby(BotInSlotRequestDto botInSlotRequestDto) {
    //     lobbyService.addBotToSlot(botInSlotRequestDto.getSlot()); 
    //     return getPlayersInLobby();
    // }

    // @MessageMapping("/lobby/get")
    // @SendTo("/topic/lobby/get")
    // public List<PlayerInSlotDto> getPlayersInLobby() {
    //     List<PlayerInSlotDto> playerInSlots = new ArrayList<>();

    //     for(Integer index: lobbyService.getPlayersInLobby().getSlots().keySet()) {
    //         PlayerInSlotDto playerInSlot = new PlayerInSlotDto();
    //         playerInSlot.setSlot(index);
    //         playerInSlot.setPlayerDto(PlayerMapper.toDto(lobbyService.getPlayersInLobby().getSlots().get(index)));
    //         playerInSlots.add(playerInSlot);
    //     }
    //     return playerInSlots;
    // }


    // Check if Person is connected or on lobby.

    // @MessageMapping("/global/check-connection")
    // @SendTo("/topic/global/check-connection")
    // public boolean checkConnection(String UUID) {
    //     return lobbyService.checkConnection(UUID);
    // }


}
