/*!
 * chartjs-plugin-colorschemes v0.4.0
 * https://nagix.github.io/chartjs-plugin-colorschemes
 * (c) 2019 Akihiko Kusanagi
 * Released under the MIT license
 */
(function (global, factory) {
typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('chart.js')) :
typeof define === 'function' && define.amd ? define(['chart.js'], factory) :
(global = global || self, global.ChartColorSchemes = factory(global.Chart));
}(this, function (Chart) { 'use strict';

Chart = Chart && Chart.hasOwnProperty('default') ? Chart['default'] : Chart;

var
	/* New */
	Tableau10 = ['#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F', '#EDC948', '#B07AA1', '#FF9DA7', '#9C755F', '#BAB0AC'],
	Tableau20 = ['#4E79A7', '#A0CBE8', '#F28E2B', '#FFBE7D', '#59A14F', '#8CD17D', '#B6992D', '#F1CE63', '#499894', '#86BCB6', '#E15759', '#FF9D9A', '#79706E', '#BAB0AC', '#D37295', '#FABFD2', '#B07AA1', '#D4A6C8', '#9D7660', '#D7B5A6'],
	ColorBlind10 = ['#1170aa', '#fc7d0b', '#a3acb9', '#57606c', '#5fa2ce', '#c85200', '#7b848f', '#a3cce9', '#ffbc79', '#c8d0d9'];

/* https://stackoverflow.com/questions/68187576/whats-the-meaning-of-pure-in-some-javascript-source-code */
var tableau = /*#__PURE__*/Object.freeze({Tableau10: Tableau10, Tableau20: Tableau20, ColorBlind10: ColorBlind10});

var colorschemes = {
	tableau: tableau
};

var helpers = Chart.helpers;

/* Element models are always reset when hovering in Chart.js 2.7.2 or earlier */
var hoverReset = Chart.DatasetController.prototype.removeHoverStyle.length === 2;

var EXPANDO_KEY = '$colorschemes';

Chart.defaults.global.plugins.colorschemes = {
	scheme: 'tableau.ColorBlind10',
	fillAlpha: 1.0,
	reverse: false,
	override: false
};

function getScheme(scheme) {
	var colorschemes, matches, arr, category;

	if (helpers.isArray(scheme)) {
		return scheme;
	} else if (typeof scheme === 'string') {
		colorschemes = Chart.colorschemes || {};

		/* For backward compatibility */
		matches = scheme.match(/^(brewer\.\w+)([1-3])-(\d+)$/);
		if (matches) {
			scheme = matches[1] + ['One', 'Two', 'Three'][matches[2] - 1] + matches[3];
		} else if (scheme === 'office.Office2007-2010-6') {
			scheme = 'office.OfficeClassic6';
		}

		arr = scheme.split('.');
		category = colorschemes[arr[0]];
		if (category) {
			return category[arr[1]];
		}
	}
}

var ColorSchemesPlugin = {
	id: 'colorschemes',

	beforeUpdate: function(chart, options) {
		var scheme = getScheme(options.scheme);
		var fillAlpha = options.fillAlpha;
		var reverse = options.reverse;
		var override = options.override;
		var custom = options.custom;
		var schemeClone, customResult, length, colorIndex, color;

		if (scheme) {

			if (typeof custom === 'function') {
				/* clone the original scheme */
				schemeClone = scheme.slice();

				/* Execute own custom color function */
				customResult = custom(schemeClone);

				/* check if we really received a filled array; otherwise we keep and use the original scheme */
				if (helpers.isArray(customResult) && customResult.length) {
					scheme = customResult;
				} else if (helpers.isArray(schemeClone) && schemeClone.length) {
					scheme = schemeClone;
				}
			}

			length = scheme.length;

			/* Set scheme colors */
			chart.config.data.datasets.forEach(function(dataset, datasetIndex) {
				colorIndex = datasetIndex % length;
				color = scheme[reverse ? length - colorIndex - 1 : colorIndex];

				/* Object to store which color option is set */
				dataset[EXPANDO_KEY] = {};

				switch (dataset.type || chart.config.type) {
				/* For line, radar and scatter chart, borderColor and backgroundColor (50% transparent) are set */
				case 'line':
				case 'radar':
				case 'scatter':
					if (typeof dataset.backgroundColor === 'undefined' || override) {
						dataset[EXPANDO_KEY].backgroundColor = dataset.backgroundColor;
						dataset.backgroundColor = helpers.color(color).alpha(fillAlpha).rgbString();
					}
					if (typeof dataset.borderColor === 'undefined' || override) {
						dataset[EXPANDO_KEY].borderColor = dataset.borderColor;
						dataset.borderColor = color;
					}
					if (typeof dataset.pointBackgroundColor === 'undefined' || override) {
						dataset[EXPANDO_KEY].pointBackgroundColor = dataset.pointBackgroundColor;
						dataset.pointBackgroundColor = helpers.color(color).alpha(fillAlpha).rgbString();
					}
					if (typeof dataset.pointBorderColor === 'undefined' || override) {
						dataset[EXPANDO_KEY].pointBorderColor = dataset.pointBorderColor;
						dataset.pointBorderColor = color;
					}
					break;
				/* For doughnut and pie chart, backgroundColor is set to an array of colors */
				case 'doughnut':
				case 'pie':
				case 'polarArea':
					if (typeof dataset.backgroundColor === 'undefined' || override) {
						dataset[EXPANDO_KEY].backgroundColor = dataset.backgroundColor;
						dataset.backgroundColor = dataset.data.map(function(data, dataIndex) {
							colorIndex = dataIndex % length;
							return scheme[reverse ? length - colorIndex - 1 : colorIndex];
						});
					}
					break;
				/* For the other chart, only backgroundColor is set */
				default:
					if (typeof dataset.backgroundColor === 'undefined' || override) {
						dataset[EXPANDO_KEY].backgroundColor = dataset.backgroundColor;
						dataset.backgroundColor = color;
					}
					break;
				}
			});
		}
	},

	afterUpdate: function(chart) {
		/* Unset colors */
		chart.config.data.datasets.forEach(function(dataset) {
			if (dataset[EXPANDO_KEY]) {
				if (dataset[EXPANDO_KEY].hasOwnProperty('backgroundColor')) {
					dataset.backgroundColor = dataset[EXPANDO_KEY].backgroundColor;
				}
				if (dataset[EXPANDO_KEY].hasOwnProperty('borderColor')) {
					dataset.borderColor = dataset[EXPANDO_KEY].borderColor;
				}
				if (dataset[EXPANDO_KEY].hasOwnProperty('pointBackgroundColor')) {
					dataset.pointBackgroundColor = dataset[EXPANDO_KEY].pointBackgroundColor;
				}
				if (dataset[EXPANDO_KEY].hasOwnProperty('pointBorderColor')) {
					dataset.pointBorderColor = dataset[EXPANDO_KEY].pointBorderColor;
				}
				delete dataset[EXPANDO_KEY];
			}
		});
	},

	beforeEvent: function(chart, event, options) {
		if (hoverReset) {
			this.beforeUpdate(chart, options);
		}
	},

	afterEvent: function(chart) {
		if (hoverReset) {
			this.afterUpdate(chart);
		}
	}
};

Chart.plugins.register(ColorSchemesPlugin);

Chart.colorschemes = colorschemes;

return ColorSchemesPlugin;

}));
