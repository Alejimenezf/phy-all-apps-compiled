// heights and widths
// canvas 2 heigh and width
var boardWidthc2 = 530
var boardHeightc2 = 250
// fcanvas height and width
var boardWidthf = 530
var boardHeightf = 250
// some calculations
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}

// stopwatch
/*var h1 = document.getElementById('stopwatch'),
    start = document.getElementById('begin'),
    stop = document.getElementById('quit'),
    clear = document.getElementById('clear'),*/
  var seconds = 0, minutes = 0, hours = 0;
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

function getLimit(){
	r1 = parseInt(radiusSlider.value)
	r2 = parseInt(radiusSlider2.value)
	r3 = parseInt(radiusSlider3.value)
	nn = parseInt(radiusN.value)// noise amplitude

	sumVal = r1 + r2 + r3 +nn

	if(sumVal >= 320)
		return 640
	else if(sumVal >= 160)
		return 320
	else if(sumVal >= 80)
		return 160
	else if(sumVal >= 40)
		return 80
	else if (sumVal >= 20)
		return 40
	else 
		return 20

}
// circle motion
function circleMotion(){
	this.centerX = 0
	this.centerY = 0
	this.radius  = 0
	this.currentAngle = 0
	this.deltaAngle = 0
	

	this.getX =function(){
		return this.centerX + this.radius* Math.cos(toRadians(this.currentAngle))
	}
	this.getY =function(){
		//return this.centerY + this.radius* Math.sin(toRadians(this.currentAngle))

		return this.radius* Math.sin(toRadians(this.currentAngle))
	}

	this.update = function(){
		this.currentAngle += this.deltaAngle		
	}
}

