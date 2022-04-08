//Level 1
export default class Level_2 extends Phaser.Scene {
    constructor() {
        super('level2')
    }

    //Récupération des données inter-scènes
	init(data){
		this.life = data.health
        this.runesScore = data.coins
	}
    //Génération des images et des contrôles
	preload(){

        //Images Preloaders
		this.load.spritesheet('hero2', 'assets/Movables/hero2.png',{ frameWidth: 44, frameHeight: 54 })
		this.load.image('enemy2', 'assets/Movables/ennemi1A.png')
        this.load.image('enemyV', 'assets/Movables/ennemi1B.png')

		this.load.image('Tileset2', 'assets/Levels/Assets-Level2.png')
        this.load.tilemapTiledJSON('Map2', 'assets/Levels/Level_2.json');

        this.load.image('fireball', 'assets/Movables/Fireball2.png')
		this.load.image('runes', 'assets/Movables/Rune2.png')

        //Contrôles
		this.cursors = this.input.keyboard.createCursorKeys()
        this.boutonAttaque = this.input.keyboard.addKey('A');

    }

    create(){

		this.immune = true;
		this.direction = "down";
		this.attaquePossible = true;

        //Mapping
		let LevelMap2 = this.make.tilemap({key:'Map2'});

        let Terrain2 = LevelMap2.addTilesetImage('Assets-Level2','Tileset2');

        let Background = LevelMap2.createLayer('Unwalkable Ground', Terrain2, 0, 0).setDepth(-7);
        let Layer1 = LevelMap2.createLayer('Ground', Terrain2, 0, 0).setDepth(-6);
        let Layer2 = LevelMap2.createLayer('Ground 2', Terrain2, 0, 0).setDepth(-5);
		let Layer3 = LevelMap2.createLayer('Ground 3', Terrain2, 0, 0).setDepth(-4);
		let Layer4 = LevelMap2.createLayer('Colliders Trees', Terrain2, 0, 0).setDepth(-3);
        let Layer5 = LevelMap2.createLayer('Colliders Buildings', Terrain2, 0, 0).setDepth(-2);
        let Layer6 = LevelMap2.createLayer('Props', Terrain2, 0, 0).setDepth(-1);

		let Layer7 = LevelMap2.createLayer('Colliders', Terrain2, 0, 0).setDepth(1);

	
        //Player
        const spawnPoint = LevelMap2.findObject("Objects", obj => obj.name === "Spawn Player");
		this.player2 = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero2').setDepth(0);

        //Animations
        
        this.anims.create({
			key: 'normal',
			frames: this.anims.generateFrameNumbers('hero2', {frame: 0} ),
			frameRate: 8
		});
		
		this.anims.create({
			key:'up',
			frames: this.anims.generateFrameNumbers('hero2', { start: 4, end: 7 }),
			frameRate: 8,
			repeat: -1
		})

		this.anims.create({
			key:'down',
			frames: this.anims.generateFrameNumbers('hero2', { start: 0, end: 3 }),
			frameRate: 8,
			repeat: -1
		})
		

		this.anims.create({
			key:'right',
			frames: this.anims.generateFrameNumbers('hero2', { start: 12, end: 15 }),
			frameRate: 8,
			repeat: -1
		})
		this.anims.create({
			key:'left',
			frames: this.anims.generateFrameNumbers('hero2', { start: 8, end: 11 }),
			frameRate: 8,
			repeat: -1
		})
		

		//Colliders
		// - Colliders Ground
		this.physics.add.collider(this.player2, Background); 
        Background.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player2, Layer4);        
        Layer4.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player2, Layer5);       
        Layer5.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player2, Layer7);       
        Layer7.setCollisionByProperty({collides:true});

        // - Colliders Ennemis
		const spawnEnnemi1 = LevelMap2.findObject("Objects", obj => obj.name === "Ennemi1");
		const spawnEnnemi2 = LevelMap2.findObject("Objects", obj => obj.name === "Ennemi2");
		const spawnEnnemi3 = LevelMap2.findObject("Objects", obj => obj.name === "Ennemi3");
		const spawnEnnemi4 = LevelMap2.findObject("Objects", obj => obj.name === "Ennemi4");
		const spawnEnnemi5 = LevelMap2.findObject("Objects", obj => obj.name === "Ennemi5");
		const spawnEnnemi6 = LevelMap2.findObject("Objects", obj => obj.name === "Ennemi6");
		const spawnEnnemi7 = LevelMap2.findObject("Objects", obj => obj.name === "Ennemi7");
		const spawnEnnemi8 = LevelMap2.findObject("Objects", obj => obj.name === "Ennemi8");
        const spawnEnnemi9 = LevelMap2.findObject("Objects", obj => obj.name === "Ennemi9");
        const spawnEnnemi10 = LevelMap2.findObject("Objects", obj => obj.name === "Ennemi10");
        const spawnEnnemi11 = LevelMap2.findObject("Objects", obj => obj.name === "Ennemi11");
        const spawnEnnemi12 = LevelMap2.findObject("Objects", obj => obj.name === "Ennemi12");
        const spawnEnnemi13 = LevelMap2.findObject("Objects", obj => obj.name === "Ennemi13");

        this.ennemy = this.physics.add.group();
        this.ennemyV = this.physics.add.group(); //Ennemis avec déplacement vertical

        this.ennemy.create(spawnEnnemi1.x,spawnEnnemi1.y,'enemy2').setDepth(0);
        this.ennemyV.create(spawnEnnemi2.x,spawnEnnemi2.y,'enemyV').setDepth(0);
        this.ennemy.create(spawnEnnemi3.x,spawnEnnemi3.y,'enemy2').setDepth(0);
        this.ennemy.create(spawnEnnemi4.x,spawnEnnemi4.y,'enemy2').setDepth(0);
        this.ennemy.create(spawnEnnemi5.x,spawnEnnemi5.y,'enemy2').setDepth(0);
        this.ennemy.create(spawnEnnemi6.x,spawnEnnemi6.y,'enemy2').setDepth(0);
        this.ennemy.create(spawnEnnemi7.x,spawnEnnemi7.y,'enemy2').setDepth(0);
		this.ennemyV.create(spawnEnnemi8.x,spawnEnnemi8.y,'enemyV').setDepth(0);
        this.ennemy.create(spawnEnnemi9.x,spawnEnnemi9.y,'enemy2').setDepth(0);
        this.ennemyV.create(spawnEnnemi10.x,spawnEnnemi10.y,'enemyV').setDepth(0);
        this.ennemy.create(spawnEnnemi11.x,spawnEnnemi11.y,'enemy2').setDepth(0);
        this.ennemyV.create(spawnEnnemi12.x,spawnEnnemi12.y,'enemyV').setDepth(0);
        this.ennemy.create(spawnEnnemi13.x,spawnEnnemi13.y,'enemy2').setDepth(0);

        this.physics.add.overlap(this.player2, this.ennemy, this.hitEnnemi, null,this);
        this.physics.add.overlap(this.player2, this.ennemyV, this.hitEnnemi, null,this);

		// - Colliders Attaques
		this.bouledefeu = this.physics.add.group();
		this.physics.add.overlap(this.bouledefeu, this.ennemy, this.killEnnemy, null,this);
        this.physics.add.overlap(this.bouledefeu, this.ennemyV, this.killEnnemy, null,this);

        // - Colliders Items

		const End = LevelMap2.findObject("Objects", obj => obj.name === "Finish");
        this.Finish = this.physics.add.group();
        this.Finish.create(End.x,End.y,'item1').setVisible(false);
        this.physics.add.overlap(this.player2, this.Finish, this.FinishGame, null,this);

        this.runes = this.physics.add.group();
        this.physics.add.overlap(this.player2, this.runes, this.Runes, null,this);

		//Camera
		this.cameras.main.startFollow(this.player2);
		this.cameras.main.setBounds(0,0,LevelMap2.widthInPixels, LevelMap2.heightInPixels);
		this.cameras.main.setZoom(2);
		this.physics.world.setBounds(0,0,LevelMap2.widthInPixels, LevelMap2.heightInPixels);
		this.player2.setCollideWorldBounds(true);

        //Ennemis Add-ons
		var test = this;

		this.ennemy.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x+(32*6),
				duration: 3000,
				yoyo: true,
                flipX: true,
				delay: 100,
				repeat: -1
			});
		})

        this.ennemyV.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				y: child.y+(32*5),
				duration: 3000,
				yoyo: true,
				delay: 100,
				loop: -1
			});
		})

        

        //Contrôles Manette

        this.paddleConnected=false;

		this.input.gamepad.once('connected', function (pad) {
			this.paddleConnected = true;
			paddle = pad;
			});


    }
    update(t,dt){

        //Paramétrages des valeurs
		const speed = 175;

        if (!this.player2)
		{
			return
		}

        

        // Controls Mapping
        if (this.paddleConnected == true)
    	{

        	if (paddle.right)
        	{
            	this.player2.setVelocityX(speed);
            	this.player2.anims.play('right', true);
				this.direction = "right";
        	}
        	else if (paddle.left)
        	{
            	this.player2.setVelocityX(-speed);
            	this.player2.anims.play('left', true);
				this.direction = "left";
        	}
            else if (paddle.up)
        	{
            	this.player2.setVelocityY(-speed);
            	this.player2.anims.play('up', true);
				this.direction = "up";
        	}
            else if (paddle.down)
        	{
            	this.player2.setVelocityY(speed);
            	this.player2.anims.play('down', true);
				this.direction = "down";
        	}
			else if (paddle.A && this.attaquePossible)
			{
				this.player2.setVelocity(0)
				this.attack(this.player2,this.direction);
			}


		}

		else if (this.cursors.up.isDown)
		{
			this.player2.setVelocityY(-speed);
			this.player2.anims.play('up', true);
			this.direction = "up";
		}


		else if (this.cursors.left.isDown)
		{
            this.player2.setVelocityX(-speed);
			this.player2.anims.play('left', true);
			this.direction = "left";
		}

		else if (this.cursors.right.isDown)
		{
            this.player2.setVelocityX(speed);
			this.player2.anims.play('right', true);
			this.direction = "right";	
		}
        else if (this.cursors.down.isDown)
		{
            this.player2.setVelocityY(speed);
			this.player2.anims.play('down', true);	
			this.direction = "down";
		}	
		else if (this.attaquePossible && Phaser.Input.Keyboard.JustDown(this.boutonAttaque)){
			this.player2.setVelocity(0)
			this.attack(this.player2,this.direction);
		}
		else{
			this.player2.setVelocity(0)
			this.player2.anims.play('normal')
		}	

    }

    //Fonction Attaque
    attack(player2,direction){
		var fireball = this.bouledefeu.create(player2.x,player2.y,'fireball')
		if (direction == "down")
		{
			fireball.setVelocityY(175*2)
		}
		else if (direction == "up")
		{
			fireball.setVelocityY(-175*2)
		}
		else if (direction == "right")
		{
			fireball.setVelocityX(175*2)
		}
		else if (direction == "left")
		{
			fireball.setVelocityX(-175*2)
		}
    }

    //Fonction Être blessé par un ennemi
	hitEnnemi(){
		if (this.immune){
			this.life -= 1;
			this.immune = false;
			
			if(this.life > 0){
				this.effect = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.player2.visible = !this.player2.visible;}, callbackScope: this});
			}

			this.ImmuneFrame = this.time.addEvent({ delay : 2000, callback: function(){this.immune = true}, callbackScope: this});

		}
		if(this.life == 0){
			this.scene.start('menu')
		}
	}

    //Fonction Tuer un ennemi et spawn un item
    killEnnemy(fireball, ennemis)
    {
    	var rune = this.runes.create(ennemis.x,ennemis.y,'runes');
        ennemis.destroy();
		fireball.destroy();
    }

    //Fonction Runes
    Runes(player2,rune){
        this.runesScore += 10;
        console.log(this.runesScore);
		rune.destroy();
    }

    //Fonction de changement de scène
    FinishGame(){
		if (this.runesScore >= 210){
			this.scene.start('menu')
		}		
	}
}