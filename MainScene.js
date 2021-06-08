import UI  from "./UI.js";
import Items from "./Items.js";
import NPC from "./NPC.js";
import Player from "./Player.js";

export default class MainScene extends Phaser.Scene {
    
    constructor() {
        super("MainScene");
    }

    preload() {
        Player.preload(this);
        NPC.preload(this);
        Items.preload(this);
        this.load.image('summer', 'assets/Summer.png');
        this.load.image('houses', 'assets/Serene Village/original/Serene Village .png');
        this.load.tilemapTiledJSON('level1', 'assets/level1.json');
    }

    create() {
        const OBJECT = 'Object Layer 1';
        const map = this.add.tilemap('level1');
        const tileset = map.addTilesetImage('summer', 'summer');
        const houseset = map.addTilesetImage('Houses', 'houses');
        const layer1 = map.createStaticLayer('Ground', tileset, 0, 0);
        const layer2 = map.createStaticLayer('Collide', tileset, 0, 0);
        const layer3 = map.createStaticLayer('Top', tileset, 0, 0);
        const layer4 = map.createStaticLayer('Items', tileset, 0, 0);
        const houseCollide = map.createStaticLayer('House_collide', houseset, 0, 0);
        const houseTop = map.createStaticLayer('House_top', houseset, 0, 0);
        //layer1.setCollisionByProperty({collides:true});
        layer2.setCollisionByProperty({collides:true});
        houseCollide.setCollisionByProperty({collides:true});
        layer3.setDepth(100);
        houseTop.setDepth(100);
        

        this.items = this.physics.add.group();

        layer4.forEachTile(tile => {
            if(tile.index !== -1){
                //console.log(tile.properties.type);
                let pickup;
                const x = tile.getCenterX();
                const y = tile.getCenterY();
                if(tile.properties.type == 'sword'){
                    pickup = this.items.create(x, y, 'sword');
                } else if(tile.properties.type == 'staff'){
                    pickup = this.items.create(x, y, 'staff');
                }
            }
        })
        
        //this.swords = new Items('Object Layer 1', 'sword', map);
        //this.staves = new Items('Object Layer 1', 'staff', map);
        this.player = new Player({
            scene:this, 
            x: 50, 
            y: 50, 
            texture: 'mage', 
            frame: 'mage_idle_1'
        }); 

        this.enemies = this.add.group();
        this.npc1 = new NPC({
            scene:this, 
            x: 200, 
            y: 200, 
            texture: 'thief', 
            frame: 'thief_idle_2'
        });
        this.enemies.add(this.npc1);
        this.npc2 = new NPC({
            scene:this, 
            x: 300, 
            y: 200, 
            texture: 'thief', 
            frame: 'thief_idle_3'
        });
        this.enemies.add(this.npc2);

        this.physics.add.collider(this.player, layer2);
        this.physics.add.collider(this.enemies, layer2);
        this.physics.add.collider(this.player, houseCollide);
        this.physics.add.collider(this.enemies, houseCollide);
        this.physics.add.overlap(this.player, this.enemies, this.handlePlayerCollision, null, this);
        this.physics.add.overlap(this.player, this.items, this.handleItemCollision, null, this);
        this.cameras.main.startFollow(this.player, layer1);
        this.healthbar = new UI(this, 20, 18, this.player.hp)
        
    }

    handleItemCollision(p, i){
        i.destroy();
        p.equipItem(i.texture);
        console.log(i.texture);
    }

    handlePlayerCollision(p, e){
        p.setTint(0xff0000);
        this.time.addEvent({
            delay: 500,
            callback: () => {
                p.clearTint();
            },
            callbackScope: this,
            loop: false
        });

        p.checkDead();
    }

    update() {
        this.player.update();
        this.healthbar.update(this.player.hp);
        //this.cameras.main.startFollow(this.player, 'Tile Layer 1');
        this.npc1.update();
        this.npc2.update();
    }
}