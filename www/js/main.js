'use strict';

var response = {
	addPrices: function() {
		prices.state = true;
  }
};
	
var chart = {
	height: '',
	width: '',
	grid_gap: '',
	constructor: function(sDivId) {
		try {
			// chart
			if (!this.chart_setup()) throw 'chart_setup';
			if (!this.chart_stage()) throw 'chart_stage';
			if (!this.chart_limits()) throw 'chart_limits';
			if (!this.chart_grid()) throw 'chart_grid';
			document.getElementById(sDivId).appendChild(this.svg);
			return true;
		} catch (e) {
			console.error(e);
		}
  },
	chart_setup: function() {
		this.height = 420;
		this.width = 600;
		this.grid_gap = 30;
		return true;
  },
	chart_stage: function() {
		this.xmlns = 'http://www.w3.org/2000/svg';
		this.svg = document.createElementNS(this.xmlns, 'svg');
		this.svg.setAttributeNS(null, 'id', 'chart');
		this.svg.setAttributeNS(null, 'height', this.height);
		this.svg.setAttributeNS(null, 'width', this.width);
		return true;
  },
	chart_limits: function() {
		// limits
		let borderVertical = document.createElementNS(this.xmlns, 'line');
		let linesHorizontal = document.createElementNS(this.xmlns, 'line');
		// Vertical
		borderVertical.setAttributeNS(null, 'x1', '0');
		borderVertical.setAttributeNS(null, 'x2', '0');
		borderVertical.setAttributeNS(null, 'y1', '0');
		borderVertical.setAttributeNS(null, 'y2', this.height);
		borderVertical.setAttributeNS(null, 'stroke', 'Red');
		borderVertical.setAttributeNS(null, 'stroke-widt', '2.75');
		// Horizontal
		linesHorizontal.setAttributeNS(null, 'x1', '0');
		linesHorizontal.setAttributeNS(null, 'x2', this.width);
		linesHorizontal.setAttributeNS(null, 'y1', this.height);
		linesHorizontal.setAttributeNS(null, 'y2', this.height);
		linesHorizontal.setAttributeNS(null, 'stroke', 'Red');
		// append
		this.svg.appendChild(borderVertical);
		this.svg.appendChild(linesHorizontal);
		
		return true;
	},
	chart_grid: function() {
		// grid horizontal
		for (let i = 0; i < (this.width / this.grid_gap); i++) {
			let gridHorizontal = document.createElementNS(this.xmlns, 'line');
			gridHorizontal.setAttributeNS(null, 'x1', this.grid_gap * i);
			gridHorizontal.setAttributeNS(null, 'y1', 0);
			gridHorizontal.setAttributeNS(null, 'x2', this.grid_gap * i);
			gridHorizontal.setAttributeNS(null, 'y2', this.height);
			gridHorizontal.setAttributeNS(null, 'stroke', 'Gray');
			this.svg.appendChild(gridHorizontal);
		}
		// grid vertical
		for (let i = 0; i < (this.height / this.grid_gap); i++) {
			let gridVertical = document.createElementNS(this.xmlns, 'line');
			gridVertical.setAttributeNS(null, 'x1', 0);
			gridVertical.setAttributeNS(null, 'y1', this.grid_gap * i);
			gridVertical.setAttributeNS(null, 'x2', this.width);
			gridVertical.setAttributeNS(null, 'y2', this.grid_gap * i);
			gridVertical.setAttributeNS(null, 'stroke', 'Gray');
			this.svg.appendChild(gridVertical);
		}
		return true;
	}
};

var prices = {
	state: false,
	xhr: '',
	list: '',
	constructor: function(sDivId) {
		try {
			// get data
			console.log('constructor');
			this.state = false;
			if (!this.prices_xhr()) throw 'prices_xhr';
			if (!this.prices_get()) throw 'prices_get';
			if (!this.prices_set()) throw 'prices_set'; 
			//return this.list;
			return true;
		} catch (e) {
			console.error(e);
		}
  },
	get_list: function() {
		console.log('get');
		console.log(this.list);
		return this.list;
	},
	prices_set: function() {
		console.log('set');
		console.log('this.xhr');
		console.log(this.xhr);
		
const promise1 = Promise.resolve(this.xhr);
		
promise1.then((value) => {
console.log(value);
// expected output: 123
});
		
		this.list = this.xhr;
			console.log('this.list');
			console.log(this.list);
		return true;
	},
	prices_xhr: function () {
		console.log('prices_xhr');
		if (window.XMLHttpRequest) {
			// moderner Browser - IE ab version 7
			this.xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			// IE 6
			this.xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		return true;
	},
	prices_state: function(event) {
		//console.log('response.liste');
		//console.log(response.liste);
		//console.log(this.readyState);
		//console.log('State change');
		if (this.readyState === 4) {
			//console.log(event.target.response);
			//this.set(event.target.response);
			response.addPrices();
			//console.log(['response', response.liste])
		} 
	},
	prices_load: function(event) {
		if (event.target.status != 200) throw event.target.status;
		//if (event.xmlhttp.readyState == 4) throw event.target.status;
	//console.log(this);
		//this.list = event.target.response;
		
		//response.addPrices(event.target.response);
		//console.log(this.list);
		console.log('Laden der Daten abgeschlossen');
	},
	prices_progress: function(event) {
		//console.log('Received '+ event.loaded +' of ' + event.total + ' bytes');
		//this.list = event.target.response;
		//if (event.loaded == event.total) {}
		//console.log('Fortschritt beim Laden der Daten');
	},
	prices_abort: function(event) {
		console.log('Laden der Daten abgebrochen');
	},
	prices_error: function(event) {
		throw 'Fehler beim Laden der Daten aufgetretn';
	},
	prices_timeout: function(event) {
		throw 'Timeout beim Laden der Daten aufgetreten';
	},
	prices_get: function() {
		console.log('prices_get');
		this.xhr.open('POST', 'script.php', true);
		this.xhr.responseType = 'json';
		this.xhr.send();
/*
this.xhr.onreadystatechange = function() {
	console.log(this.xhr);

	if (this.xhr.readyState != 4) return;
	if (this.xhr.status != 200) return;
	// Daten liegen vollständig vor und können verarbeitet werden

	console.log('this.xhr.target.response');
	console.log(this.xhr.target.response);
};
*/
		this.xhr.addEventListener('readystatechange', this.prices_state);
		this.xhr.addEventListener('load', this.prices_load);
		this.xhr.addEventListener('progress', this.prices_progress);
		this.xhr.addEventListener('abort', this.prices_abort);
		this.xhr.addEventListener('error', this.prices_error);
		this.xhr.addEventListener('timeout', this.prices_timeout);
		return true;
  }
};

document.addEventListener('DOMContentLoaded', async () => {
  console.log('DOM fully loaded and parsed');
	if (!chart.constructor('wrapChart')) throw 'chart.constructor';
	//console.log(prices.constructor());
	if (!prices.constructor()) throw 'prices.constructor'; 

	if (!prices.constructor()) throw 'prices.constructor'; 
	

	
});
//console.log(prices.get());