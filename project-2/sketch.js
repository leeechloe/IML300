function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
}

function draw() {
  for (let x = 0; x < width; x += 4) {
    for (let y = 0; y < height; y += 4) {
      let c = random(255);
      fill(c);
      noStroke();
      rect(x, y, 4, 4);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}