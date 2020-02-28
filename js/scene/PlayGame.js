import Bird from "../models/Bird.js";

export default class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame");
    }
    create() {
        console.log("Starting game");

        //this.bird = this.physics.add.sprite(100, 100, "bird", 2);

        this.bird = new Bird(this, 100, 100);

        //this.bird.setGravityY(-10);
        //this.bird.setVelocityY(10)

        this.cursors = this.input.keyboard.createCursorKeys()

        this.enemy = this.physics.add.sprite(400, 400, "enemy");

        this.enemy.setScale(0.5);

    }

    update(time, delta) {
        //console.log(time + " " + delta);
        this.bird.update(this.cursors, time);

    }

}