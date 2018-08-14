// heights and widths
// canvas 1 heigh and width
var boardWidth = 250
var boardHeight = 250
// canvas 2 heigh and width
var boardWidthc2 = 320
var boardHeightc2 = 250

// canvas 3 heigh and width
var boardWidthc3 = 250
var boardHeightc3 = 320
// some calculations
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

// stopwatch
var h1 = document.getElementById('stopwatch'),
    start = document.getElementById('begin'),
    stop = document.getElementById('quit'),
    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0;
function add() {
    seconds += 1
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
            if(hours >= 60){
                hours = 0;
            }
        }
    }
    
    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00");
}


function circleMotion(){
	this.centerX = 0
	this.centerY = 0
	this.radius  = 0
	this.currentAngle = 0
	this.deltaAngle = 0

	this.draw = function(fill , border){
		c.beginPath();
		c.arc(this.getX(),this.getY(),10, 0, 2 * Math.PI, false);
		c.strokeStyle = border;
		c.fillStyle   = fill;
		c.stroke();		
		c.fill();
	}

	this.getX =function(){
		return this.centerX + this.radius* Math.cos(toRadians(this.currentAngle))
	}
	this.getY =function(){
		return this.centerY + this.radius* Math.sin(toRadians(this.currentAngle))
	}

	this.update = function(){
		this.currentAngle -= this.deltaAngle
		this.draw()
		c.beginPath();
		c.moveTo(canvas.width/2,canvas.height/2);
		c.lineTo(mBall.getX()+1,mBall.getY()+1);
		c.stroke();
	}
}

function backgroundSetup(){
	c.beginPath();
	c.arc(canvas.width/2,canvas.height/2,gradius, 0, 2 * Math.PI, false);
	c.strokeStyle = "black";
	c.fillStyle   = "white";
	c.stroke();		
	c.fill();


	c.beginPath();
	c.rect(canvas.width/2,canvas.height/2,2,2)
	c.strokeStyle = "black";
	c.fillStyle   = "black";
	c.stroke();		
	c.fill();
}
// xy canvases
function xyaxis(){

	//y-axis
	c2.beginPath();
	c2.moveTo(20,0);
	c2.lineTo(20,canvas2.height);
	c2.stroke();
	//x-axis
	c2.beginPath();
	c2.moveTo(0,canvas2.height/2);
	c2.lineTo(canvas2.width,canvas2.height/2);
	c2.stroke();
	for(i=20 ; i < canvas2.width ; i+=60)
	{

		c2.beginPath();
		c2.moveTo(i,canvas2.height/2-3);
		c2.lineTo(i,canvas2.height/2+3);
		c2.stroke();
	}

	numY = 100
	for(i=25 ; i < canvas2.height ; i+=20)
	{
		c2.beginPath();
		c2.moveTo(18,i);
		c2.lineTo(23,i);
		c2.stroke();
			
		title = "" + numY
		c2.font = "9px Arial";
		c2.fillText(title,1,i);
		numY = numY-20
	}

	title = "Gráfico Y(t)"
	c2.font = "12px Arial";
	c2.fillText(title,canvas2.width/2-(title.length*3),20);

	// canva c3
	//y-axis
	c3.beginPath();
	c3.moveTo(canvas3.width/2,0);
	c3.lineTo(canvas3.width/2,canvas3.height);
	c3.stroke();
	//x-axis
	c3.beginPath();
	c3.moveTo(0,20);
	c3.lineTo(canvas2.width,20);
	c3.stroke();
	for(i=20 ; i < canvas3.height ; i+=60)
	{

		c3.beginPath();
		c3.moveTo(canvas3.width/2-3,i);
		c3.lineTo(canvas3.width/2+3,i);
		c3.stroke();
	}

	numY = -100
	for(i=25 ; i < canvas3.width ; i+=20)
	{
		c3.beginPath();
		c3.moveTo(i, 18);
		c3.lineTo(i, 23);
		c3.stroke();
			
		title = "" + numY
		c3.font = "9px Arial";
		c3.fillText(title,i-10,15);
		numY = numY+20
	}

	title = "Gráfico X(t)"
	c3.font = "12px Arial";
	c3.fillText(title,canvas3.width - 70,canvas3.height - 15);

	title = "tiempo"+String.fromCharCode(8594)
	c2.font = "15px Arial";
	c2.fillText(title,canvas2.width/2-(title.length*3),canvas2.height-15);

	title = "tiempo" + String.fromCharCode(8594)
	c3.save()
	c3.translate(0,0)
	c3.rotate(Math.PI / 2)
	c3.font = "15px Arial";
	c3.fillText(title,canvas3.width/2,-15);
	c3.restore()
}
// updateing graphs
function Dot(x,y,x2,y2){
	this.x = x;
	this.y = y;
	this.x2 = x2;
	this.y2 = y2;
	this.dx = 0
	this.draw = function(){
		// canvas 2
		c2.beginPath();
		c2.rect(this.x,this.y, 1,1)
		c2.stroke();
		c2.fill()
		// canvas 3
		c3.beginPath();
		c3.rect(this.x2,this.y2, 1,1)
		c3.stroke();
		c3.fill()
	}

	this.update = function(xvalue , yvalue){
		// canvas 2
		c2.beginPath();
		c2.moveTo(this.x,this.y);
		// canvas 3
		c3.beginPath();
		c3.moveTo(this.x2,this.y2);
		// c2
		this.x += 1
		this.y = yvalue
		// c3
		this.x2 =  xvalue
		this.y2 += 1
		// c2
		c2.lineTo(this.x,this.y);
		c2.stroke();
		//c3
		c3.lineTo(this.x2,this.y2);
		c3.stroke();


		if(this.x > canvas2.width){
			c2.clearRect(0,0, canvas2.width , canvas2.height);
			this.x =20
			xyaxis()
		}

		if(this.y2 > canvas3.height){
			c3.clearRect(0,0, canvas3.width , canvas3.height);
			this.y2 =20
			xyaxis()
		}
		this.draw()
	}
}

