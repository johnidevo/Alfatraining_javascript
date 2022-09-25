'use strict';
/*
var response = {
	addPrices: function() {
		prices.state = true;
  }
};
*/
var chart = {
	height: '',
	width: '',
	grid_gap: '',
	constructor: function(sDivId) {
		try {
			// chart
			console.log('chart.constructor');
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
			gridHorizontal.setAttributeNS(null, 'stroke', 'LightGray');
			this.svg.appendChild(gridHorizontal);
		}
		// grid vertical
		for (let i = 0; i < (this.height / this.grid_gap); i++) {
			let gridVertical = document.createElementNS(this.xmlns, 'line');
			gridVertical.setAttributeNS(null, 'x1', 0);
			gridVertical.setAttributeNS(null, 'y1', this.grid_gap * i);
			gridVertical.setAttributeNS(null, 'x2', this.width);
			gridVertical.setAttributeNS(null, 'y2', this.grid_gap * i);
			gridVertical.setAttributeNS(null, 'stroke', 'LightGray');
			this.svg.appendChild(gridVertical);
		}
		return true;
	}
};

var prices = {
	xhr: {},
	list: {},
	prices_event: function() {
		return new CustomEvent('PricesLoaded');
	},
	constructor: function(sDivId) {
		try {
			// get data
			console.log('prices.constructor');
			if (!this.prices_xhr()) throw 'prices_xhr';
			if (!this.prices_get()) throw 'prices_get';
			return true;
		} catch (e) {
			console.error(e);
		}
  },
	get: function() {
		return this.list;
	},
	prices_set: function(prices) {
		this.list = prices;
		return true;
	},
	prices_xhr: function () {
		if (window.XMLHttpRequest) {
			// moderner Browser - IE ab version 7
			this.xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			// IE 6
			this.xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		return true;
	},
	prices_load: function(event) {
		if (event.target.status !== 200) return console.log(event.target.status);
		if (event.target.readyState !== 4) return console.log(event.target.readyState);
		if (!window.prices.prices_set(event.target.response)) throw 'prices_set'; 
		document.dispatchEvent(window.prices.prices_event());
		console.log('Laden der Daten abgeschlossen');
	},
	prices_progress: function(event) {
		//console.log('Received '+ event.loaded +' of ' + event.total + ' bytes');
		//this.list = event.target.response;
		//if (event.loaded == event.total) {}
		//console.log('Fortschritt beim Laden der Daten');
	},
	prices_error: function(event) {
		console.error(event);
		throw 'Fehler beim Laden der Daten aufgetretn';
	},
	prices_timeout: function(event) {
		console.error(event);
		throw 'Timeout beim Laden der Daten aufgetreten';
	},
	prices_get: function() {
		this.xhr.open('POST', 'script.php', true);
		this.xhr.responseType = 'json';
		this.xhr.send();
		this.xhr.addEventListener('load', this.prices_load);
		this.xhr.addEventListener('progress', this.prices_progress);
		this.xhr.addEventListener('error', this.prices_error);
		this.xhr.addEventListener('timeout', this.prices_timeout);
		return true;
  }
};

var sticks = {
	lock: false,
	index: 0,
	constructor: function(list) {
		try {
			// set sticks
			console.log('sticks.constructor');
			if (!this.sticks_index(list)) throw 'sticks_index';
			return true;
		} catch (e) {
			console.error(e);
		}
  },
	sticks_index: function(prices) {
		console.log('sticks_index');
		
/*
All time high
all time low
*/

/*
// new Date(Jahr, Monat[, Tag[, Stunde[, Minute[, Sekunde[, Millisekunde]]]]])
console.log(new Date(2022, 2, 24, 3, 26, 15));

closeoutAsk: "101.693"
closeoutBid: "101.672"
instrument: "CAD_JPY"
time: "2022-08-02T07:23:23.943347085Z"
*/
		
		console.log(prices.length);
		
		let oldDate = new Date();
		for (let i = 0; i < prices.length; i++) {
			
			const time = new Date(prices[i].time);
			
			if (!this.comparison(time, oldDate)) throw 'this.comparison';
			//if (!this.enclose(time, oldDate)) throw 'this.comparison';
		}
		return true;
  },
	comparison: function(time, indexDate) {
		indexDate.setFullYear(time.getFullYear());
		indexDate.setMonth(time.getMonth());
		indexDate.setDate(time.getDate());
		indexDate.setHours(time.getHours());
		indexDate.setMinutes(time.getMinutes());
		indexDate.setSeconds(0);

		let newDate = new Date();
		newDate.setFullYear(time.getFullYear());
		newDate.setMonth(time.getMonth());
		newDate.setDate(time.getDate());
		newDate.setHours(time.getHours());
		newDate.setMinutes(time.getMinutes());
		newDate.setSeconds(0);
		
		
		console.log(['index', this.index, 'indexDate', indexDate, 'newDate', newDate]);
		
		if (this.index == 0) this.index = indexDate;
		if (indexDate.getTime() !== newDate.getTime()) this.index = indexDate;
		
		//if (!this.lock) this.lock = true;
		
		return true;
  },
	enclose: function(time, indexDate) {
		

		
		return true;
  }
};

function init(value = false) {
	try {
		if (!value) if (!chart.constructor('wrapChart')) throw 'chart.constructor';
		if (!value) if (!prices.constructor()) throw 'prices.constructor';
		if (value) if (!sticks.constructor(prices.get())) throw 'sticks.constructor';
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}

document.addEventListener('DOMContentLoaded', () => init(false));
document.addEventListener('PricesLoaded', () => init(true));
