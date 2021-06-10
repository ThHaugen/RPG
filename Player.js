export default class Player extends Phaser.GameObjects.Sprite {

    constructor(data) {
        let {scene, x, y, texture, frame} = data;
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);
        this.isDead = false;
        this.hp = 100
        
        this.inputKeys = scene.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
        });

        this.body.setSize(12,8,true);
        this.body.setOffset(10, 24, true);
        this.container = this.scene.add.container(16, 16);
        this.container.add(this);
     }

    static preload(scene) {
        scene.load.atlas('mage', 'assets/mage.png', 'assets/mage_atlas.json');
        scene.load.animation('mage_anim', 'assets/mage_anim.json');
        scene.load.animation('swing_anim', 'assets/swing_anim.json');
    }

    checkDead() {
        if(this.hp == 0){
            console.log('ouch');
            this.isDead = true;
            this.destroy();
        }else{
            console.log('not dead');
            this.hp--;
            console.log(this.hp);
        }
        
    }

    equipItem(texture) {
        console.log(texture);
        let temp = this.scene.add.sprite(this.x, this.y, texture)
        this.setTexture(texture);
        this.container.add(temp);
    }

    update() {
        const speed = 100;
        if(this.isDead) return;

        this.body.setVelocity(0);
        if(this.inputKeys.left.isDown) {
            this.body.setVelocityX(-speed);
            this.setFlipX(true);
        } else if (this.inputKeys.right.isDown) {
            this.body.setVelocityX(speed);
            this.setFlipX(false);
        }
        if(this.inputKeys.up.isDown) {
            this.body.setVelocityY(-speed);
        } else if (this.inputKeys.down.isDown) {
            this.body.setVelocityY(speed);
        }
        this.body.velocity.normalize().scale(speed);
        
        if(Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1) {
            //this.anims.play('mage_walk', true);
            this.anims.play('swing', true);
        }else {
            //this.anims.play('mage_idle', true);
        }
    }
}