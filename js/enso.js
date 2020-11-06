var canvas = $("canvas")[0];
var blocker = $("#blocker");
var circle = $("#blocker_circle");
var startRoundness = 1.2;
var maxStart = 0;
// var dpi = window.devicePixelRatio;


// function fix_dpi() {
//   //create a style object that returns width and height
//     let style = {
//       height() {
//         return +getComputedStyle(canvas).getPropertyValue('height').slice(0,-2);
//       },
//       width() {
//         return +getComputedStyle(canvas).getPropertyValue('width').slice(0,-2);
//       }
//     }
//   //set the correct attributes for a crystal clear image!
//     canvas.setAttribute('width', style.width() * dpi);
//     canvas.setAttribute('height', style.height() * dpi);
// }

// var canvasSize = 500;
function setSizes() {
  canvasSize = Math.min($(window).height()*.6, $(window).width());
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);
  console.log("canvassize: " + canvasSize)
  // console.log("dpi: " + dpi)
  // fix_dpi()
  // circle.setAttribute("width", canvasSize);
  // circle.setAttribute("height", canvasSize);
}

function init() {
}

/* draw enso */
function drawEnso() {
  setSizes();
  var ctx = canvas.getContext("2d");
  var canvasHalf = canvasSize/2;
  
  var lineWidth = 1;
  var lineCount = canvasSize*.35/lineWidth+2;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "#66D9EF";
  
  var start = Math.random()*2*Math.PI;
  for (var i = 2; i < lineCount; i++){
    // rounds start points
    if (Math.random()>.5) {
      if (i < lineCount/2) {start-=.01;}
      else {start -=startRoundness*.015;}
    } else {
      if (i > lineCount/2) {start+=.01;}
      else {start +=startRoundness*.015;}
    }
    if (start > maxStart) {
        maxStart = start;
    }
    var radius = canvasHalf-(lineWidth/2)*i;
    var shorten = (Math.PI-Math.random()*Math.PI*.8);
    var end = start+shorten;
    ctx.beginPath();
    ctx.arc(canvasHalf, canvasHalf, radius, end, start);
    ctx.stroke();
    ctx.closePath();
  }
  // rotates the blocker into place 
  var myRot = "rotate(" + maxStart + "rad)";
  blocker.css("transform", myRot);
}

function animateBlocker(revealed) { 
  if (revealed >= 0) {
    setTimeout(function () {
        blocker.css("stroke-dasharray", revealed + " 100")
        revealed = revealed - 1;
        animateBlocker(revealed);
    }, 10);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

$( document ).ready(function() {
  setSizes();
  drawEnso();
  animateBlocker(100)
  // sleep(1000).then(() => {
  //   animateBlocker(101);
  // })
  
});