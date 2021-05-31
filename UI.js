export default class UI {

    constructor(scene, x, y, health) {
        this.scene = scene;
        this.x = x;
        this.y= y;
        this.currenthealth = health;

        this.graphics = this.scene.add.graphics().setScrollFactor(0);
        this.newGraphics = this.scene.add.graphics().setScrollFactor(0);
        const healthbarBackground = new Phaser.Geom.Rectangle(x+64, y, 208, 24);
        const healthbarfill = new Phaser.Geom.Rectangle(x+68, y+4, this.currenthealth*2, 16);
        this.graphics.fillStyle(0xffffff, 0.5);
        this.graphics.fillRectShape(healthbarBackground);
        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(healthbarfill);

        this.scene.add.text(x, y+2, 'Health', {fontSize: '16px', fill: '#fff'}).setScrollFactor(0);
    }

    update(currenthealth) {
        this.newGraphics.clear();
        const healthbarfill = new Phaser.Geom.Rectangle(this.x+68, this.y+4, currenthealth*2, 16);
        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(healthbarfill);
    }
}