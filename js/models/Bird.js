export default class Bird extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "bird");


        this.scene.add.existing(this);

        //enable physics to sprite
        this.scene.physics.world.enable(this);


    }

    update(cursors) {
        this.setVelocity(0);
        const velocity = 150;
        if (cursors.down.isDown) {
            this.setVelocityY(velocity);
        } else if (cursors.up.isDown) {
            this.setVelocityY(-velocity);
        }
        if (cursors.right.isDown) {
            this.setVelocityX(velocity);
        } else if (cursors.left.isDown) {
            this.setVelocityX(-velocity);
        }
    }



}