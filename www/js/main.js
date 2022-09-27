'use strict';

var chart = {
	svg: {},
	height: 890,
	width: 1240,
	grid_gap: 60,
	constructor: function(sDivId) {
		try {
			// chart
			if (!this.chart_stage()) throw 'chart_stage';
			if (!this.chart_limits()) throw 'chart_limits';
			if (!this.chart_grid()) throw 'chart_grid';
			document.getElementById(sDivId).appendChild(this.svg);
			return true;
		} catch (e) {
			console.error(e);
		}
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
		let groupLimits = document.createElementNS(this.xmlns, 'g');
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
		groupLimits.appendChild(borderVertical);
		groupLimits.appendChild(linesHorizontal);
		this.svg.appendChild(groupLimits);
		return true;
	},
	chart_grid: function() {
		let groupGrid = document.createElementNS(this.xmlns, 'g');
		// grid
		let gridHorizontal = document.createElementNS(this.xmlns, 'line');
		let gridVertical = document.createElementNS(this.xmlns, 'line');
		// grid horizontal
		for (let i = 0; i < (this.width / this.grid_gap); i++) {
			gridHorizontal.setAttributeNS(null, 'x1', this.grid_gap * i);
			gridHorizontal.setAttributeNS(null, 'y1', 0);
			gridHorizontal.setAttributeNS(null, 'x2', this.grid_gap * i);
			gridHorizontal.setAttributeNS(null, 'y2', this.height);
			gridHorizontal.setAttributeNS(null, 'stroke', 'LightGray');
			this.svg.appendChild(gridHorizontal);
		}
		// grid vertical
		for (let i = 0; i < (this.height / this.grid_gap); i++) {
			gridVertical.setAttributeNS(null, 'x1', 0);
			gridVertical.setAttributeNS(null, 'y1', this.grid_gap * i);
			gridVertical.setAttributeNS(null, 'x2', this.width);
			gridVertical.setAttributeNS(null, 'y2', this.grid_gap * i);
			gridVertical.setAttributeNS(null, 'stroke', 'LightGray');
			this.svg.appendChild(gridVertical);
		}
		//append
		groupGrid.appendChild(gridHorizontal);
		groupGrid.appendChild(gridVertical);
		this.svg.appendChild(groupGrid);
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

var shapes = {
	index: 0,
	index_first: false,
	time: 2, // min
	time_lock: false,
	shapes: null,
	shapes_key: 0,
	shapes_lestest: null,
	sticks: null,
	lestest: null,
	key: 0,
	prices: [],
	debug: 0,
	constructor: function(prices) {
		try {
			// set shapes
			for (let i = 0; i < prices.length; i++) {
				const time = new Date(prices[i].time);
				if (!this.comparison(time)) throw 'this.comparison';
				if (!this.enclose(time)) throw 'this.enclose';
				if (!this.setup(prices[i])) throw 'this.setup';
				if (!this.structure()) throw 'this.structure';
			}
			return true;
		} catch (e) {
			console.error(e);
		}
  },
	get: function() {
		return this.sticks;
	},
	structure: function() {
		if (this.shapes[this.shapes_key] == undefined) return true;
		if (this.lestest !== this.index.getTime()) this.key = this.key + 1;
		this.lestest = this.index.getTime();
		let closeoutAsk = this.shapes[this.shapes_key].map(function(value) {return value.closeoutAsk;});
		if (this.sticks == null) this.sticks = Object.create({});
		if (this.sticks[this.key] == undefined) this.sticks[this.key] = new Array();
		let stick = new Array(
			Math.min(...closeoutAsk).toString(), 
			Math.max(...closeoutAsk).toString(),
			closeoutAsk[0],
			closeoutAsk[closeoutAsk.length - 1]
		);
		this.sticks[this.key] = stick;
		return true;
  },
	setup: function(price) {
		if (this.shapes_lestest !== this.index.getTime()) this.shapes_key = this.shapes_key + 1;
		this.shapes_lestest = this.index.getTime();
		if (this.shapes == null) this.shapes = Object.create({});
		//if (this.time_lock !== true) return true; //enclose(); disabled for moment
		if (this.shapes[this.shapes_key] == undefined) this.shapes[this.shapes_key] = new Array();
		this.shapes[this.shapes_key].push(price);
		return true;
  },
	enclose: function(time) { // start from fix minute/ ex: 11:11:11 => 11:12:00 for 2min or 11:15:00 for 5 min, etc.
		let minute = time.getMinutes();
		if (minute % this.time === 0) this.time_lock = true;
		else this.time_lock = false; 
		return true;
  },
	comparison: function(time) {
		if (this.index_first == false) this.index = time;
		let indexDate = new Date();
		indexDate.setFullYear(this.index.getFullYear());
		indexDate.setMonth(this.index.getMonth());
		indexDate.setDate(this.index.getDate());
		indexDate.setHours(this.index.getHours());
		indexDate.setMinutes(this.index.getMinutes() + this.time);
		indexDate.setSeconds(0);
		let newDate = new Date();
		newDate.setFullYear(time.getFullYear());
		newDate.setMonth(time.getMonth());
		newDate.setDate(time.getDate());
		newDate.setHours(time.getHours());
		newDate.setMinutes(time.getMinutes());
		newDate.setSeconds(0);
		if (this.index_first == false) this.index = indexDate;
		if (this.index_first == false) this.index_first = true;
		if (indexDate.getTime() < newDate.getTime()) this.index = indexDate;
		return true;
  }
};

var sticks = {
	chart: window.chart,
	scale: null,
	ratio: null,
	min: null,
	sticks: null,
	xmlns: '',
	width: 12,
	svg: null,
	gap: 10,
	constructor: function(list) {
		try {
			// set sticks
			this.xmlns = 'http://www.w3.org/2000/svg';
			this.svg = window.chart.svg;
			
			if (!this.sticks_scale(list)) throw 'sticks.sticks_scale';
			if (!this.sticks_ratio(list)) throw 'sticks.sticks_ratio';
			if (!this.sticks_architecture(list)) throw 'sticks.sticks_architecture';
			if (!this.sticks_view()) throw 'sticks.sticks_view';
			console.log(this.sticks);
			return true;
		} catch (e) {
			console.error(e);
		}
  },
	sticks_chart: function(chart) {
		console.log(chart);
/*
% if price.chart_open > price.chart_close %}
<!-- bullish -->
height="{{ price.chart_open - price.chart_close }}"

{% elseif price.chart_open < price.chart_close %}
<!-- bearish -->
height="{{ price.chart_close - price.chart_open }}"
*/

		console.log([
			chart.get('open') > chart.get('close'),
			chart.get('open') < chart.get('close'),
			
		]);
		
		if (chart.get('open') > chart.get('close')) {
			// bullish
			let candlestick = document.createElementNS(this.xmlns, 'rect');
			candlestick.setAttributeNS(null, 'x', this.gap);
			candlestick.setAttributeNS(null, 'y', chart.get('open'));
			candlestick.setAttributeNS(null, 'width', this.width);
			candlestick.setAttributeNS(null, 'height', (chart.get('open') - chart.get('close')) );
			candlestick.setAttributeNS(null, 'fill', 'Green');

		}
		else if (chart.get('open') < chart.get('close')) {
			// bearisch
			let candlestick = document.createElementNS(this.xmlns, 'rect');
			candlestick.setAttributeNS(null, 'x', this.gap);
			candlestick.setAttributeNS(null, 'y', chart.get('open'));
			candlestick.setAttributeNS(null, 'width', this.width);
			candlestick.setAttributeNS(null, 'height', (chart.get('close') - chart.get('open')) );
			candlestick.setAttributeNS(null, 'fill', 'Red');
		}

		this.gap = this.gap + 20;
		console.log(this.gap);

/*
		rect.setAttributeNS( null,'x',x );
		rect.setAttributeNS( null,'y',y );
		rect.setAttributeNS( null,'width','50' );
		rect.setAttributeNS( null,'height','50' );
		rect.setAttributeNS( null,'fill','#'+Math.round( 0xffffff * Math.random()).toString(16) );
		document.getElementById( 'svgOne' ).appendChild( rect );
*/
/*
<rect 
	x="{{ xx1 - 6}}"
	y="{{ 2555 - price.chart_open }}" 
	width="12" 
	height="{{ price.chart_open - price.chart_close }}"
	style="fill:none;stroke:DodgerBlue;stroke-width:1;" {# fill:DodgerBlue; - Red - DodgerBlue #}
	opacity="1"
/>
*/
		
		// append
		this.svg.appendChild(candlestick);
		return true;
  },
	sticks_view: function() {
		for (const [key, value] of Object.entries(this.sticks)) {		
			this.sticks_chart(value);
			// <rect x="120" width="100" height="100" rx="15" />
		}
		
		return true;
  },
	sticks_architecture: function(prices) {
		if (this.sticks == null) this.sticks = Object.create({});
		let len = Object.keys(prices).length;
		let i = 0;
		let keys = ['min', 'max', 'open', 'close'];
		for (const [key, value] of Object.entries(prices)) {
			for (let j = 0; j < value.length; j++) {
				if (this.sticks[i] == undefined) this.sticks[i] = new Map();
				this.sticks[i].set(keys[j], this.price_ratio(value[j]));
			}
			i = i + 1;
		}
		return true;
  },
	price_ratio: function(price) {
		let diff = Number(price) - Number(this.min);
		return Number(diff) * Number(this.ratio);
  },
	sticks_scale: function(list) { 
		if (this.scale !== null) return true;
		let prices = new Array(list[1], list[Object.keys(list).length]);
		for (let i = 0; i < prices.length; i++) {
			for (let j = 0; j < prices[i].length; j++) {
				let len = prices[i][j].split('.')[1].length;
				if (this.scale < len) this.scale = len;
			}
		}
		return true;
  },
	sticks_ratio: function(prices) {
		if (this.ratio !== null) return true;
		let allPrices = [];
		let len = Object.keys(prices).length;
		for (const [key, value] of Object.entries(prices)) {
			for (let j = 0; j < value.length; j++) allPrices.push(value[j]);
		}
		let minPrice = Math.min(...allPrices);
		let maxPrice = Math.max(...allPrices);
		let chartMin = -890; //window.chart.height
		let chartMax = +890;
		let difPrice = Number(maxPrice) - Number(minPrice);
		let difChart = Number(chartMax) - Number(chartMin);
		this.ratio = Number(difChart) / Number(difPrice);
		this.min = minPrice;
		return true;
	},
};


function init(value = false) {
	try {
		if (!value) if (!chart.constructor('wrapChart')) throw 'chart.constructor';
		if (!value) if (!prices.constructor()) throw 'prices.constructor';
		if (value) if (!shapes.constructor(prices.get())) throw 'shapes.constructor';
		if (value) if (!sticks.constructor(shapes.get())) throw 'sticks.constructor';
		return true;
	} catch (e) {
		console.error(e);
		return false;
	}
}

document.addEventListener('DOMContentLoaded', () => init(false));
document.addEventListener('PricesLoaded', () => init(true));






