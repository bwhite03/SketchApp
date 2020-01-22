const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const clearButton = document.querySelector(".clear");
const eraseButton = document.querySelector(".eraser");
const strokeWeight = document.querySelector(".stroke-weight");
const thickness = document.querySelector(".thickness-click");
const parent = document.querySelector("#picker");
const picker = new Picker(parent);
let isDrawing = false;
let isErasing = false;
let currentColor;

picker.onChange = color => {
  parent.style.background = color.rgbaString;
  currentColor = ctx.strokeStyle = color.rgbaString;
};

const start = e => {
  isDrawing = true;
  draw(e);
};

const draw = ({ clientX: x, clientY: y }) => {
  if (!isDrawing) return;
  ctx.lineWidth = strokeWeight.value;
  ctx.lineCap = "round";

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const stop = () => {
  isDrawing = false;
  ctx.beginPath();
};

const clearCanvas = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

const resizeCanvas = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

thickness.addEventListener("click", () => {
  if (strokeWeight.style.display === "block") {
    strokeWeight.style.display = "none";
  } else {
    strokeWeight.style.display = "block";
  }
});

eraseButton.addEventListener("click", () => {
  isErasing = !isErasing;

  if (isErasing === true) {
    ctx.strokeStyle = "#f3f3f3";
  } else {
    ctx.strokeStyle = currentColor;
  }
});

window.addEventListener("resize", resizeCanvas);
canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stop);
clearButton.addEventListener("click", clearCanvas);

resizeCanvas();
