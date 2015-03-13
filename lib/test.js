/*global global:true */
// Dependencies
var GitStats = require("git-stats");
var Moment = require("moment");
var _ = require("lodash");
var fs = require("fs");
var path = require("path");

// Configurations
Moment.suppressDeprecationWarnings = true;

var options = {};
if (process.argv.length !== 2) {
	if (process.argv[2]) {
		options.start = Moment(process.argv[2]);

	}

	if (process.argv[3]) {
		options.end = Moment(process.argv[3]);
	}
}

if (!options.start || !options.start.isValid()) {
	options.start = Moment().subtract(1, "years");
}

if (!options.end || !options.end.isValid()) {
	options.end = Moment();
}

var jsdom = require('jsdom');
var htmlStub = '<html><head></head><body><div id="dataviz-container"></div><script src="js/d3.v3.min.js"></script></body></html>';

//global.Element = function() {
//};

GitStats.calendar(options, function(err, calendar) {
	var data = {};
	for ( var p in calendar.days) {
		data[Moment(p).unix()] = calendar.days[p].level;
	}
	jsdom.env({
		features : {
			QuerySelector : true
		},
		html : htmlStub,
		done : function(errors, window) {
			//_.extend(global, window);
			global.Element = window.Element;
			global.document = window.document;

			var CalHeatMap = require("./CalHeatMap");
			var cal = new CalHeatMap();
			var keys = Object.keys(data);
			var start = new Date(parseInt(keys[0] + "000", 10));
			var end = new Date(parseInt(keys[keys.length - 1] + "000", 10));
			var node = window.document.querySelector('#dataviz-container');
			cal.init({
				animationDuration : 0,
				itemSelector : node,
				start : start,
				end : end,
				data : data,
				domain : "month",
				range : 13,
				legend : [
					0,
					1,
					2,
					3
				],
				considerMissingDataAsZero : true
			});
			var html = fs.readFileSync(path.join(__dirname, "page.html"), "utf8");
			var compiled = _.template(html);
			console.log(compiled({
				style : fs.readFileSync(path.join(__dirname, "style.css"), "utf8"),
				body : node.innerHTML
			}));
		}
	});
});