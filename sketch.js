// script based on this one:
// https://github.com/ml5js/ml5-library/tree/main/examples/p5js/DCGAN/DCGAN_LatentVector_RandomWalk

let dcgan;
let vector = [];
let cnv;

function preload() {
  dcgan = ml5.DCGAN('model/manifest.json');
}

function centreCanvas(){
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(600,600);
  centreCanvas();
  // start with a random vector
  for (let i = 0; i < 128; i++) {
    vector[i] = random(-1, 1);
  }
  // generate an image on load
  generate();
}

function windowResized(){
  centreCanvas();
}

function walk() {
  for (let i = 0; i < 128; i++) {
    vector[i] += random(-0.01, 0.01);
  }
}

function generate() {
  walk();
  dcgan.generate(displayImage, vector);
}

function displayImage(err, result) {
  if (err) {
    console.log(err);
  } 
  image(result.image, 0, 0, width, height);
  generate();
}