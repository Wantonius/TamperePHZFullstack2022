function start() {
	console.log("-----------------");
	console.log("Simple sum currying");
	console.log(sum(2)(4));
	console.log(sum(2));
	
	console.log("-----------------");
	console.log("Synchronous function");
	console.log(timer(syncFunc)(200));
	console.log("------------------");
	console.log("Async Function");
	console.log(timer(asyncFunc)(400).then(response => console.log(response)));
}

const sum = x => y => x+y

const timer = (timerFunc) => (...args) => {
	const start = Date.now();
	const value = timerFunc(...args);
	if(value && typeof value.then === "function") {
		return value.then(value => ({timespan:Date.now()-start,value}))
	} else {
		return {timespan:Date.now()-start,value}
	}
}

const syncFunc = x => x*2;

const asyncFunc = x => new Promise(resolve => {
	setTimeout(() => {
		console.log("Timer done!");
		return resolve(x*2);
	},5000)
})