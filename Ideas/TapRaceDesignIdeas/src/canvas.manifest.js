export const manifest = {
  screens: {
    scr_rut4n9: { name: "Lobby", route: "/", state: { "screen": "lobby" }, position: { "x": 160, "y": 220 } },
    scr_w1he7w: { name: "Countdown", route: "/", state: { "screen": "countdown" }, position: { "x": 1560, "y": 220 } },
    scr_4d66ta: { name: "Playing", route: "/", state: { "screen": "playing" }, position: { "x": 2960, "y": 220 } },
    scr_to5o04: { name: "Game Over", route: "/", state: { "screen": "gameover", "winnerId": "1" }, position: { "x": 4360, "y": 220 } }
  },
  sections: {
    sec_yw1iea: { name: "Game Flow", x: 0, y: 0, width: 5720, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_yw1iea", children: [
    { kind: "screen", id: "scr_rut4n9" },
    { kind: "screen", id: "scr_w1he7w" },
    { kind: "screen", id: "scr_4d66ta" },
    { kind: "screen", id: "scr_to5o04" }]
  }]

};