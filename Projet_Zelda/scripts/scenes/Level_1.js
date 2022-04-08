//Level 1
export default class Level_1 extends Phaser.Scene {
    constructor() {
        super('level1')
    }

    //Récupération des données inter-scènes
	init(data){
		this.life = data.health
        this.runesScore = data.coins
	}
    //Génération des images et des contrôles
	preload(){

        //Images Preloaders
		this.load.spritesheet('hero', 'assets/Movables/hero.png',{ frameWidth: 44, frameHeight: 54 })
		this.load.image('enemy', 'assets/Movables/ennemi1.png')

		this.load.image('Tileset', 'assets/Levels/Assets-Level1.png')
        this.load.tilemapTiledJSON('Map', 'assets/Levels/Level_1.json');

		this.load.image('fireball', 'assets/Movables/Fireball.png')
		this.load.image('runes', 'assets/Movables/Rune1.png')
		this.load.image('item1', 'assets/Movables/Parchemin.png')

		this.load.image('life', 'assets/UI/FullHP.png')
		this.load.image('life2', 'assets/UI/MidHP.png')
		this.load.image('life3', 'assets/UI/LowHP.png')
        //Contrôles
		this.cursors = this.input.keyboard.createCursorKeys()
        this.boutonAttaque = this.input.keyboard.addKey('A');

    }

