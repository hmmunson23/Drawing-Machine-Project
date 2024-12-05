let colorPicker;
let pickerTool;
let colorPicker2;
let pickerTool2;
let pickerColor;
let pickerColor2;
let slider;
let slider2;
let slider3;
let lineWeight;
let logoArray = [];
let mode = 0;
let bgColor;

let previousState;

let stateIndex = 0;

function setup() {
  frameRate(120);
  let canvas = createCanvas(700, 600);
  canvas.parent('sketch-holder')
  background(255);
  
  button0 = createButton('Change Background Color');
  button0.parent('controls-two');
  button0.mousePressed(clearScreen);
  
  button = createButton('Clear Screen');
  button.parent('controls-two');
  button.mousePressed(changeBg);
  
  button2 = createButton('Save Image')
  button2.parent('controls-two')
  button2.mousePressed(saveDrawing);
  
  button3 = createButton('Undo')
  button3.parent('controls-two')
  button3.mousePressed(undoToPreviousState)
  
  colorPicker = createElement('p', 'Select Stroke Color:');
  colorPicker.parent('controls-main');
  
  pickerTool = createColorPicker('black');
  pickerTool.parent('controls-main');
  
  slider = createElement('p', 'Select Stroke Weight:');
  slider.parent('controls-main');
  
  slider = createSlider(1, 50,25);
  slider.parent('controls-main');
  
  colorPicker2 = createElement('p', 'Select Background Color:')
  colorPicker2.parent('controls-main')
  
  pickerTool2 = createColorPicker('white');
  pickerTool2.parent('controls-main')
  
  
  blurTool = createElement('p', 'Add Blur:')
  blurTool.parent('controls-main')
  
  slider2 = createSlider(1, 10,0);
  slider2.parent('controls-main');
  slider2.mousePressed(blurFunction);
  
  addPoster = createElement('p', 'Add Posterize:')
  addPoster.parent('controls-main')
  
  slider3 = createSlider(1,20,0)
  slider3.parent('controls-main')
  slider3.mousePressed(posterFunction);
  
  eraserTool = createElement('p', 'Hold s to erase')
  eraserTool.parent('controls-main')
  
  
  
  logoArray[0] = loadImage("Assets/logo.png");
  logoArray[1] = loadImage("Assets/logo2.png");
  
  saveState();
  
  
}

function draw() {
  pickerColor = pickerTool.color();
  stroke(pickerColor);
  lineWeight = slider.value();
  strokeWeight(lineWeight);
  
  if (mouseIsPressed === true) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  } else {
    fill(255);
  }
  
  if(mode == 0){
  } else if( mode == 1){
   	drawEraser(); 
  }
  
  noStroke();
  
  if(keyIsPressed && key == 's'){
    mode = 1;
  } else {
   	mode = 0; 
  }

  
  
  
  
   

}

function posterFunction(){
  
  filter(POSTERIZE, slider3.value())
  
}

function blurFunction(){
  
  filter(BLUR,slider2.value())
  
}

function clearScreen() {
  pickerColor2 = pickerTool2.color();
  background(pickerColor2);
}

function changeBg(){
  
  background(255);
}

function saveDrawing(){
  logoDraw();
  save("untitled.png")
  
}

function keyPressed(e) {
  
  if (e.keyCode == 90 && (e.ctrlKey || e.metaKey)) {
    undoToPreviousState();
  }
}

function undoToPreviousState() {
  
  if (!previousState) {
    return;
  } 
  background(255);
  image(previousState, 0, 0);
  previousState = null;
}

function saveState() {
  previousState = get();
}

function logoDraw(){
  
  image(logoArray[0],-3,0,700,600)
}

function drawEraser(){
  strokeWeight(100);
  stroke(255);
  line(mouseX, mouseY, pmouseX, pmouseY);
}

