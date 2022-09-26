'use strict';
/*
var response = {
	addPrices: function() {
		prices.state = true;
  }
};
*/
var chart = {
	svg: {},
	height: 420,
	width: 600,
	grid_gap: 30,
	constructor: function(sDivId) {
		try {
			// chart
			console.log('chart.constructor');
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

var shapes = {
	index: 0,
	index_first: false,
	time: 2, // min
	time_lock: false,
	shapes: null,
	sticks: null,
	constructor: function(list) {
		try {
			// set shapes
			console.log('shapes.constructor');
			if (!this.shapes_index(list)) throw 'shapes_index';
			return true;
		} catch (e) {
			console.error(e);
		}
  },
	get: function() {
		return this.sticks;
	},
	shapes_index: function(prices) {
		try {
			for (let i = 0; i < prices.length; i++) {
				const time = new Date(prices[i].time);
				if (!this.comparison(time)) throw 'this.comparison';
				if (!this.enclose(time)) throw 'this.enclose';
				if (!this.setup(prices[i])) throw 'this.setup';
				if (!this.structure()) throw 'this.structure';
			}
			console.log(this.sticks);
			return true;
		} catch (e) {
			console.error(e);
		}
  },
	structure: function() {
		if (this.shapes[this.index] == undefined) return true;
		let closeoutAsk = this.shapes[this.index].map((x) => x['closeoutAsk']);
		if (!Array.isArray(this.sticks)) this.sticks = new Array();
		if (this.sticks[this.index.getTime()] == undefined) this.sticks[this.index.getTime()] = new Array();
		this.sticks[this.index.getTime()] = [
			Math.min(...closeoutAsk), 
			Math.max(...closeoutAsk),
			closeoutAsk.shift(0),
			closeoutAsk.pop()
		];
		return true;
  },
	setup: function(price) {
		
		if (!Array.isArray(this.shapes)) this.shapes = new Array();
		if (this.time_lock !== true) return true;
		if (!Array.isArray(this.shapes[this.index])) this.shapes[this.index] = new Array();
		this.shapes[this.index].push(price);
		return true;
  },
	enclose: function(time) {
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
	constructor: function(list) {
		try {
			// set sticks
			console.log('sticks.constructor');
			if (!this.price_scale(list)) throw 'sticks.price_scale';
			return true;
		} catch (e) {
			console.error(e);
		}
  },
	index: function(prices) {
		console.log(this.chart.svg);
		return true;
  },
	price_scale: function(list) {
		//if (this.scale !== null) return true;
		
		console.log(list);
		console.log(list['1659425100705']);
		console.log(list[1659425100705]);
		//console.log(list.pop());
		console.log(list.length);
		console.log(Array.prototype.pop.call(list));
		
		return true;
  },
	ratio: function() {
		
/*
  {
    if (empty($this->aaView)) return false; 
    $i = 0;
    foreach ($this->aaView as $aPrice)
    {
      $fPriceAsk = explode(".", $aPrice['closeoutAsk']);
      $fPriceBid = explode(".", $aPrice['closeoutBid']);
  
      if (count($fPriceAsk) > 1)
      {
        $iScaleAsk = strlen($fPriceAsk[1]); #zeros
        $iScaleBid = strlen($fPriceBid[1]); #zeros
      }
      else {
        $iScaleAsk = 0;
        $iScaleBid = 0;
      }

      $this->iScale = max(array($iScaleAsk, $iScaleBid));
      if ($i++ == 5) break;
    }

    return true;
  }
	
  {
    bcscale($this->iScale);
    $sPrice = floatval(number_format($sPrice, $this->iScale, '.', ''));
    if ($sPrice === 0) return 1;

    if (!empty($sPrice)) {
      return bcmul(bcsub($sPrice, $this->fMinPrice, $this->iScale), $this->fRatio, $this->iScale);
    }

    $aaPrices = $this->aaView;
    $aColumns = array_map(function($k) use ($aaPrices) {
      return array_column($aaPrices, $k);
    }, array('closeoutAsk','closeoutBid'));

    list($closeoutAsk, $closeoutBid) = $aColumns;
    $maxPrice = max($closeoutAsk);
    $minPrice = min($closeoutBid);
    
    $pSmallC = -1000;
    $pLargeD = 1000;

    $difPrice = bcsub($maxPrice, $minPrice);
    $difChart = bcsub($pLargeD, $pSmallC);
    #if ($difPrice == 0) $difPrice = $minPrice;
    $fRation = bcdiv($difChart, $difPrice);
    $this->fRatio = ($fRation != 0 ? $fRation: 0.2);
    $this->fMinPrice = $minPrice;
    bcscale(0); # reset
    return 1;
  }
*/
	}
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


