// heights and widths
// canvas 1 heigh and width
var boardWidth = 300
var boardHeight = 300
// canvas 2 heigh and width
var boardWidthc2 = 300
var boardHeightc2 = 158

// canvas 3 heigh and width
var boardWidthc3 = 529
var boardHeightc3 = 180
//=================================================
// sliders
radiusSlider = document.getElementById("radius")
angleSlider = document.getElementById("phase")
frecqSlider = document.getElementById("frecquency")
g1Slider = document.getElementById("g1")
g2Slider = document.getElementById("g2")
g3Slider = document.getElementById("g3")
// Values
radiusVal = document.getElementById("radiusValue")
angleVal = document.getElementById("pAngleValue")
frecqVal = document.getElementById("frecValue")
g1Val = document.getElementById("g1Value")
g2Val = document.getElementById("g2Value")
g3Val = document.getElementById("g3Value")
//==================================================

// some calculations
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

// stopwatch
var    seconds = 0, minutes = 0, hours = 0;
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
    
    //h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00");
}


function circleMotion(){
	this.centerX = 0
	this.centerY = 0
	this.radius  = 0
	this.currentAngle = 0
	this.deltaAngle = 0
	this.secondAngle = 0
	this.draw = function(fill , border){
		c.save()
		c.beginPath();
		c.arc(this.getX(),this.getY(),70, 0, 2 * Math.PI, false);
		var grd=c.createLinearGradient(this.getX(),this.getY(),((canvas.width/2)+110* Math.cos(toRadians(-this.secondAngle))),(canvas.height/2+110* Math.sin(toRadians(-this.secondAngle))));
		this.secondAngle += this.deltaAngle

		grd.addColorStop(0,"#DCDCDC");
		grd.addColorStop(1,"#696969	");
		c.strokeStyle = border;
		c.fillStyle   = grd;
		c.stroke();		
		c.fill();
		c.restore();


		c.beginPath();
		c.rect(this.getX()-1,this.getY()-1,2,2)
		c.strokeStyle = "white";
		c.fillStyle   = "white";
		c.stroke();		
		c.fill();

		c.beginPath();
		c.rect(canvas.width/2-3,canvas.height/2-3,6,6)
		c.strokeStyle = "black";
		c.fillStyle   = "black";
		c.stroke();		
		c.fill();
		this.staticRefrences()
		// canvas 2 shm
		c2.beginPath()
		c2.rect(this.getX(), canvas2.height/2+18,30,30)
		c2.stroke()
		c2.fillStyle = "#EC6928"
		c2.fill()

		numberOfLines = 20
		startX = 25
		increment = (this.getX()-25)/numberOfLines
		c2.beginPath()
		c2.moveTo(startX,115);
		for(i =0 ; i< (numberOfLines/2) ; i++){
			startX += increment
			c2.lineTo(startX,103);
			c2.stroke();

			startX += increment
			c2.lineTo(startX,120)
			c2.stroke();

		}
	}
	this.getXSpecial =function(){
		return this.centerX + this.radius* Math.cos(toRadians(this.currentAngle + 90))
	}
	this.getX =function(){
		return this.centerX + this.radius* Math.cos(toRadians(this.currentAngle))
	}
	this.getY =function(){
		return this.centerY + this.radius* Math.sin(toRadians(this.currentAngle))
	}
	this.getY1 = function(){
		return this.centerY + this.radius* (2*Math.PI *gfrecq) * Math.cos(toRadians(this.currentAngle))	
	}
	this.getY2 = function(){
		return this.centerY + this.radius* (2*Math.PI *gfrecq) * (2*Math.PI *gfrecq) * (-Math.sin(toRadians(this.currentAngle + 180)))
	}
	this.update = function(){
		this.currentAngle -= this.deltaAngle
		this.draw()
	}

	this.staticRefrences = function(){
		
		for(i = 25 ; i < canvas.height/2; i+=10 )
		{
			c.beginPath();
			c.moveTo(canvas.width/2,i);
			c.lineTo(canvas.width/2,i+5);
			c.stroke();
		}

		for(i = canvas.width/2 ; i < canvas.width-30 ; i+=10 )
		{
			c.beginPath();
			c.moveTo(i,canvas.height/2);
			c.lineTo(i+5,canvas.height/2);
			c.stroke();
		}

		c.beginPath();
		c.rect(canvas.width-49,canvas.height/2-5,40,10)
		c.strokeStyle = "black";
		c.fillStyle   = "yellow";
		c.stroke();		
		c.fill();

		title = "X"
		c.font = "16px Arial";
		c.strokeStyle = "black";
		c.fillStyle   = "black";
		c.fillText(title,canvas.width-20,canvas.height/2-10);

		c.beginPath();
		c.moveTo(canvas.width-10,canvas.height/2);
		c.bezierCurveTo(canvas.width-10,canvas.height/2,299,145,295,170)
		c.lineTo(295,170);
		c.strokeStyle="black";
		c.lineWidth = 3	
		c.stroke();

		c.lineWidth = 1


		// canvas c2 background setup
		c2.beginPath();
		c2.rect(5,canvas2.height/2,20,canvas2.height/2-15)// vertival slab
		c2.fillStyle = "grey"
		c2.fill();
		c2.beginPath();
		c2.rect(5,canvas2.height-30,canvas2.width - 10,25)// horizontal slab
		c2.fill();
		c2.fillStyle = "black"
	}
}
function clearAllGraphs(){
	c3.clearRect(0,0, canvas3.width, canvas3.height)
	c4.clearRect(0,0, canvas3.width, canvas3.height)
	c5.clearRect(0,0, canvas3.width, canvas3.height)
}
// general graph setup
function graphSetup(objc , cnum){
	// canva c3
	//y-axis
	objc.beginPath();
	objc.moveTo(50,canvas3.height/2);
	objc.lineTo(canvas3.width,canvas3.height/2);
	objc.stroke();
	//x-axis
	objc.beginPath();	
	objc.moveTo(50,0);
	objc.lineTo(50, canvas3.height);
	objc.stroke();
	for(i=50 ; i < canvas3.width ; i+=60)
	{

		objc.beginPath();
		objc.moveTo(i, canvas3.height/2-3);
		objc.lineTo(i, canvas3.height/2+3);
		objc.stroke();
	}
	
	const gC = 20
	decrement = 5
	max = gradius/g1Slider.value
	if(cnum == 2){
		max = (gradius * (2*Math.PI *gfrecq))/g2Slider.value
	}else if(cnum == 3){
		max = (gradius * (2*Math.PI *gfrecq) * (2*Math.PI *gfrecq))/g3Slider.value
	}
	maxLimit = gC * (Math.ceil(max/gC))
	numY = maxLimit
	decrement = maxLimit/4
	
	
	for(i=10 ; i < canvas3.height ; i+=20)
	{
		objc.beginPath();
		objc.moveTo(48, i);
		objc.lineTo(53, i);
		objc.stroke();
		if (numY != 0)
		{	
			title = "" + numY
			objc.font = "9px Arial";
			objc.fillText(title,29,i+3);
		}
		numY = numY-decrement
	}
	title = "Gráfico X(t)"
	if(cnum == 2)
		title = "Gráfico V(t)"
	else if (cnum == 3)
		title = "Gráfico A(t)"

	objc.font = "12px Arial";
	objc.fillText(title,canvas3.width/2-30,14);

	title = "tiempo (sec)" + String.fromCharCode(8594)
	objc.font = "15px Arial";
	objc.fillText(title,canvas3.width/2-30,canvas3.height-5);
	switch(cnum){
		case 1:
			title = String.fromCharCode(8592) +"  µm " + String.fromCharCode(8594)
			break;
		case 2:
			title = String.fromCharCode(8592) + "  µm/s" + String.fromCharCode(8594)
			break;
		case 3:
			title = String.fromCharCode(8592) + "  µm/s2" + String.fromCharCode(8594)
			break;
	}

	objc.save()
	objc.rotate(toRadians(-90))
	objc.font = "15px Arial";
	objc.fillText(title,-120,20);
	objc.restore();
}

