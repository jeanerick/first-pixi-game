import * as PIXI from 'pixi.js'

const Keyboard = require('pixi.js-keyboard');
const Mouse = require('pixi.js-mouse');


let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    TextureCache = PIXI.utils.TextureCache,
    Rectangle = PIXI.Rectangle;

var cat, state;

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




    function getAngleTo(mx, my, px, py) {
        var self = this;
        var distX = my - py;
        var distY = mx - px;
        var angle = Math.atan2(distX, distY);
        //var degrees = angle * 180/ Math.PI;
        return angle;
      }
       
      function getAngleX(length, angle) {
          return Math.cos(angle) * length;
      }
       
      function getAngleY(length, angle) {
          return Math.sin(angle) * length;
      }




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

    state = play;

    app.ticker.add(delta => gameLoop(delta));

    Mouse.events.on('released', null, (buttonCode, event, mouseX, mouseY, mouseOriginX, mouseOriginY, mouseMoveX, mouseMoveY) => {
        console.log(buttonCode, mouseOriginX, mouseOriginY, mouseX, mouseY, mouseMoveX, mouseMoveY);
      });


}

function gameLoop(delta){
    //Update the current game state:
    state(delta);
   
    Keyboard.update();
    Mouse.update();
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

function play(delta) {
    const speed = 5 * delta;
    
    // Keyboard
    if (Keyboard.isKeyDown('ArrowLeft', 'KeyA'))
      cat.x -= speed;
    if (Keyboard.isKeyDown('ArrowRight', 'KeyD'))
      cat.x += speed;
    
    if (Keyboard.isKeyDown('ArrowUp', 'KeyW'))
      cat.y -= speed;
    if (Keyboard.isKeyDown('ArrowDown', 'KeyS'))
      cat.y += speed;
    
    // Mouse
    cat.rotation = getAngleTo(Mouse.getPosX(), Mouse.getPosY(), cat.x, cat.y);
    
    if (Mouse.isButtonDown(Mouse.Button.LEFT)) {
      cat.x += getAngleX(speed, cat.rotation);
      cat.y += getAngleY(speed, cat.rotation);
    }
    if (Mouse.isButtonDown(Mouse.Button.RIGHT)) {
      cat.x -= getAngleX(speed, cat.rotation);
      cat.y -= getAngleY(speed, cat.rotation);
    }
}