//  Code Begins
// Get HTML tags
var canvas = document.getElementById("mainCanvas");
var canvas2 = document.getElementById("secondaryCanvas");
var canvas3 = document.getElementById("thirdCanvas");
// set height and width
// main
canvas.width = boardWidth;
canvas.height = boardHeight;
// second
canvas2.height = boardHeightc2
canvas2.width = boardWidthc2
// third
canvas3.height = boardHeightc3
canvas3.width = boardWidthc3

// set context for each canvas
var c = canvas.getContext('2d');
var c2 = canvas2.getContext('2d');
var c3 = canvas3.getContext('2d');
// global variables
var animation
var gradius = 50
var gangle = 0
var gfrecq = 1
// main canvas objects
mBall = new circleMotion()
mBall.centerX = canvas.width/2
mBall.centerY = canvas.height/2
mBall.radius = gradius
mBall.currentAngle = -gangle
mBall.deltaAngle = (360*gfrecq)/60

graphDot = new Dot(20,canvas2.height/2 , canvas3.width/2,20)
// init
backgroundSetup();
mBall.draw();
xyaxis()
// buttons 
document.getElementById("go").onclick = function (){
	// start button
	// disable radius and angle slider
	radiusSlider.disabled = true;
	angleSlider.disabled = true;
	// update ball
	
	//Start Animation

	animate();
	this.disabled  = true

}
document.getElementById("stop").onclick = function (){
	// pause button
	cancelAnimationFrame(animation)
	document.getElementById("go").disabled = false
}
document.getElementById("reset").onclick = function (){
	// reset button
	cancelAnimationFrame(animation)
	document.getElementById("go").disabled = false
	// Time
	seconds = -1
	minutes = 0
	hours = 0
	add()
	// Gvariables
	gradius = 50
	gangle = 0
	gfrecq = 1

	// set default values of slider values
	radiusVal.innerHTML = "Radio : " + gradius + " mm"
	angleVal.innerHTML = "Ángulo de fase : " + gangle + "&deg;"
	frecqVal.innerHTML = "Frecuencia : " + gfrecq + " Hz"
	// set default values of sliders
	radiusSlider.value = gradius
	angleSlider.value = gangle
	frecqSlider.value = gfrecq
	// reset Ball
	mBall.radius = gradius
	mBall.currentAngle = gangle
	mBall.deltaAngle = (360*gfrecq)/60
	// enable radius and angle slider
	radiusSlider.disabled = false;
	angleSlider.disabled = false;
	//Redraw
	c.clearRect(0,0, canvas.width , canvas.height);
	backgroundSetup();
	mBall.draw();
	// reset Graphs
	c2.clearRect(0,0, canvas2.width , canvas2.height);
	c3.clearRect(0,0, canvas3.width , canvas3.height);
	graphDot = new Dot(20,canvas2.height/2 , canvas3.width/2,20)
	xyaxis();

}

// sliders
radiusSlider = document.getElementById("radius")
angleSlider = document.getElementById("phase")
frecqSlider = document.getElementById("frecquency")
// Values
radiusVal = document.getElementById("radiusValue")
angleVal = document.getElementById("pAngleValue")
frecqVal = document.getElementById("frecValue")

// Slider Change function

radiusSlider.oninput = function(){
	//update corresponding value
	radiusVal.innerHTML = "Radio : " + this.value + " mm"
	gradius = this.value
	mBall.radius = gradius
	c.clearRect(0,0, canvas.width , canvas.height);
	backgroundSetup();
	mBall.draw()
}
angleSlider.oninput = function(){
	//update corresponding value
	angleVal.innerHTML = "Ángulo de fase : "+this.value + "&deg;"
	gangle = this.value
	mBall.currentAngle = -gangle
	c.clearRect(0,0, canvas.width , canvas.height);
	backgroundSetup()
	mBall.draw()
}
frecqSlider.oninput = function(){
	//update corresponding value
	frecqVal.innerHTML = "Frecuencia : "+this.value + " Hz"
	gfrecq = this.value
	mBall.deltaAngle = (360*gfrecq)/60
}

// animate function

function animate(){
	add()
	animation =  requestAnimationFrame(animate);
	c.clearRect(0,0, canvas.width , canvas.height);
	backgroundSetup();
	mBall.update();
	graphDot.update(mBall.getX() , mBall.getY())
	console.log(graphDot)
}