// xy canvases
function xyaxis(){
	graphSetup(c3 , 1)
	graphSetup(c4 , 2)
	graphSetup(c5 , 3)
	
}
// updateing graphs
function Dot(){
	this.x = 50;
	this.y1 = canvas3.height/2;
	this.y2 = canvas3.height/2;
	this.y3 = canvas3.height/2;

	this.update = function(xvalue , x2val , x3val){
		// c3
		c3.beginPath();
		c3.moveTo(this.x,this.y1);
		// c4
		c4.beginPath();
		c4.moveTo(this.x,this.y2);
		// c5
		c5.beginPath();
		c5.moveTo(this.x,this.y3);

		max = gradius/g1Slider.value
		maxLimit = 20 * (Math.ceil(max/20)) 
		this.x +=1 
		this.y1 = canvas3.height/2 + (((canvas.width/2)- xvalue)/maxLimit *80)
		
		max = (gradius * (2*Math.PI *gfrecq))/g2Slider.value
		maxLimit = 20 * (Math.ceil(max/20)) 
		this.y2 = canvas3.height/2 + (((canvas.width/2)- x2val)/maxLimit *80)

		max = (gradius * (2*Math.PI *gfrecq) * (2*Math.PI *gfrecq))/g3Slider.value
		maxLimit = 20 * (Math.ceil(max/20)) 
		this.y3 = canvas3.height/2 + (((canvas.width/2)- x3val)/maxLimit *80) 
		//c3
		c3.lineTo(this.x,this.y1);
		c3.stroke();
		c4.lineTo(this.x,this.y2);
		c4.stroke();
		c5.lineTo(this.x,this.y3);
		c5.stroke();
		//
		if(this.x > canvas3.width){
			clearAllGraphs()
			this.x =50
			xyaxis()
		}
		c3.beginPath();
		c3.rect(this.x,this.y1, 1,1)
		c3.stroke();
		c3.fill()

		c4.beginPath();
		c4.rect(this.x,this.y2, 1,1)
		c4.stroke();
		c4.fill()

		c5.beginPath();
		c5.rect(this.x,this.y3, 1,1)
		c5.stroke();
		c5.fill()
	}
}

