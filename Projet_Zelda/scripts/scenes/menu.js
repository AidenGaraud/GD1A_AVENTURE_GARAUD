//Création du Menu et Lancer le jeu
export default class Menu extends Phaser.Scene {
    constructor() {
        super('menu')
    }

    preload()
	{
        this.load.image('playbutton', 'assets/UI/LogoJouerFinal.png')
        this.load.image('menu', 'assets/UI/Menu.png');
	}

    create() { 
        //Création de variables utiles entre les scènes
        this.life = 3;
        this.money = 0;

        //Création de l'écran "Menu"
        this.add.image(0, 0, 'menu').setOrigin(0).setDepth(0);

        let playButton = this.add.image(448*2 +50 , 280*2 + 100, 'playbutton').setDepth(1);

        //Interaction possible avec le bouton de lancement du jeu.
        playButton.setInteractive();

        playButton.on("pointerup", () => {
            this.scene.start('level1', {health:this.life, coins:this.money});
        })

    }
}