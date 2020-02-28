export default class Bird extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "bird");


        this.scene.add.existing(this);

        //enable physics to sprite
        this.scene.physics.world.enable(this);

        this.velocity = 250;

        this.timeToShoot = 0;
        this.fireRate = 250;

        //this.bullets=[];

        this.bulletsMaxsize = 5;

        this.bullets = this.scene.physics.add.group({
            maxSize: this.bulletsMaxsize,
        });




    }

    update(cursors, time) {
        if (cursors.space.isDown && this.timeToShoot < time) {
            //let bullet = this.scene.physics.add.image(this.x, this.y, "bullet");
            let bullet = this.bullets.getFirstDead(true, this.x, this.y, "bullet");

            if (bullet) {
                bullet.setVelocityX(350);

                bullet.active = true;
                bullet.visible = true;
            }
            //this.bullets.push(bullet);

            this.timeToShoot = time + this.fireRate;

            if (this.bullets.children.size > this.bulletsMaxsize) {
                console.log("Group size failed")
            }

        }


        this.setVelocity(0);
        //const velocity = 150;
        if (cursors.down.isDown) {
            this.setVelocityY(this.velocity);
        } else if (cursors.up.isDown) {
            this.setVelocityY(-this.velocity);
        }
        if (cursors.right.isDown) {
            this.setVelocityX(this.velocity);
        } else if (cursors.left.isDown) {
            this.setVelocityX(-this.velocity);
        }

        this.bullets.children.iterate(function (bullet) {
            if (bullet.x > this.scene.game.config.width) {
                //bullet.active = false;
                this.bullets.killAndHide(bullet);
            }
        }, this);

    }



}