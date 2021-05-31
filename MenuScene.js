import MainScene from "./MainScene.js";


export default class MenuScene extends Phaser.Scene{
    constructor() {
        super('MenuScene');
    }

    preload(){

        this.load.image('play', 'assets/buttons/red/play.png');
        this.load.image('options', './assets/buttons/red/options.png');
        this.load.image('exit', './assets/buttons/red/exit.png')

        this.load.image('play', './assets/buttons/preseed/play.png');
        this.load.image('options', './assets/buttons/pressed/options.png');
        this.load.image('exit', './assets/buttons/preseed/exit.png');

        this.load.image('title', 'assets/title.png');
        
    }

    create(){

        let playButton = this.add.image(
            this.game.renderer.width / 2, 
            this.game.renderer.height / 2+60,
            'play'
        ).setScale(2).setDepth(1);  
        let optionsButton = this.add.image(
            this.game.renderer.width / 2, 
            this.game.renderer.height / 2 + 100,                
            'options'
        ).setScale(2).setDepth(1);
        let exitButton = this.add.image(
            this.game.renderer.width / 2, 
            this.game.renderer.height / 2 + 140,
            'exit'
        ).setScale(2).setDepth(1);
        let titleScreen = this.add.image(
            0, 
            0,
            'title'
        ).setOrigin(0).setDepth(0);

        playButton.setInteractive();
        optionsButton.setInteractive();
        exitButton.setInteractive();
        this.scene.add('MainScene', MainScene, false);

        playButton.on('pointerover', ()=>{
            playButton.setTint(9999999);

        })
        playButton.on('pointerout', ()=>{
            playButton.setTint();

        })
        playButton.on('pointerup', ()=>{
            this.scene.start('MainScene', 'Main Started');

        })
        optionsButton.on('pointerover', ()=>{
            optionsButton.setTint(9999999);

        })
        optionsButton.on('pointerout', ()=>{
            optionsButton.setTint();

        })
        exitButton.on('pointerover', ()=>{
            exitButton.setTint(9999999);

        })
        exitButton.on('pointerout', ()=>{
            exitButton.setTint();

        })
        

        
        
        
        
    }

    update(){

    }
}