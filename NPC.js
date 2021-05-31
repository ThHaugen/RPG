export default class NPC extends Phaser.GameObjects.Sprite {
    constructor(data) {
        let {scene, x, y, texture, frame} = data;
        super(scene, x, y, texture, frame);
        this.scene.add.existing(this);
        this.scene.physics.world.enableBody(this, 0);

        const {
            Body,
            Bodies
        } = Phaser.Physics.Matter.Matter;
        var npcCollider = Bodies.circle(this.x, this.y, 12, {isSensor:false, label:'playerCollider'});
        const compundBody = Body.create({
            parts:[npcCollider],
            frictionAir: 0
        });
        //this.setExistingBody(compundBody);
        //this.setFixedRotation();
        this.body.setSize(16,8,true);
        this.body.setOffset(8, 24, true);

        this.y_move = 0;
        this.x_move = 0;
        this.speed = 50;
        let dir = Math.floor(Math.random()*4);
        console.log(dir);
        switch(dir) {
            case 0:
                this.body.setVelocity(0, -this.speed);
                break;
            case 1:
                this.body.setVelocity(-this.speed, 0);
                this.flipX = true;
                break;
            case 2:
                this.body.setVelocity(0, this.speed);
                break;
            case 3:
                this.body.setVelocity(this.speed, 0);
                break;
            default:
                break;
        }
        
    }

    static preload(scene){
        scene.load.atlas('thief', 'assets/thief.png', 'assets/thief_atlas.json');
        scene.load.animation('thief_anim', 'assets/thief_anim.json');
    }

    create(){}

    update(){
        if(Math.abs(this.body.velocity.x) > 0.1 || Math.abs(this.body.velocity.y) > 0.1) {
            this.anims.play('thief_walk', true);
        }else {
            this.anims.play('thief_idle', true);
        }
        if(this.body.blocked.down){
            console.log('down');
            this.body.setVelocity(0, -this.speed);
        }else if(this.body.blocked.up){
            console.log('up');
            this.body.setVelocity(0, this.speed);
        }else if(this.body.blocked.left){
            console.log('left');
            this.body.setVelocity(this.speed, 0);
            this.flipX = false;
        }else if(this.body.blocked.right){
            console.log('right');
            this.body.setVelocity(-this.speed, 0);
            this.flipX = true;
        }
        
    }
}