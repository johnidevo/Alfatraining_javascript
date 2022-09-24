"use strict";


{

let unorderedList = document.querySelector("ul");
console.log(unorderedList);
let listItem = document.createElement("li");
listItem.textContent = 4;
listItem.className = "newItem";
console.log(listItem);

console.log(unorderedList.appendChild(listItem));

	

	let sDivId = 'wrapChart';
	// let o_svg = document.querySelector('svg');
	var o_svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	o_svg.setAttribute('height', '210');
	o_svg.setAttribute('width', '500');
	
	let linesVertical = document.createElement('line');
	linesVertical.setAttribute('x1', '0');
	linesVertical.setAttribute('x2', '200');
	linesVertical.setAttribute('y1', '0');
	linesVertical.setAttribute('y2', '200');
	//linesVertical.setAttribute('style', 'stroke:rgb(255,0,0);stroke-width:2');
	linesVertical.className = "newLine";
	
	o_svg.appendChild(linesVertical);
	const container = document.getElementById(sDivId);
	container.append(o_svg);
	
	console.log(container.childNodes) // NodeList [ <p> ]
	
/*
<svg height="210" width="500">
  <line x1="0" y1="0" x2="200" y2="200" style="stroke:rgb(255,0,0);stroke-width:2" />
</svg> 

	let sDivId = 'wrapChart';
	// let svg = document.createElement('svg');
	let svg = document.querySelector('svg');
	svg.setAttribute('id', 'chart');
	svg.setAttribute('height', '400');
	svg.setAttribute('width', '630');
	svg.setAttribute('style', 'background-color: beige;');
	

	// boundaries
	let linesVertical = document.createElement('line');
	let linesHorizontal = document.createElement('line');

	linesVertical.setAttribute('x1', '0');
	linesVertical.setAttribute('x2', '0');
	linesVertical.setAttribute('y1', '0');
	linesVertical.setAttribute('y2', '400');
	linesVertical.setAttribute('style', 'stroke:Red;stroke-width:2.75');

	linesHorizontal.setAttribute('x1', '0');
	linesHorizontal.setAttribute('x2', '600');
	linesHorizontal.setAttribute('y1', '600');
	linesHorizontal.setAttribute('y2', '600');
	linesHorizontal.setAttribute('style', 'stroke:Red;stroke-width:2.75');

//<line x1="0" y1="0" x2="0" y2="2600" style="stroke:Red;stroke-width:2.75" /> <!-- vertical -->
//<line x1="0" y1="2600" x2="2600" y2="2600" style="stroke:Red;stroke-width:2.75"/> <!-- orizontal -->

	svg.appendChild(linesVertical);
	svg.appendChild(linesHorizontal);

	const container = document.getElementById(sDivId);
	container.appendChild(svg);
*/
}

/*
class Chart {

  svg;

	constructor(sDivId) {
		this.svg = document.createElement('svg');
		this.svg.setAttribute('id', 'chart');
		this.svg.setAttribute('height', '400');
		this.svg.setAttribute('width', '630');
		
		// boundaries
		let linesVertical = document.createElement('line');
		let linesHorizontal = document.createElement('line');
		
		linesVertical.setAttribute('x1', '0');
		linesVertical.setAttribute('x2', '0');
		linesVertical.setAttribute('y1', '0');
		linesVertical.setAttribute('y2', '400');
		linesVertical.setAttribute('style', 'stroke:Red;stroke-width:2.75');
		
		linesHorizontal.setAttribute('x1', '0');
		linesHorizontal.setAttribute('x2', '600');
		linesHorizontal.setAttribute('y1', '600');
		linesHorizontal.setAttribute('y2', '600');
		linesHorizontal.setAttribute('style', 'stroke:Red;stroke-width:2.75');
		
//<line x1="0" y1="0" x2="0" y2="2600" style="stroke:Red;stroke-width:2.75" /> <!-- vertical -->
//<line x1="0" y1="2600" x2="2600" y2="2600" style="stroke:Red;stroke-width:2.75"/> <!-- orizontal -->

		this.svg.appendChild(linesVertical);
		this.svg.appendChild(linesHorizontal);
		
		const container = document.getElementById(sDivId);
		container.appendChild(svg);
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
	new Chart('wrapChart');
});
*/