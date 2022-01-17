function clickButton(event) {
	let header = document.getElementById("header");
	let color = "#";
	const letters = "0123456789ABCDEF";
	for(let i=0;i<6;i++) {
		let temp = Math.floor(Math.random()*16);
		color = color + letters[temp];
	}
	header.style.color = color;
	console.log(color);
}

function arrays() {
	const array1 = ["Banana","Apple","Mango"];
	console.log(array1);
	
	const array2 = ["Beer","Bread","Candy"];
	
	const array3 = array1.concat(array2);	
	console.log(array3.toString());
	
	//array1 = ["Banaani","Omena","Mango"] will fail. Cannot redeclare a const
	array1[0] = "Banaani"

	console.log(array1.toString());
	
	array1.splice(1,1);
	
	console.log(array1.toString());
	
	array4 = array2.filter(item => item.startsWith("B"))
	
	console.log(array4.toString());
	
	const numArray = [5,10,20];
	
	const numArray2 = numArray.map(item => item*2)
	
	console.log(numArray2.toString());
}