// xy canvases
function xyaxis(){
	// ======  Canvas ====== 
	//y-axis
	c2.beginPath();
	c2.moveTo(50,0);
	c2.lineTo(50,canvas2.height);
	c2.stroke();
	//x-axis
	c2.beginPath();
	c2.moveTo(50,canvas2.height/2);
	c2.lineTo(canvas2.width,canvas2.height/2);
	c2.stroke();
	for(i=50 ; i < canvas2.width ; i+=60)
	{

		c2.beginPath();
		c2.moveTo(i,canvas2.height/2-3);
		c2.lineTo(i,canvas2.height/2+3);
		c2.stroke();
	}
	numY = maxLimit
	for(i=25 ; i < canvas2.height ; i+=25)
	{

		c2.beginPath();
		c2.moveTo(48,i);
		c2.lineTo(53,i);
		c2.stroke();
			
		title = "" + numY
		c2.font = "9px Arial";
		c2.fillText(title,30,i);
		numY = numY-(maxLimit/4)
	}
	title = "Gráfico X(t)"
	c2.font = "15px Arial";
	c2.fillText(title,canvas2.width/2-(title.length*3),20);

	title = "tiempo (ms)"+String.fromCharCode(8594)
	c2.font = "15px Arial";
	c2.fillText(title,canvas2.width/2-(title.length*3),canvas2.height-15);

	c2.save()
	c2.rotate(toRadians(-90))
	title = "X(" +String.fromCharCode(181)+"m) "+String.fromCharCode(8594)
	c2.font = "15px Arial";
	c2.fillText(title,-150,20);
	c2.restore()
	// ======  Canvas Frecquecy======
	//y-axis
	fc.beginPath();
	fc.moveTo(50,0);
	fc.lineTo(50,canvasf.height - 50);
	fc.stroke();
	//x-axis
	fc.beginPath();
	fc.moveTo(50,canvasf.height-50);
	fc.lineTo(canvasf.width,canvasf.height-50);
	fc.stroke();
	numY = 0
	for(i=50 ; i < canvasf.width ; i+=60)
	{

		fc.beginPath();
		fc.moveTo(i,canvasf.height- 47);
		fc.lineTo(i,canvasf.height- 53);
		fc.stroke();

		title = "" + numY
		fc.font = "9px Arial";
		fc.fillText(title,i,canvasf.height-40);
		numY = numY+1
	}

	numY = maxLimit
	for(i=20 ; i < canvasf.height-45; i+=18)
	{

		fc.beginPath();
		fc.moveTo(48,i);
		fc.lineTo(53,i);
		fc.stroke();
			
		title = "" + numY
		fc.font = "9px Arial";
		fc.fillText(title,30,i);
		numY = numY-(maxLimit / 10)
	}

	title = "Espectro de Frecuencia"
	fc.font = "15px Arial";
	fc.fillText(title,canvas2.width/2-(title.length*3),20);

	title = "f (Hz)"+String.fromCharCode(8594)
	fc.font = "15px Arial";
	fc.fillText(title,canvas2.width/2-(title.length*3),canvas2.height-15);

	fc.save()
	fc.rotate(toRadians(-90))
	title = "X(" +String.fromCharCode(181)+"m) "+String.fromCharCode(8594)
	fc.font = "15px Arial";
	fc.fillText(title,-150,20);
	fc.restore()
	
}
// frecquency spectrum
function frecqSpectrum(){
	checkpoint = {0.5 : 0 , 1 : 0 , 1.5 : 0 , 2:0 , 2.5:0 ,3:0} 	
	var a = new Array();
	var r = new Array();
	var f = new Array();;
	// amplitudes
	r[0] = parseInt(radiusSlider.value)
	r[1] = parseInt(radiusSlider2.value)
	r[2] = parseInt(radiusSlider3.value)
	nn = parseInt(radiusN.value) //noise amplitude
	// frecquencies
	f[0] = parseFloat(frecqSlider.value)
	f[1] = parseFloat(frecqSlider2.value)
	f[2] = parseFloat(frecqSlider3.value)
	// phase angle
	a[0] = parseFloat(angleSlider.value)
	a[1] = parseFloat(angleSlider2.value)
	a[2] = parseFloat(angleSlider3.value)
	/// =========================================
	///
	amps = [[],[],[]];
	for(j =0 ; j<3 ;j++){
		angle = a[j];
		for(i=0; i<10; i++){
			amps[j].push( r[j] * Math.sin(toRadians(angle)))
			angle += 45
		}
	}
	console.log(amps)
	for(i = 0.5 ; i< 3.5 ; i+=0.5){
		max =0
		for(k=0;k<10; k++){
			temp =0;
			for(j=0 ; j <3 ;j++){
				
				if(f[j] == i)
					temp= temp +amps[j][k]
			}
			if(temp > max)
				max = temp
			//console.log("Max=>" + max)
		}
		checkpoint[i] = max
	}
	//console.log(checkpoint)
	for(i =0 ;i < 3 ;i++){
		xpoint = 50 + (f[i] *60)
		fc.beginPath();
		fc.moveTo(xpoint,canvasf.height-50);
		fc.lineTo(xpoint,canvasf.height - 50 - (checkpoint[f[i]]/maxLimit *180));
		fc.stroke();	
	}
	
	// setup for noise

	var nfecq = Math.floor(Math.random()*30+1)// number of frecquencies
	for(i=0 ; i< nfecq ; i+=1){
		xpoint = 50 + (Math.floor(Math.random()*300+1))
		fc.beginPath();
		fc.moveTo(xpoint,canvasf.height-50);
		fc.lineTo(xpoint,canvasf.height - 50 - (Math.floor(Math.random()*nn)/maxLimit *180));
		fc.stroke();
	}

}
// updateing graphs
function Dot(x,y ){
	this.x = x;
	this.y = y;
	this.dx = 0
	this.draw = function(){
		// canvas 2
		c2.beginPath();
		c2.rect(this.x,this.y, 1,1)
		c2.stroke();
		c2.fill()
	}

	this.update = function(comp1 , comp2 ,comp3){
		// canvas 2
		c2.beginPath();
		c2.moveTo(this.x,this.y);
		// c2
		noise = ((	gNoise/2) * Math.sin(Math.floor(Math.random()*360)))
		actualvalue = (comp1 + comp2 + comp3) + noise
		scaledDownValue = actualvalue/maxLimit*20
		this.x += 1																	
		this.y = (canvas2.height/2) + (scaledDownValue *10)
		
		// c2
		c2.lineTo(this.x,this.y);
		c2.stroke();
		if(this.x > canvas2.width){
			c2.clearRect(0,0, canvas2.width , canvas2.height);
			fc.clearRect(0,0, canvasf.width , canvasf.height)
			frecqSpectrum()
			this.x =50
			xyaxis()
		}
		
		// draw
		this.draw()
	}
}

