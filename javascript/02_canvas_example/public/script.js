var canvas;
var ctx;
var running = 0;
var interval;

window.onload = function() {
	canvas = document.getElementById("mycanvas");
	ctx = canvas.getContext("2d");
	console.log(Math.random()*16)
	console.log(Math.random)
}

function startCanvas() {
	if(running) {
		running = 0;
		clearInterval(interval);
	} else {
		running = 1;
		interval = setInterval(createRect,200);
	}
}

function createRect() {
	let x = 0;
	let y = 0;
	let side = 0;
	let color = "#";
	const colorpicker = "0123456789ABCDEF";
	x = Math.floor(Math.random()*400)+1;
	y = Math.floor(Math.random()*400)+1;
	side = Math.floor((Math.random()*80)+20);
	for(let i = 0;i<6;i++) {
		let temp = Math.floor(Math.random()*16);
		color = color + colorpicker[temp];
	}
	ctx.fillStyle = color;
	ctx.fillRect(x,y,side,side);

}

function clearCanvas() {
	ctx.clearRect(0,0,500,500);
}

function canvasMouseMove(event) {
	let mousePos = getMousePos(event);
	let message = "Mouse position:"+mousePos.x+","+mousePos.y
	writeMessage(message);
}

function getMousePos(event) {
	let rect = canvas.getBoundingClientRect();
	let tempX = Math.floor(event.clientX - rect.left);
	let tempY = Math.floor(event.clientY - rect.top);
	return {
		x:tempX,
		y:tempY
	}
}

function writeMessage(message) {
	clearCanvas();
	ctx.font = "18pt Arial";
	ctx.fillStyle = "black";
	ctx.fillText(message,10,25);
}