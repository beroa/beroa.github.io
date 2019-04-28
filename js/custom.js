// Closes the sidebar menu
$("#menu-close").click(function(e) {
  e.preventDefault();
  $("#sidebar-wrapper").toggleClass("active");
});

// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
  e.preventDefault();
  $("#sidebar-wrapper").toggleClass("active");
});

// Scrolls to the selected menu item on the page
$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

// draws enso
var canvas = $("canvas")[0];
var startRoundness = 1;

/* update layout */
var canvasSize = 500;
function setSizes() {
  canvasSize = $(window).height();
  canvas.setAttribute("width", canvasSize);
  canvas.setAttribute("height", canvasSize);
}

function draw() {
  setSizes();
  var ctx = canvas.getContext("2d");
  var canvasHalf = canvasSize/2;
  var lineWidth = 1;
  var lineCount = canvasSize*.35/lineWidth;
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "#66D9EF";
  var start = Math.random()*2*Math.PI;  
  for (var i = 0; i < lineCount; i++){
    // rounds start point
    if (Math.random()>.5) {
      if (i < lineCount/2) {start+=.01;}
      else {start +=startRoundness*.015;}
    } else {
      if (i > lineCount/2) {start-=.01;}
      else {start -=startRoundness*.015;}
    }
    var radius = canvasHalf-(lineWidth/2)*i;
    var shorten = (Math.PI-Math.random()*Math.PI*.8);
    var end = start-shorten;
    ctx.beginPath();
    ctx.arc(canvasHalf, canvasHalf, radius, start, end);
    ctx.stroke();
    ctx.closePath();
  }
}

// setSizes();
draw();

var canvasURL = 'url(' + canvas.toDataURL() + ')';
var headerDiv = $(".header-canvas");
headerDiv.css('background-image', canvasURL);
// document.body.style.background = "url(" + canvas.toDataURL() + ")";