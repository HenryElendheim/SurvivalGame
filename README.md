# 🏝️ Survival Game

A browser-based survival game written in **vanilla JavaScript** with HTML canvas — no frameworks, no build step. You're stranded, and your only way out is to gather resources, craft an SOS Tower, and survive the swarm that comes when you switch it on.

Built as a student project at [GET Academy](https://getacademy.no).

## 🎯 How to win

The game is a chain of four missions:

1. **Gather wood and stone** — chop trees and mine rocks (you'll need a pickaxe for stone)
2. **Build the SOS Tower** — craft it from 15 wood + 10 stone
3. **Place the SOS Tower** — it drops where you stand, and activates a protective bubble
4. **Survive the swarm!** — stay inside the bubble for 30 seconds while enemies flood the map

Die and your stats reset — the tower's signal waits for no one.

## 🎮 Controls

| Key | Action |
|---|---|
| `W` `A` `S` `D` | Move |
| `E` | Chop trees / mine stone |
| `F` | Eat a coconut (restores hunger, thirst and energy) |
| `Space` / Click | Attack |

## ⚙️ Mechanics

- **Survival stats** — health, hunger, thirst and stamina all matter; coconuts keep you alive
- **Crafting** — Pickaxe (5 wood) unlocks mining · Sword (2 wood + 3 stone) raises your attack damage from 15 to 25 · SOS Tower (15 wood + 10 stone) starts the endgame
- **Three enemy types** — basic grunts, fast runners that swarm you, and slow tanks that hit hard; each has its own speed, health, damage and aggro range
- **The swarm** — placing the tower ramps enemy spawn limits way up; the bubble is your safe zone, but only barely

## 🚀 Run it

No installation, no dependencies:

```
git clone https://github.com/HenryElendheim/SurvivalGame.git
```

Then open `index.html` in your browser — that's it. (Or use a live-server extension if you prefer.)

## 🗂️ Project structure

```
├── index.html               # Entry point — loads all scripts
├── style.css
├── model.js                 # All game state: player, enemies, inventory, missions
├── World/                   # Map drawing, enemies, game progression, win/lose logic
├── Player/                  # Player stats and inventory rendering
├── ControllerUniversal/     # Keyboard/mouse input: movement, interaction, buttons
└── Crafting/                # Recipes and the crafting panel
```

The code follows a model–view–controller split: `model.js` holds the single source of truth, the view files draw from it, and the controllers are the only ones that change it.

## 💭 Reflections

> This was a huge project for me. I was really testing my limits here and hit the wall for quite a while.
> Doing 2D visuals was way harder than I thought.
>
> I burnt myself a bit out, but that's my own fault.
> I have now finished it and I now also know my limits.
> Learning more about how this stuff is done also really makes me respect creators who make survival games a lot more.
> (I really understand why they need teams of people)
>
> Anyway, enjoy the little experience!
