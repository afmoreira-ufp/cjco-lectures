import Bullet from "./Bullet.js";

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
            classType: Bullet
        });

        //creates animation from spritesheet
        //https://photonstorm.github.io/phaser3-docs/Phaser.Scene.html#anims__anchor
        //https://photonstorm.github.io/phaser3-docs/Phaser.Animations.AnimationManager.html
        this.scene.anims.create({
            key: 'flap', //animation identifier
            //frames to play in animation 
            //https://photonstorm.github.io/phaser3-docs/Phaser.Animations.AnimationManager.html#generateFrameNumbers__anchor
            frames: this.scene.anims.generateFrameNumbers('bird', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1 //animation repetition (-1 = infinity)
        });

        //executes animation
        this.play('flap');

    }

    update(cursors, time) {
        if (cursors.space.isDown && this.timeToShoot < time) {
            //let bullet = this.scene.physics.add.image(this.x, this.y, "bullet");
            let bullet = this.bullets.getFirstDead(true, this.x, this.y);

            if (bullet) {
                //bullet.setVelocityX(350);
                bullet.fire(this.scene.enemy);

            }
            //this.bullets.push(bullet);

            this.timeToShoot = time + this.fireRate;

            if (this.bullets.children.size > this.bulletsMaxsize) {
                console.log("Group size failed")
            }

        }


        this.setVelocity(0);
        const width = this.scene.game.config.width;
        const height = this.scene.game.config.height;
        //const velocity = 150;
        if (cursors.down.isDown && this.y < height - this.frame.height) {
            this.setVelocityY(this.velocity);
        } else if (cursors.up.isDown && this.y > 0 + this.frame.height) {
            this.setVelocityY(-this.velocity);
        }
        if (cursors.right.isDown && this.x < width - this.frame.width) {
            this.setVelocityX(this.velocity);
        } else if (cursors.left.isDown && this.x > 0 + this.frame.width) {
            this.setVelocityX(-this.velocity);
        }

        this.bullets.children.iterate(function (bullet) {
            if (bullet.isOutsideCanvas()) {
                //bullet.active = false;
                this.bullets.killAndHide(bullet);
            }
        }, this);

    }



}