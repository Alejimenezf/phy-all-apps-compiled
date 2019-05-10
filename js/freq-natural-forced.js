// set HTML elements
// radio buttin
let radiobtn1 = document.getElementById("mode1");
let radiobtn2 = document.getElementById("mode2");
// buttons
let playbtn = document.getElementById("go");
let pausebtn = document.getElementById("stop");
let resetbtn = document.getElementById("reset");

// slider labels

let ampValue = document.getElementById("radiusValue");
let massValue = document.getElementById("massValue");
let kValue = document.getElementById("kValue");
let cValue = document.getElementById("cValue");
let freqValue = document.getElementById("freqValue"); 
let naturalFreq = document.getElementById("naturalfreq");
let phaseBOX = document.getElementById("phase");
// Sliders 

let ampSlider = document.getElementById("radius");
let massSlider = document.getElementById("mass");
let kSlider = document.getElementById("k");
let cSlider = document.getElementById("c");
let freqSlider = document.getElementById("frecquency"); 

// canvases

let canvas1 = document.getElementById("mainCanvas"); 
let canvas2 = document.getElementById("secondaryCanvas"); 
let canvas3 = document.getElementById("thirdCanvas"); 
let canvas4 = document.getElementById("fourthCanvas"); 

// set canvas width and height

canvas1.width = 410
canvas2.width = 410
canvas3.width = 410
canvas4.width = 410

canvas1.height = 250
canvas2.height = 250
canvas3.height = 250
canvas4.height = 250

// hide canvas 3 and 4 by default
canvas3.style.display = "none"
canvas4.style.display = "none"
freqValue.style.display = "none"
freqSlider.style.display = "none"
phaseBOX.style.display = "none"
// label slider connection
ampSlider.oninput = function(){
	ampValue.innerHTML = "Amplitud inicial (X<sub>0</sub>): "+this.value+" mm";
	resetGraph(canvas1 , 1)
	Box.setAll();
	Box.draw();
	Box.staicRefrence()
}

massSlider.oninput = function(){
	massValue.innerHTML = "Masa (M) : "+this.value+" Kg";
}

kSlider.oninput = function(){
	kValue.innerHTML = "Rigidez resorte (k) : "+this.value+" N/m";
}

cSlider.oninput = function(){
	cValue.innerHTML = "Amortiguamiento (c): "+this.value+" N/(m/s)";
}

freqSlider.oninput = function(){
	freqValue.innerHTML = "Frecuencia forzada : "+this.value+" Hz";
}

// for storing current animation object
let animation
// regular btn functions 
// play
radiobtn1.checked = true;
radiobtn2.checked = false;
state = 3
playbtn.onclick = function(){

	// set Values
	
	if(state == 3){
		Box.radius = ampSlider.value;
		Box.m = massSlider.value;
		Box.k = kSlider.value;
		Box.c = cSlider.value;
		Box.f = freqSlider.value;
		Box.t = 0
		Box.A = 0
		Box.graphX = 50
		Box.lasty = canvas2.height/2
		Box.setDeltaAngle(1)
		if(radiobtn2.checked){
			Box.setDeltaAngle(freqSlider.value)
			Box.drawGraph2();
			Box.drawGraph3();
		}
		Box.setMaxGraphValue();
		resetGraph(canvas2,2,Box.graph2Max)
		//Set Natural Freq Value
		naturalfreq.innerHTML = "Frecuencia Natural : " +Box.getNaturalFreq()+" Hz";
		
	}
	phaseBOX.innerHTML = "Desfase: "+Box.getPhase()+" grados";

	playbtn.disabled = true
	pausebtn.disabled = false;
	resetbtn.disabled = false;
	ampSlider.disabled = true;
	massSlider.disabled = true;
	kSlider.disabled = true;
	cSlider.disabled = true;
	freqSlider.disabled = true;
	state = 1
	animate();
}

pausebtn.onclick = function(){
	
	cancelAnimationFrame(animation)
	playbtn.disabled = false
	pausebtn.disabled = true;
	resetbtn.disabled = false;
	state = 2
}

