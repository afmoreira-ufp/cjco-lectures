import Bird from "../models/Bird.js";
import EnemiesGroup from "../models/EnemiesGroup.js";

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
        this.score = 0;

        /**
         * creates text for score
         */
        this.labelScore = this.add.text(100, 20, "Score: " + this.score, {
            font: "30px Cambria",
            fill: "#ffffff"
        });
        /**
         * create text for bird lives
         */
        this.labelLives = this.add.text(290, 20, "Lives: " + this.bird.lives, {
            font: "30px Cambria",
            fill: "#ffffff"
        });

        //this.bird.setGravityY(-10);
        //this.bird.setVelocityY(10)

        this.cursors = this.input.keyboard.createCursorKeys()

        // this.enemy = this.physics.add.sprite(400, 400, "enemy");
        //        this.enemy = new Enemy(this, 400, 400);
        //this.enemies = this.physics.add.group();

        /** 
         * create a new EnemiesGroup (new class to handle group of Enemy) that can hold 100 enemies
         */
        this.enemies = new EnemiesGroup(this.physics.world, this, 100);

        /**
         * deal with overlap/collision of bird and enemies
         */
        this.physics.add.overlap(this.bird, this.enemies, (bird, enemy) => {
            //console.log("crash!");
            if (bird.canBeKilled) {

                bird.dead();
                this.labelLives.setText("Lives: " + bird.lives);
                this.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        bird.revive();
                    }
                });
            }
        });

        /**
         * deal with overlap/collision of bird bullets and enemies
         */
        this.physics.add.overlap(this.bird.bullets, this.enemies, (bullet, enemy) => {
            //bullet.destroy(); //destroy method removes object from the memory
            //enemy.destroy();

            this.enemies.killAndHide(enemy);
            this.bird.bullets.killAndHide(bullet);

            //prevent collision with multiple enemies by removing the bullet from screen and stoping it
            bullet.removeFromScreen();

            //remove enemy from screen and stop it
            enemy.removeFromScreen();

            this.score += 10;
            //update the score text
            this.labelScore.setText("Score: " + this.score);

        });

        /**
         * config object for enemy spawn timer
         */
        this.enemyTimerDelay = 1000
        this.enemySpawnConfig = {
            delay: this.enemyTimerDelay,
            repeat: -1,
            callback: () => {
                let margin = 300;
                let x = this.sys.canvas.width;
                let y = Math.floor(Math.random() * (this.sys.canvas.height - margin)) + margin;
                //now it does not need to create a new Enemy object (false argument) because they are created with the scene creation
                let enemy = this.enemies.getFirstDead(false, x, y);
                if (enemy) {
                    enemy.spawn()
                }
            }
        };
        this.enemyTimer = this.time.addEvent(this.enemySpawnConfig);

        this.enemySpawnCounter = 0;

        this.themeSound = this.sound.add("theme", { volume: 0.1 });

        this.themeSound.play();

        let fireSound = this.sound.add("fire", {
            volume: 0.1
        });

        this.bird.fireSound = fireSound;



    }

    update(time, delta) {
        //console.log(time + " " + delta);

        // game runs while the bird has more than 0 lives
        if (this.bird.lives > 0) {
            //deal with enemies spawn rate
            this.spawnNewEnemies();

            this.bird.update(this.cursors, time);

            this.enemies.children.iterate(function (enemy) {
                if (enemy.isOutsideCanvas()) {
                    //bullet.active = false;
                    this.enemies.killAndHide(enemy);
                }
            }, this);

            this.enemySpawnCounter += delta;
        }

        else {

            //stops this scene
            this.scene.stop();

            this.themeSound.stop();

            //starts the game over scene and passes the actual score to render at that scene
            this.scene.start('GameOver', { score: this.score });
        }


    }

    /**
     * example of how change the spawn rate 
     * spawnCounter accumulates delta (seconds between frames) 
     * when spawnCounter greaterOrEqual to seconds, removes the actual spawnTimer and replaces to a new one with a lesser delay
     * some limitations for ridiculous spawn rate could be set
    */
    spawnNewEnemies() {
        const seconds = 10;
        if (this.enemySpawnCounter >= seconds * 1000) {
            console.log("remove timer");
            this.enemySpawnCounter = 0;
            this.enemyTimer.remove(false);
            this.enemySpawnConfig.delay -= 50;
            if (this.enemySpawnConfig.delay < 0) {
                this.enemySpawnConfig.delay = 0;
            }
            this.enemyTimer = this.time.addEvent(this.enemySpawnConfig);
            console.log("add new timer delay: " + this.enemySpawnConfig.delay);
        }
    }

}