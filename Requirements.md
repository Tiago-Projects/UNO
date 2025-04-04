# Requirements

## 1. Game Mecanics

### 1.1 Players
 - The game supports 4 players per match.
 - Players can be human (multiplayer mode) or AI (single-player mode).

### 1.2 Card Deck
- The deck consists of 108 cards:
    - __Number Cards__ (76): 0-9 in four colors (Red, Green, Blue, Yellow) (0 has only 4 cards, 1-9 has 8 cards)
    - __Action Cards__ (24): Skip, Reverse, Draw Two (2 for each color) 
    - __Wild Cards__ (8): Wild and Wild Draw Four (4 each)

### 1.3 Gameplay Rules
- Players take turns in a clockwise direction unless reversed.
- A card can be played if it matches the top discard pile card in __color__ or __number__.
- __Special Rules__:
    - __Skip__: The next player loses their turn.
    - __Reverse__: Changes the direction of play.
    - __Draw Two__: The next player draws two cards and loses their turn.
    - __Wild__: The play chooses a new color.
    - __Wild Draw Four__: The player chooses a color, and the next player must draw four cards.
- A player must call "UNO" when they have one card left.
- The game ends when a player has no more cards.

## 2 Game Modes

### 2.1 Single Player Mode
- Play against AI-controlled opponents.
- [Maybe] Adjustable difficulty levels.

### 2.2 Multiplayer Mode
- Online play with real players.

### 2.3 Custom Rules Mode
- Players can add specific rules. [To think about]

## 3 User Interface & Experience

### 3.1 3D Visual Representation

- Game Board in 3D with an interactive table.
- Animated card movements and effects.
- Dynamic camera angles to enhance the experience.

### 3.2 Controls & Interactions

- Click-to-select card option.
- Hover effects and highlights on playable cards.

### Audio & Visual Effects

- Voice-over for key actions ("UNO", Draw Four, etc.)

## 4 Multiplayer Connectivity

### 4.1 Real-time Gameplay
- Uses WebSockets for real-time interactions.
- Server-side game logic ensures fair play.

## 5. Technical Requirements 
### 5.1 Backend 
- Java (Spring Boot) for game logic and multiplayer server.
- WebSocket API for real-time multiplayer.

### 5.2 Frontend
-  Angular for UI/UX
- Three.js for 3D rendering
- Rest Api /WebSocket integration for real-time communication.
