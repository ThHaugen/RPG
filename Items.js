export default class Items {
    constructor(layer, type, map){
        this.layer = layer;
        this.type = type;
        this.map = map;
        this.create();
    }

    static preload(scene){
        scene.load.image('sheet', 'assets/items/Sheet.png');
        scene.load.image('sword', 'assets/items/sword.png');
        scene.load.image('staff', 'assets/items/staff.png');
        scene.load.atlas('swing', 'assets/swing.png', 'assets/swing_atlas.json');
        scene.load.animation('swing_anim', 'assets/swing_anim.json');
    }

    create() {
        if(this.type == 'staff'){
            this.map.createFromObjects(this.layer, 204, {key:this.type});
            console.log('staff created');
        }else if(this.type == 'sword') {
            this.map.createFromObjects(this.layer, 181, {key:this.type});
            console.log('sword created');
        }
        return;
    }

    
}