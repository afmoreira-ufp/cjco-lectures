export default class bootGame extends Phaser.Scene {
    constructor() {
        super("BootGame");
    }
    preload() {
        this.load.spritesheet("bird", "assets/bird.png", {
            frameWidth: 34,
            frameHeight: 24
        });

        this.load.image("bullet", "assets/bullet.png");

        this.load.spritesheet("enemy", "assets/enemies.png", {
            frameHeight: 96,
            frameWidth: 96
        });
    }
    create() {
        this.scene.start("PlayGame");
    }
}