//  Code Begins
// Get HTML tags
var canvas = document.getElementById("mainCanvas");
var canvas2 = document.getElementById("secondaryCanvas");
var canvas3 = document.getElementById("thirdCanvas");
var canvas4 = document.getElementById("fourthCanvas");
var canvas5 = document.getElementById("fifthCanvas");
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
//fourth
canvas4.height = boardHeightc3
canvas4.width = boardWidthc3
// fifth
canvas5.height = boardHeightc3
canvas5.width = boardWidthc3

// set context for each canvas
var c = canvas.getContext('2d');
var c2 = canvas2.getContext('2d');
var c3 = canvas3.getContext('2d');
var c4 = canvas4.getContext('2d');
var c5 = canvas5.getContext('2d');
// global variables
var animation
var gradius = 10
var gangle = 0
var gfrecq = 1
// main canvas objects
mBall = new circleMotion()
mBall.centerX = canvas.width/2
mBall.centerY = canvas.height/2
mBall.radius = gradius
mBall.currentAngle = -gangle
mBall.deltaAngle = (360*gfrecq)/60

graphDot = new Dot()
// init

mBall.draw();
xyaxis()
// buttons 
document.getElementById("go").onclick = function (){
	// start button
	// disable radius and angle slider
	radiusSlider.disabled = true;
	angleSlider.disabled = true;
	// g1Slider.disabled = true;
	// g2Slider.disabled = true;
	// g3Slider.disabled = true;
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
	gradius = 10
	gangle = 0
	gfrecq = 1

	// set default values of slider values
	radiusVal.innerHTML = "Amplitude : " + gradius + " &microm"
	angleVal.innerHTML = "Ángulo de fase : " + gangle + "&deg;"
	frecqVal.innerHTML = "Frecuencia : " + gfrecq + " Hz"
	g1Val.innerHTML = "X(t) : 1x"
	g2Val.innerHTML = "V(t) : 1x"
	g3Val.innerHTML = "V(t) : 1x"
	// set default values of sliders
	radiusSlider.value = gradius
	angleSlider.value = gangle
	frecqSlider.value = gfrecq
	g1Slider.value = 1
	g2Slider.value = 1
	g3Slider.value = 1
	// reset Ball
	mBall.radius = gradius
	mBall.currentAngle = gangle
	mBall.deltaAngle = (360*gfrecq)/60
	// enable radius and angle slider
	radiusSlider.disabled = false;
	angleSlider.disabled = false;
	g1Slider.disabled = false;
	g2Slider.disabled = false;
	g3Slider.disabled = false;
	//Redraw
	c.clearRect(0,0, canvas.width , canvas.height);
	c2.clearRect(0,0, canvas2.width , canvas2.height);
	mBall.draw();
	// reset Graphs
	clearAllGraphs();
	graphDot = new Dot()
	xyaxis();

}


// Slider Change function
radiusSlider.oninput = function(){
	//update corresponding value
	radiusVal.innerHTML = "Amplitude : " + this.value + " &microm"
	gradius = this.value
	mBall.radius = gradius
	c.clearRect(0,0, canvas.width , canvas.height);
	c2.clearRect(0,0, canvas2.width , canvas2.height);

	clearAllGraphs()
	xyaxis();
	mBall.draw()
}
angleSlider.oninput = function(){
	//update corresponding value
	angleVal.innerHTML = "Ángulo de fase : "+this.value + "&deg;"
	gangle = this.value
	mBall.currentAngle = -gangle
	c.clearRect(0,0, canvas.width , canvas.height);
	c2.clearRect(0,0, canvas2.width , canvas2.height);
	mBall.draw()
}
frecqSlider.oninput = function(){
	//update corresponding value
	frecqVal.innerHTML = "Frecuencia : "+this.value + " Hz"
	gfrecq = this.value
	mBall.deltaAngle = (360*gfrecq)/60
	clearAllGraphs()
	xyaxis();
}

g1Slider.oninput = function(){
	g1Val.innerHTML = "X(t) : "+this.value+"x"
	clearAllGraphs()
	xyaxis();
}
g2Slider.oninput = function(){
	g2Val.innerHTML = "A(t) : "+this.value+"x"
	clearAllGraphs()
	xyaxis();
}
g3Slider.oninput = function(){
	g3Val.innerHTML = "V(t) : "+this.value+"x"
	clearAllGraphs()
	xyaxis();
}
// animate function

function animate(){
	add()
	animation =  requestAnimationFrame(animate);
	c.clearRect(0,0, canvas.width , canvas.height);
	c2.clearRect(0,0, canvas2.width , canvas2.height);
	mBall.update();
	graphDot.update(mBall.getXSpecial(),mBall.getY1(), mBall.getY2())
}