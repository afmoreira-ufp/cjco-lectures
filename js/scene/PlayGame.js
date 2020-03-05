import Bird from "../models/Bird.js";

export default class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    create() {
        console.log("Starting game");

        //this.bird = this.physics.add.sprite(100, 100, "bird", 2);

        const width = this.game.config.width;
        const height = this.game.config.height;

        //this.add.image(width / 2, height / 2, "bg");
        this.add.image(0, 0, "bg").setDisplayOrigin(0, 0).setDisplaySize(width, height);


        this.bird = new Bird(this, 100, 100);

        //this.bird.setGravityY(-10);
        //this.bird.setVelocityY(10)

        this.cursors = this.input.keyboard.createCursorKeys()

        this.enemy = this.physics.add.sprite(400, 400, "enemy");

        this.physics.add.collider(this.bird, this.enemy, (bird, enemy) => {
            console.log("crash!");
        });

        this.enemy.setScale(0.5);

    }

    update(time, delta) {
        //console.log(time + " " + delta);
        this.bird.update(this.cursors, time);

    }

}