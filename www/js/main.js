"use strict";

var prices = {
	xhr: {},
	constructor: function(sDivId) {
		try {
			// get data
			if (!this.xhr_set()) throw 'xhr_set';
			if (!this.prices_get()) throw 'prices_get';
			return true;
		} catch (e) {
			console.error(e);
		}
  },
	xhr_set: function () {
		if (window.XMLHttpRequest) {
			// moderner Browser - IE ab version 7
			this.xhr = new XMLHttpRequest();
		} else if (window.ActiveXObject) {
			// IE 6
			this.xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return true;
	},
	prices_get: function() {
		
console.log( this.xhr );
		this.xhr.open("POST", "script.php");
		this.xhr.responseType = "json";
		this.xhr.send();
		
    this.xhr.onload = function() {
        if (xhr.status !=200) {
            container.textContent = "Ooops";
            return;
        }
console.log('xhr.responseText');
console.log(xhr.responseText);
        // Antwort liegt als String vor
        // Zugriff auf Links erfolgt über Eigenschaft responseText
        // Snippet wird als DOM-String an Container übergeben
        container.innerHTML = xhr.responseText;
    };
		
		this.xhr.addEventListener("load", function(xhr) {
			if(xhr.target.status != 200) throw xhr.target.status;
			console.log(xhr.responseText);
			console.log("Laden der Daten abgeschlossen");
		});

		this.xhr.addEventListener("progress", function() {
			console.log("Fortschritt beim Laden der Daten");
		});

		this.xhr.addEventListener("abort", function() {
			console.log("Laden der Daten abgebrochen");
		});

		this.xhr.addEventListener("error", function() {
			throw "Fehler beim Laden der Daten aufgetretn";
		});

		this.xhr.addEventListener("timeout", function() {
			throw "Timeout beim Laden der Daten aufgetreten";
		});
		return true;
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
		
		borderVertical.setAttributeNS(null, 'x1', '0');
		borderVertical.setAttributeNS(null, 'x2', '0');
		borderVertical.setAttributeNS(null, 'y1', '0');
		borderVertical.setAttributeNS(null, 'y2', this.height);
		borderVertical.setAttributeNS(null, 'stroke', 'Red');
		borderVertical.setAttributeNS(null, 'stroke-widt', '2.75');
		
		linesHorizontal.setAttributeNS(null, 'x1', '0');
		linesHorizontal.setAttributeNS(null, 'x2', this.width);
		linesHorizontal.setAttributeNS(null, 'y1', this.height);
		linesHorizontal.setAttributeNS(null, 'y2', this.height);
		linesHorizontal.setAttributeNS(null, 'stroke', 'Red');
		
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

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');
	if (!chart.constructor('wrapChart')) throw 'chart.constructor';
	if (!prices.constructor()) throw 'prices.constructor';
});
