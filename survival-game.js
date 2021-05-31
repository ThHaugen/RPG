import MainScene from "./MainScene.js";
import MenuScene from "./MenuScene.js";

const config = {
    width: 512,
    height: 512,
    backgroundColor: "#999999",
    type: Phaser.AUTO,
    parent: "survival-game",
    scene: [MenuScene],
    scale: {
      zoom: 2
    },
    physics: {
      default: "Arcade",
      arcade: {
        debug: true
      }
    },
    plugins: {
      scene: [
        {
          plugin: PhaserMatterCollisionPlugin,
          key: "matterCollision",
          mapping: "matterCollision"
        }
      ]
    }
  };
  
  new Phaser.Game(config);