//  Code Begins
// Get HTML tags
var canvas2 = document.getElementById("secondaryCanvas");
var canvasf = document.getElementById("fCanvas");
// set height and width
// second
canvas2.height = boardHeightc2
canvas2.width = boardWidthc2
// fcanvas
canvasf.height = boardHeightf
canvasf.width = boardWidthf
// set context for each canvas
var c2 = canvas2.getContext('2d');
var fc = canvasf.getContext('2d');
// global variables
var animation
var gradius = 0
var gangle = 0
var gfrecq = 1
var gNoise = 0
var maxLimit = 20
// main canvas objects
// object 1 
mBall = new circleMotion()
mBall.centerX = canvas2.width/2
mBall.centerY = canvas2.height/2
mBall.radius = gradius
mBall.currentAngle = -gangle
mBall.deltaAngle = (360*gfrecq)/60
// object 2
mBall2 = new circleMotion()
mBall2.centerX = canvas2.width/2
mBall2.centerY = canvas2.height/2
mBall2.radius = gradius
mBall2.currentAngle = -gangle
mBall2.deltaAngle = (360*gfrecq)/60
// object 3
mBall3 = new circleMotion()
mBall3.centerX = canvas2.width/2
mBall3.centerY = canvas2.height/2
mBall3.radius = gradius
mBall3.currentAngle = -gangle
mBall3.deltaAngle = (360*gfrecq)/60
//===================
graphDot = new Dot(50,canvas2.height/2)
// init
xyaxis()
// buttons
checkPause = false 
document.getElementById("go").onclick = function (){
	// start button
	// disable radius and angle slider
	radiusSlider.disabled = true;
	angleSlider.disabled = true;
	radiusSlider2.disabled = true;
	angleSlider2.disabled = true;
	radiusSlider3.disabled = true;
	angleSlider3.disabled = true;
	radiusSliderN.disabled = true;
	// set Max Limit
	maxLimit = getLimit();
	//Start Animation
	if(!checkPause)
	{
		checkPause = false
		c2.clearRect(0,0, canvas2.width , canvas2.height);
		fc.clearRect(0,0,canvasf.width,canvasf.height);
		xyaxis();
		frecqSpectrum();
	}	
	animate();
	this.disabled  = true
}
document.getElementById("stop").onclick = function (){
	// pause button
	cancelAnimationFrame(animation)
	document.getElementById("go").disabled = false
	checkPause = true
}
document.getElementById("reset").onclick = function (){
	// reset button
	cancelAnimationFrame(animation)
	document.getElementById("go").disabled = false
	maxLimit = 20
	// Time
	seconds = -1
	minutes = 0
	hours = 0
	add()
	// Gvariables
	gradius = 0
	gangle = 0
	gfrecq = 1
	gNoise = 0
	// set default values of slider values
	// === comp 1
	radiusVal.innerHTML = "Amplitud : " + (gradius*2) + " &#181m"
	angleVal.innerHTML = "Ángulo de Fase : " + gangle + "&deg;"
	frecqVal.innerHTML = "Frecuencia : " + gfrecq + " Hz"
	// === comp 2
	radiusVal2.innerHTML = "Amplitud : " + (gradius*2) + " &#181m"
	angleVal2.innerHTML = "Ángulo de Fase : " + gangle + "&deg;"
	frecqVal2.innerHTML = "Frecuencia : " + gfrecq + " Hz"
	// === comp 3
	radiusVal3.innerHTML = "Amplitud : " + (gradius*2) + " &#181m"
	angleVal3.innerHTML = "Ángulo de Fase : " + gangle + "&deg;"
	frecqVal3.innerHTML = "Frecuencia : " + gfrecq + " Hz"
	// === Noise
	radiusValN.innerHTML = "Amplitud : " + (gNoise) + " mm"
	//************************************
	// set default values of sliders
	// === comp 1
	radiusSlider.value = gradius*2
	angleSlider.value = gangle
	frecqSlider.value = gfrecq
	// === comp 2
	radiusSlider2.value = gradius*2
	angleSlider2.value = gangle
	frecqSlider2.value = gfrecq
	// === comp 3
	radiusSlider3.value = gradius*2
	angleSlider3.value = gangle
	frecqSlider3.value = gfrecq
	// === Noise
	radiusSliderN.value = gNoise
	//************************************
	// reset Ball
	// === comp 1
	mBall.radius = gradius
	mBall.currentAngle = -gangle
	mBall.deltaAngle = (360*gfrecq)/60
	// === comp 2 
	mBall2.radius = gradius
	mBall2.currentAngle = -gangle
	mBall2.deltaAngle = (360*gfrecq)/60
	// === comp 3 
	mBall3.radius = gradius
	mBall3.currentAngle = -gangle
	mBall3.deltaAngle = (360*gfrecq)/60
	//************************************
	// enable radius and angle slider
	radiusSlider.disabled = false;
	angleSlider.disabled = false;
	radiusSlider2.disabled = false;
	angleSlider2.disabled = false;
	radiusSlider3.disabled = false;
	angleSlider3.disabled = false;
	radiusSliderN.disabled = false;
	//************************************
	// reset Graphs
	c2.clearRect(0,0, canvas2.width , canvas2.height);
	fc.clearRect(0,0,canvasf.width,canvasf.height);
	graphDot = new Dot(50,canvas2.height/2)
	xyaxis();

}

