import * as PIXI from 'pixi.js'

let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    Rectangle = PIXI.Rectangle;

let cat;

//Create a Pixi Application
let app = new Application({
    width: 800,
    height: 600,
    antialias: true,
    transparent: false,
    resolution: 1
});
//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

loader
    .add({
        'name': 'catImage',
        'url': 'assets/Pusheen-the-Cat-10.png'
    })
    .add('tile', 'assets/tilesets.png')
    .on("progress", loadProgressHandler)
    .load(setup);

function setup() {

    let texture = TextureCache["assets/tilesets.png"];

    //Create a rectangle object that defines the position and
    //size of the sub-image you want to extract from the texture
    //(`Rectangle` is an alias for `PIXI.Rectangle`)
    let rectangle = new Rectangle(0, 0, 32, 32);

    //Tell the texture to use that rectangular section
    texture.frame = rectangle;

    let rocket = new Sprite(texture);

    //Create the cat sprite
    cat = new Sprite(resources.catImage.texture);
    //Change the sprite's position
    cat.position.set(96, 96)
    cat.scale.set(0.1, 0.1);
    //Add the cat to the stage


    app.stage.addChild(cat);

    app.stage.addChild(rocket);
    app.renderer.render(app.stage);

    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){

    //Move the cat 1 pixel 
    cat.x += 1;
  }

function loadProgressHandler(loader, resource) {

    //Display the file `url` currently being loaded
    console.log("loading: " + resource.url);

    //Display the percentage of files currently loaded
    console.log("progress: " + loader.progress + "%");

    //If you gave your files names as the first argument 
    //of the `add` method, you can access them like this
    //console.log("loading: " + resource.name);
}