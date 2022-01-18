window.onload = function() {
	let fontSizer = changeFont();
	let bigbutton = document.getElementById("bigger");
	bigbutton.onclick = fontSizer.bigger;
	let smallbutton = document.getElementById("smaller");
	smallbutton.onclick = fontSizer.smaller;
}

let makeCounter = function() {
	let privateCounter = 0;
	
	function changeBy(val) {
		privateCounter += val;
	}
	return {
		increment: function() {
			changeBy(1);
		},
		decrement: function() {
			changeBy(-1);
		},
		value:function() {
			return privateCounter;
		}
	}
}

let changeFont = function() {
	let fontSize = 16;
	document.body.style.fontSize = fontSize+"px";
	function changeFontSize(val) {
		fontSize += val;
		document.body.style.fontSize = fontSize+"px";
	}
	return {
		bigger:function() {
			console.log("bigger font");
			changeFontSize(2);
		},
		smaller:function() {
			console.log("smaller font");
			changeFontSize(-2);
		}
	}
}

function start() {
	let counter1 = makeCounter();
	let counter2 = makeCounter();
	
	console.log("Counter 1",counter1.value());
	
	counter1.increment();
	counter1.increment();
	console.log("Counter 1",counter1.value());

	counter1.decrement();
	console.log("Counter 1",counter1.value());
	console.log("Counter 2",counter2.value());
}