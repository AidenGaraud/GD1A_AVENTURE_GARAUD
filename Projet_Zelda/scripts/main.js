import Menu from "./scenes/menu.js";
import Level_1 from "./scenes/Level_1.js";
import Level_2 from "./scenes/Level_2.js";

//Configuration des paramètres Phaser
const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  pixelArt: true,
  backgroundColor: "#1d212d",
  input:{gamepad:true},
  scene: [Menu, Level_1, Level_2],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
};

const game = new Phaser.Game(config);