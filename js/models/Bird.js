export default class Bird extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "bird");


        this.scene.add.existing(this);

        //enable physics to sprite
        this.scene.physics.world.enable(this);

        this.timeToShoot = 0;

        //this.bullets=[];

        this.bullets = this.scene.physics.add.group({
            maxSize: 5
        });


    }

    update(cursors, time) {
        if (cursors.space.isDown && this.timeToShoot < time) {
            //let bullet = this.scene.physics.add.image(this.x, this.y, "bullet");
            let bullet = this.bullets.getFirstDead(true, this.x, this.y, "bullet");

            if (bullet) {
                bullet.setVelocityX(250);
            }
            //this.bullets.push(bullet);

            this.timeToShoot = time + 100;

            console.log(this.bullets.children.size);
        }


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

        this.bullets.children.iterate(function (bullet) {
            if (bullet.x > 300) {
                //bullet.active = false;
                this.bullets.kill(bullet);
            }
        }, this)

    }



}