resetbtn.onclick = function(){

	cancelAnimationFrame(animation)
	naturalfreq.innerHTML = "Frecuencia Natural : 0.5 Hz";
	phase.innerHTML = "Desfase: 0 grados";
	playbtn.disabled = false
	ampSlider.disabled = false;
	massSlider.disabled = false;
	kSlider.disabled = false;
	cSlider.disabled = false;
	freqSlider.disabled = false;
	pausebtn.disabled = true;
	resetbtn.disabled = true;
	ampSlider.value = ampSlider.defaultValue;
	ampSlider.oninput();
	massSlider.value = massSlider.defaultValue;
	massSlider.oninput();
	kSlider.value = kSlider.defaultValue;
	kSlider.oninput();
	cSlider.value = cSlider.defaultValue;
	cSlider.oninput();
	freqSlider.value = freqSlider.defaultValue;
	freqSlider.oninput();
	resetGraph(canvas2 ,2 , Box.graph2Max)
	resetGraph(canvas3 ,3)
	resetGraph(canvas4 ,4)
	Box.setDeltaAngle(freqSlider.value);
	state =3
	// reset stopwatch
	seconds = -1, minutes = 0, hours = 0;
	add();
}

// radio btn function
// normal mode
radiobtn1.oninput = function(){
 	canvas3.style.display = "none"
	canvas4.style.display = "none"
	freqValue.style.display = "none"
	freqSlider.style.display = "none"
	phaseBOX.style.display = "none"
	ampSlider.style.display = "block"
	ampValue.style.display = "block"
	resetbtn.onclick();
}
// forced mode
radiobtn2.oninput = function(){
	canvas3.style.display = "block"
	canvas4.style.display = "block"
	freqValue.style.display = "block"
	freqSlider.style.display = "block"
	phaseBOX.style.display = "block"
	ampSlider.style.display = "none"
	ampValue.style.display = "none"
	resetbtn.onclick();
}


function setGraphBg(canvasobj , num , max){
	var c = canvasobj.getContext('2d');
	//vertical line
	let initx = 50
	c.beginPath()
	c.moveTo(initx,0)
	c.lineTo(initx,canvasobj.height)
	c.stroke()
	let x =canvasobj.height/2
	if(num > 2)
		x = canvasobj.height-30
	//horizontal line
	c.beginPath()
	c.moveTo(0,x)
	c.lineTo(canvasobj.width,x)
	c.stroke()

	numY = max!= null ? max : 60;
	decrement = numY/6 
	i=5
	if(num >2){
		i=20;
		numY = 220;
		decrement = 20
		if(max != null){
			if(max > 0){
				numY = max
				decrement = max/10
			}
		}
	}
	for( ; i < canvasobj.height; i+=20 ){
		c.beginPath();
		c.moveTo(48,i);
		c.lineTo(52,i);
		c.stroke()

		title = "" + numY.toFixed(1)
		c.font = "9px Arial";
		c.fillText(title,24,i+2);
		numY -= decrement
	}
	ah = 122
	d = 180	
	if(num > 2){
		ah = canvas3.height-30-3
		d= 50	
	}
	
	numY = 0
	for(i =50 ; i < canvasobj.width; i += d){
		c.beginPath();
		c.moveTo(i,ah);
		c.lineTo(i,ah+7);
		c.stroke()
		if(num >2){
			title = "" + numY.toFixed(1)
			c.font = "9px Arial";
			c.fillText(title,i-10,ah+18);
			numY += 1
		}
	}

	// set Graph title
	switch(num){
		case 2:
			title = "X(t)";
			c.font = "15px Arial";
			c.fillText(title,canvasobj.width/2-10,15);
			title = "tiempo (s)";
			c.font = "15px Arial";
			c.fillText(title,canvasobj.width/2-10,canvasobj.height/2+15);
			title =  String.fromCharCode(8592) +" X(mm) "+String.fromCharCode(8594);
			c.save()
			c.font = "15px Arial";
			c.rotate(toRadians(-90))
			c.fillText(title,-120,20);
			c.restore()
			break;
		case 3:
			title = "Respuesta en frecuencia";
			c.font = "15px Arial";
			c.fillText(title,canvasobj.width/2-60,15);
			title = "f(Hz)"+String.fromCharCode(8594)
			c.font = "10px Arial";
			c.fillText(title,canvasobj.width/2-10,canvas3.height-6);

			title =  "X(mm) "+String.fromCharCode(8594);
			c.save()
			c.font = "15px Arial";
			c.rotate(toRadians(-90))
			c.fillText(title,-120,20);
			c.restore()
			break;
		case 4:
			title = "Desfase";
			c.font = "15px Arial";
			c.fillText(title,canvasobj.width/2-15,15);
			title = "f(Hz)"+String.fromCharCode(8594)
			c.font = "10px Arial";
			c.fillText(title,canvasobj.width/2-10,canvas3.height-6);

			title =  " Desfase(°)"+String.fromCharCode(8594);
			c.save()
			c.font = "15px Arial";
			c.rotate(toRadians(-90))
			c.fillText(title,-120,20);
			c.restore()
			break;
	}
	
}