    create(){

		this.immune = true;
		this.direction = "down";
		this.attaquePossible = false;

        //Mapping
		let LevelMap = this.make.tilemap({key:'Map'});

        let Terrain = LevelMap.addTilesetImage('Assets-Level1','Tileset');

        let Background = LevelMap.createLayer('Unwalkable Ground', Terrain, 0, 0).setDepth(-5);
        let Layer1 = LevelMap.createLayer('Ground', Terrain, 0, 0).setDepth(-4);
        let Layer2 = LevelMap.createLayer('Ground 2', Terrain, 0, 0).setDepth(-3);
		let Layer3 = LevelMap.createLayer('Bâtiments Collision Perso.', Terrain, 0, 0).setDepth(-2);
		let Layer4 = LevelMap.createLayer('Props', Terrain, 0, 0).setDepth(-1);

		let Layer5 = LevelMap.createLayer('Colliders', Terrain, 0, 0).setDepth(1);

        //Animations
        
        this.anims.create({
			key: 'normal',
			frames: this.anims.generateFrameNumbers('hero', {frame: 0} ),
			frameRate: 8
		});
		
		this.anims.create({
			key:'up',
			frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 7 }),
			frameRate: 8,
			repeat: -1
		})

		this.anims.create({
			key:'down',
			frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 3 }),
			frameRate: 8,
			repeat: -1
		})
		

		this.anims.create({
			key:'right',
			frames: this.anims.generateFrameNumbers('hero', { start: 12, end: 15 }),
			frameRate: 8,
			repeat: -1
		})
		this.anims.create({
			key:'left',
			frames: this.anims.generateFrameNumbers('hero', { start: 8, end: 11 }),
			frameRate: 8,
			repeat: -1
		})

		//Player
        const spawnPoint = LevelMap.findObject("Objects", obj => obj.name === "Spawn Player");
		this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'hero').setDepth(0);

		//Colliders
		// - Colliders Ground
		this.physics.add.collider(this.player, Background); 
        Background.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player, Layer3);        
        Layer3.setCollisionByProperty({collides:true});

        this.physics.add.collider(this.player, Layer5);       
        Layer5.setCollisionByProperty({collides:true});

        // - Colliders Ennemis
		const spawnEnnemi1 = LevelMap.findObject("Objects", obj => obj.name === "Ennemi1");
		const spawnEnnemi2 = LevelMap.findObject("Objects", obj => obj.name === "Ennemi2");
		const spawnEnnemi3 = LevelMap.findObject("Objects", obj => obj.name === "Ennemi3");
		const spawnEnnemi4 = LevelMap.findObject("Objects", obj => obj.name === "Ennemi4");
		const spawnEnnemi5 = LevelMap.findObject("Objects", obj => obj.name === "Ennemi5");
		const spawnEnnemi6 = LevelMap.findObject("Objects", obj => obj.name === "Ennemi6");
		const spawnEnnemi7 = LevelMap.findObject("Objects", obj => obj.name === "Ennemi7");
		const spawnEnnemi8 = LevelMap.findObject("Objects", obj => obj.name === "Ennemi8");

        this.ennemy = this.physics.add.group();
        this.ennemy.create(spawnEnnemi1.x,spawnEnnemi1.y,'enemy').setDepth(0);
        this.ennemy.create(spawnEnnemi2.x,spawnEnnemi2.y,'enemy').setDepth(0);
        this.ennemy.create(spawnEnnemi3.x,spawnEnnemi3.y,'enemy').setDepth(0);
        this.ennemy.create(spawnEnnemi4.x,spawnEnnemi4.y,'enemy').setDepth(0);
        this.ennemy.create(spawnEnnemi5.x,spawnEnnemi5.y,'enemy').setDepth(0);
        this.ennemy.create(spawnEnnemi6.x,spawnEnnemi6.y,'enemy').setDepth(0);
        this.ennemy.create(spawnEnnemi7.x,spawnEnnemi7.y,'enemy').setDepth(0);
		this.ennemy.create(spawnEnnemi8.x,spawnEnnemi8.y,'enemy').setDepth(0);

        this.physics.add.overlap(this.player, this.ennemy, this.hitEnnemi, null,this);

		// - Colliders Attaques
		this.bouledefeu = this.physics.add.group();
		this.physics.add.overlap(this.bouledefeu, this.ennemy, this.killEnnemy, null,this);

        // - Colliders Items
		const ItemFireball = LevelMap.findObject("Objects", obj => obj.name === "ItemFireBall");
        this.item1 = this.physics.add.group();
        this.item1.create(ItemFireball.x,ItemFireball.y,'item1');
        this.physics.add.overlap(this.player, this.item1, this.Objet1, null,this);

		const Next = LevelMap.findObject("Objects", obj => obj.name === "NextLevel");
        this.Level2Entry = this.physics.add.group();
        this.Level2Entry.create(Next.x,Next.y,'item1').setVisible(false);
        this.physics.add.overlap(this.player, this.Level2Entry, this.NextLevel, null,this);

        this.runes = this.physics.add.group();
        this.physics.add.overlap(this.player, this.runes, this.Runes, null,this);

		//Camera
		this.cameras.main.startFollow(this.player);
		this.cameras.main.setBounds(0,0,LevelMap.widthInPixels, LevelMap.heightInPixels);
		this.cameras.main.setZoom(2);
		this.physics.world.setBounds(0,0,LevelMap.widthInPixels, LevelMap.heightInPixels);
		this.player.setCollideWorldBounds(true);

        //Ennemis Add-ons
		
		var test = this;

		this.ennemy.children.iterate(function (child) {
			test.tweens.add({
				targets: child,
				x: child.x+(32*5),
				duration: 4000,
				yoyo: true,
				flipX: true,
				delay: 100,
				repeat: -1
			});
		})

        

        //Contrôles Manette

        this.paddleConnected=false;

		this.input.gamepad.once('connected', function (pad) {
			this.paddleConnected = true;
			paddle = pad;
			});

		//UI
		this.health1 = this.add.image(spawnPoint.x-200,spawnPoint.y-650,'life').setScrollFactor(0).setDepth(3).setScale(2);
		this.health2 = this.add.image(spawnPoint.x-200,spawnPoint.y-650,'life2').setScrollFactor(0).setDepth(3).setVisible(false).setScale(2);
		this.health3 = this.add.image(spawnPoint.x-200,spawnPoint.y-650,'life3').setScrollFactor(0).setDepth(3).setVisible(false).setScale(2);

		const TextIntro = LevelMap.findObject("Objects", obj => obj.name === "TextIntro");
		const TextFireball = LevelMap.findObject("Objects", obj => obj.name === "TextFireball");
		const TextEnnemy = LevelMap.findObject("Objects", obj => obj.name === "TextEnnemy");
		const TextFin = LevelMap.findObject("Objects", obj => obj.name === "TextFinNiveau");

		this.textI;
		this.textF;
		this.textE;
		this.textFin;

    	this.textI = this.add.text(TextIntro.x-300, TextIntro.y-50, "Récupère les runes qui sont aux mains des monstres ! Utilise les flèches pour te déplacer", {
        	font: "12px monospace",
        	fill: "#ffffff",
        	padding: { x: 20, y: 10 },
      	}).setDepth(3);
		this.textF = this.add.text(TextFireball.x-200, TextFireball.y-50, "Récupères le parchemin pour débloquer ton pouvoir !", {
        	font: "12px monospace",
        	fill: "#ffffff",
        	padding: { x: 20, y: 10 },
      	}).setDepth(3);
		this.textE = this.add.text(TextEnnemy.x-100, TextEnnemy.y-20, "Fais attention aux ennemis !", {
        	font: "12px monospace",
        	fill: "#ffffff",
        	padding: { x: 20, y: 10 },
      	}).setDepth(3);
		this.textFin = this.add.text(TextFin.x-300, TextFin.y-50, "Pour accéder au prochain niveau, il faut que tu aies récupérer toutes les runes.", {
        	font: "12px monospace",
        	fill: "#ffffff",
        	padding: { x: 20, y: 10 },
      	}).setDepth(3);

    }
    update(t,dt){

        //Paramétrages des valeurs
		const speed = 175;

        if (!this.player)
		{
			return
		}
		

        // Controls Mapping
        if (this.paddleConnected == true)
    	{

        	if (paddle.right)
        	{
            	this.player.setVelocityX(speed);
            	this.player.anims.play('right', true);
				this.direction = "right";
        	}
        	else if (paddle.left)
        	{
            	this.player.setVelocityX(-speed);
            	this.player.anims.play('left', true);
				this.direction = "left";
        	}
            else if (paddle.up)
        	{
            	this.player.setVelocityY(-speed);
            	this.player.anims.play('up', true);
				this.direction = "up";
        	}
            else if (paddle.down)
        	{
            	this.player.setVelocityY(speed);
            	this.player.anims.play('down', true);
				this.direction = "down";
        	}
			else if (paddle.A && this.attaquePossible)
			{
				this.player.setVelocity(0)
				this.attack(this.player,this.direction);
			}


		}

		else if (this.cursors.up.isDown)
		{
			this.player.setVelocityY(-speed);
			this.player.anims.play('up', true);
			this.direction = "up";
		}


		else if (this.cursors.left.isDown)
		{
            this.player.setVelocityX(-speed);
			this.player.anims.play('left', true);
			this.direction = "left";
		}

		else if (this.cursors.right.isDown)
		{
            this.player.setVelocityX(speed);
			this.player.anims.play('right', true);
			this.direction = "right";	
		}
        else if (this.cursors.down.isDown)
		{
            this.player.setVelocityY(speed);
			this.player.anims.play('down', true);	
			this.direction = "down";
		}	
		else if (this.attaquePossible && Phaser.Input.Keyboard.JustDown(this.boutonAttaque)){
			this.player.setVelocity(0)
			this.attack(this.player,this.direction);
		}	

		else{
			this.player.setVelocity(0)
			this.player.anims.play('normal')
		}

		if (this.runesScore == 80){
			this.textFin.destroy();
		}

    }

    //Fonction Attaque
    attack(player,direction){
		var fireball = this.bouledefeu.create(player.x,player.y,'fireball')
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
				this.effect = this.time.addEvent({ delay : 200, repeat: 9, callback: function(){this.player.visible = !this.player.visible;}, callbackScope: this});
			}

			this.ImmuneFrame = this.time.addEvent({ delay : 2000, callback: function(){this.immune = true}, callbackScope: this});

		}
		if(this.life == 2){
			this.health1.setVisible(false);
			this.health2.setVisible(true);
		}
		if(this.life == 1){
			this.health2.setVisible(false);
			this.health3.setVisible(true);
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

    //Fonction Objet1
    Objet1(player,item){
        console.log("Vous avez ramassé le premier item");
		this.attaquePossible = true;
		this.textF.setText("Appuie sur A pour lancer une attaque surpuissante");
		item.destroy();
    }

    //Fonction Runes
    Runes(player,rune){
        this.runesScore += 10;
        console.log(this.runesScore);
		rune.destroy();
    }

    //Fonction de changement de scène
    NextLevel(){
		if (this.runesScore >= 80){
			this.scene.start('level2', {health:this.life, coins:this.runesScore})
		}		
	}
}