// ============= Component # 1 ==============//

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
	radiusVal.innerHTML = "Amplitud : "+this.value + " mm"
	gradius = this.value
	mBall.radius = gradius/2


}
angleSlider.oninput = function(){
	//update corresponding value
	angleVal.innerHTML = "Ángulo de Fase : "+this.value + " &deg;"
	gangle = this.value
	mBall.currentAngle = -gangle

}
frecqSlider.oninput = function(){
	//update corresponding value
	frecqVal.innerHTML = "Frecuencia : "+this.value + " Hz"
	gfrecq = this.value
	mBall.deltaAngle = (360*gfrecq)/60
}


// ============= Component # 2 ==============//

// sliders
radiusSlider2 = document.getElementById("radius2")
angleSlider2 = document.getElementById("phase2")
frecqSlider2 = document.getElementById("frecquency2")
// Values
radiusVal2 = document.getElementById("radiusValue2")
angleVal2 = document.getElementById("pAngleValue2")
frecqVal2 = document.getElementById("frecValue2")


// Slider Change function

radiusSlider2.oninput = function(){
	//update corresponding value
	radiusVal2.innerHTML = "Amplitud : "+this.value + " mm"
	gradius = this.value
	mBall2.radius = gradius/2


}
angleSlider2.oninput = function(){
	//update corresponding value
	angleVal2.innerHTML = "Ángulo de Fase : "+this.value + " &deg;"
	gangle = this.value
	mBall2.currentAngle = -gangle

}
frecqSlider2.oninput = function(){
	//update corresponding value
	frecqVal2.innerHTML = "Frecuencia : "+this.value + " Hz"
	gfrecq = this.value
	mBall2.deltaAngle = (360*gfrecq)/60
}


// ============= Component # 3 ==============//

// sliders
radiusSlider3 = document.getElementById("radius3")
angleSlider3 = document.getElementById("phase3")
frecqSlider3 = document.getElementById("frecquency3")
// Values
radiusVal3 = document.getElementById("radiusValue3")
angleVal3 = document.getElementById("pAngleValue3")
frecqVal3 = document.getElementById("frecValue3")


// Slider Change function

radiusSlider3.oninput = function(){
	//update corresponding value
	radiusVal3.innerHTML = "Amplitud : "+this.value + " mm"
	gradius = this.value
	mBall3.radius = gradius/2


}
angleSlider3.oninput = function(){
	//update corresponding value
	angleVal3.innerHTML = "Ángulo de Fase : "+this.value + " &deg;"
	gangle = this.value
	mBall3.currentAngle = -gangle

}
frecqSlider3.oninput = function(){
	//update corresponding value
	frecqVal3.innerHTML = "Frecuencia : "+this.value + " Hz"
	gfrecq = this.value
	mBall3.deltaAngle = (360*gfrecq)/60
}


// ============= Noise ==============//

// sliders
radiusSliderN = document.getElementById("radiusN")
// Values
radiusValN = document.getElementById("radiusValueN")
// Slider Change function

radiusSliderN.oninput = function(){
	//update corresponding value
	radiusValN.innerHTML = "Amplitud : "+this.value + " mm"
	gNoise = this.value
}
// animate function

function animate(){
	add()
	animation =  requestAnimationFrame(animate);
	mBall.update();
	mBall2.update();
	mBall3.update();
	graphDot.update(mBall.getY() , mBall2.getY() ,mBall3.getY())
}