function resetGraph(cvs , n , max){
	ctx = cvs.getContext('2d')
	ctx.clearRect(0,0,cvs.width,cvs.height)
	if(n > 1)
		setGraphBg(cvs,n,max)
}
// object class
function box(){
	this.centerX = canvas1.width/2
	this.direction = 1;
	this.radius = ampSlider.value;
	this.m = massSlider.value;
	this.k = kSlider.value;
	this.c = cSlider.value;
	this.f = freqSlider.value;
	this.t =0;
	this.dt = 1/60
	this.A = 0
	this.dA = 0
	this.graph2Max = 30
	this.setDeltaAngle = function (freq){
		// this.dt = parseFloat(freq/60)
		this.dt = freq/60
		this.dA = (360*freq)/60
		this.case1AllPoints = []
		this.zcount =0
	}
	this.setAll = function(){
		this.radius = ampSlider.value;
		this.m = massSlider.value;
		this.k = kSlider.value;
		this.c = cSlider.value;
		this.f = freqSlider.value;
	}
	this.getX =function(){
		D = this.c/(2*Math.sqrt(this.k * this.m))
		fn = (1/(2*Math.PI)) *Math.sqrt(this.k/this.m)
		if(radiobtn1.checked){
			
			exp = Math.exp(-2*Math.PI*D*fn*this.t)
			sine = Math.sin(2*Math.PI*Math.sqrt(1-(D*D))*fn*this.t)
			return  this.centerX + (-this.radius*exp*sine) 	
		}else{
			r = this.f/fn;
			Xp = 1/this.k * (1/(Math.sqrt(Math.pow(1-Math.pow(r,2),2)+ Math.pow(2*D*r,2))))*1000
			return this.centerX +(Xp *Math.sin(toRadians(this.A)))
		}
		
	}
	this.setMaxGraphValue = function(){
		if(radiobtn1.checked){
			this.graph2Max = Math.abs(this.radius)
		}else{
			fn = (1/(2*Math.PI)) *Math.sqrt(this.k/this.m)
			r = this.f/fn;
			Xp = 1/this.k * (1/(Math.sqrt(Math.pow(1-Math.pow(r,2),2)+ Math.pow(2*D*r,2))))*1000
			this.graph2Max = Xp;
		}
	}
	this.getPhase =function(){
		
		D = this.c/(2*Math.sqrt(this.k * this.m))
		r = this.f/fn;
		fn = (1/(2*Math.PI)) *Math.sqrt(this.k*(1-(D*D))/this.m)
		ans = Math.atan((2*D*r)/(1-Math.pow(r,2)))
		if(freqSlider.Value <= fn ){
			ans =  ans * 180/Math.PI;
		}
		else{
			ans =  (Math.atan((2*D*r)/(1-Math.pow(r,2)))* 180/Math.PI) + 180
		}
		return parseFloat(ans.toFixed(4))
	}
	this.getNaturalFreq = function(){
		D = this.c/(2*Math.sqrt(this.k * this.m))
		return parseFloat( 1/(2*Math.PI) * Math.sqrt(this.k*(1-(D*D))/this.m)).toFixed(2);
	}
	this.update = function(){
		this.draw();
		this.staicRefrence();
		xBefore = this.getX();	
		this.t += this.dt;
		this.A += this.dA;
		xAfter = this.getX();
		// get Direcion
		if(xAfter <= xBefore)
			this.direction = 0
		else 
			this.direction = 1
		// graphing
		if(radiobtn2.checked)
			this.drawGraph();
		else
			this.case1data();
	}
	this.case1AllPoints=[]
	this.zcount=0
	this.case1data = function(){
		hG1 =(((this.getX()-canvas1.width/2)*(120/this.graph2Max))+canvas2.height/2)
		if(hG1 < 126 && hG1  > 123 ){
			this.zcount ++;
		}else{
			this.zcount =0;
		}
		
		if(this.zcount <500)
			this.case1AllPoints.push(hG1);
		// printing graph
		inc = Math.ceil(this.case1AllPoints.length/(canvas2.width-30))
		resetGraph(canvas2,2, this.graph2Max)
		ctx = canvas2.getContext('2d')
		ctx.beginPath();
		ctx.moveTo(50,this.case1AllPoints[0])
		x =1
		for(let i= 1 ; i < this.case1AllPoints.length; i += inc){
			ctx.lineTo(50+x,this.case1AllPoints[i])
			x++;
		}
		ctx.stroke();
		
	}

	this.draw = function(){

		let c2 = canvas1.getContext('2d');	
		// canvas 2 shm
		
		// for zigzag lines
		numberOfLines = 30
		startX = 40
		Xvalue = this.getX()
		increment = (Xvalue-25)/numberOfLines
		
			// damper line
			c2.beginPath()
			c2.moveTo(startX , canvas1.height/2 -13)
			c2.lineTo(Xvalue,canvas1.height/2 -13)
			c2.stroke();
			// damper square
		
			c2.beginPath()
			c2.rect((Xvalue -startX)/2+startX-15,canvas1.height/2 -22, 30,18)
			c2.fillStyle = "grey"
			c2.fill();

			c2.beginPath()
			c2.rect((Xvalue -startX-10)/2+startX-15,canvas1.height/2 -20, 26,14)
			c2.fillStyle = "#242352"
			c2.fill();
		if(radiobtn2.checked){
			// Arrow
			var phaseAngle = this.getPhase();
			var currentAngle = this.A % 360
			var duration = 10
			var opacity = 0
			if(currentAngle >= (phaseAngle-duration) && currentAngle <= (phaseAngle+duration)){
				opacity  =1
			}
			c2.save();
			c2.beginPath();
			title = ""+String.fromCharCode(171)
			c2.font = "50px Arial";
			//c2.fillStyle = 'rgba(36,35,82,'+ (-Math.sin(toRadians(this.A)))+')';
			c2.fillStyle = 'rgba(36,35,82,'+opacity+')';
			c2.fillText(title,this.getX()+25,130);
			c2.restore();			
		}
		
		// zigzag lines
		
		c2.beginPath()
		c2.moveTo(startX,canvas1.height/2);
		for(i =0 ; i< (numberOfLines/2) ; i++){
			startX += increment
			c2.lineTo(startX, canvas1.height/2 + 5);
			c2.stroke();
			startX += increment
			c2.lineTo(startX,canvas1.height/2 - 5)
			c2.stroke();

		}
		c2.beginPath()
		c2.rect(Xvalue, canvas1.height/2 - 20,30,30)
		c2.stroke()
		c2.fillStyle = "#EC6928"
		c2.fill()
	}
	this.graphX =50
	this.lasty = canvas2.height/2
	this.drawGraph = function(){
		inc = 3
		if(this.graphX == 50){
			this.graphX+= inc
		}
		c = canvas2.getContext('2d');
		// height
		hG1 =(((this.getX()-canvas1.width/2)*(120/this.graph2Max))+canvas2.height/2)
		c.beginPath();
		c.rect(this.graphX,hG1,-1,-1);
		c.fill();
		c.stroke();
		c.beginPath();
		c.moveTo(this.graphX-inc,this.lasty)
		c.lineTo(this.graphX,hG1)
		c.stroke();
		this.lasty = hG1;
		this.graphX+=inc
		if(this.graphX > canvas2.width){
			this.graphX = 50+inc
			//this.lasty = 125
			resetGraph(canvas2,2,this.graph2Max)
		}
	}
	this.drawGraph2 = function(){


		fn = 1/(2*Math.PI) * Math.sqrt(this.k/this.m) 
		D = this.c/(2 * Math.sqrt(this.k * this.m))
		
		g2Values = []
		max = -1

		for(f=0 ;f < 7; f+= 0.1 ){
			r = f/fn
			Xp = (1/this.k) * (1/(Math.sqrt(Math.pow((1-(r*r)),2) + Math.pow(2*D*r,2))))*1000
			g2Values.push(Xp)
			if(Xp > max)
				max = Xp;
		}
		
		console.log(g2Values);

		upperLimit = Math.ceil(max/10)
		c = canvas3.getContext('2d')
		c.clearRect(0,0,canvas3.width , canvas3.height)
		setGraphBg(canvas3 , 3,upperLimit*10)

		// Vertival line...
		xposition = (freqSlider.value*50) + 50;
		c.beginPath();
		c.moveTo(xposition,canvas3.height-30);
		c.lineTo(xposition,10);
		c.strokeStyle = "#808080";
		c.lineWidth = 2;
		c.stroke();
		c.strokeStyle = "black";
		c.lineWidth = 1;
		// rest of the graph;
		c.beginPath()
		c.moveTo(50,canvas3.height-30)
		for(i = 0 ; i < 70 ; i++){
			x = 50+(i*5)
			yVal = g2Values[i]/(upperLimit)*20
			c.lineTo(x ,canvas3.height-30-(yVal));
			
		}
		c.stroke();

		for(i = 0 ; i < 70 ; i++){
			x = 50+(i*5)
			yVal = g2Values[i]/(upperLimit)*20
			c.beginPath()
			c.rect(x ,canvas3.height-30-(yVal),2,2 )
			c.fill();
		}
		


	}

	this.drawGraph3 = function(){
		can= canvas4.getContext('2d');
		
		D = this.c/(2 * Math.sqrt(this.k * this.m))
		fn = 1/(2*Math.PI) * Math.sqrt(this.k/this.m) 
		

		g3Values = []
		max = -1;
		for(f=0 ;f < 7; f+= 0.1 ){

			r = f/fn
			test = Math.atan((-2*D*r)/(1-(r*r)))
			phase = Math.atan((2*D*r)/(1-(r*r))) * 180/ Math.PI
			if(test > 0){
				phase = phase+ 180
			}
			g3Values.push(phase)
			if(phase > max){
				max = phase
			}
		}

		upperLimit  = Math.ceil(max/10)
		c4 = canvas4.getContext('2d')
		c4.clearRect(0,0,canvas4.width , canvas4.height)
		setGraphBg(canvas4 , 4,upperLimit*10)


		can.beginPath()
		can.moveTo(50,canvas3.height-30)
		for(i=0; i < 70 ; i++){
			x= (i*5)+50 
			yVal = g3Values[i]/(upperLimit)*20
			can.lineTo(x ,canvas3.height-(yVal)-30);
		}
		can.stroke();

		for(i=0; i < 70 ; i++){
			x= (i*5)+50 
			yVal = g3Values[i]/(upperLimit)*20
			can.beginPath()
			can.rect(x ,canvas3.height-yVal-30,2,2 )
			can.fill()
		}
		// Vertival line...
		xposition = (freqSlider.value*50) + 50;
		can.beginPath();
		can.moveTo(xposition,canvas4.height-30);
		can.lineTo(xposition,10);
		can.strokeStyle = "#808080";
		can.lineWidth = 2;
		can.stroke();
		can.strokeStyle = "black";
		can.lineWidth = 1;
	}
	this.staicRefrence = function(){
		let c = canvas1.getContext('2d')
		c.fillStyle = "grey"
		// horizontal
		c.beginPath();
		c.rect(10, canvas1.height/2+12,canvas1.width-20 , 30)
		c.fill()
		// vertical
		c.beginPath();
		c.rect(10, canvas1.height/2-50,30 , 70)
		c.fill()
	}
}

function animate(){
	add()
	animation =  requestAnimationFrame(animate);
	c = canvas1.getContext('2d')
	c.clearRect(0,0, canvas1.width , canvas1.height);
	
	Box.update();
}
// Start 

pausebtn.disabled = true;
resetbtn.disabled = true;
Box = new box();
Box.setDeltaAngle(freqSlider.value);
Box.update();
setGraphBg(canvas2,2,Box.graph2Max);
setGraphBg(canvas3,3);
setGraphBg(canvas4,4);
// helping functions
// some calculations
function toDegrees (angle) {
  return angle * (180 / Math.PI);
}
function toRadians (angle) {
  return angle * (Math.PI / 180);
}
// stopwatch
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
    //update TImer
    //h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00");
}