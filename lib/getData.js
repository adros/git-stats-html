var GitStats = require("git-stats");
var Moment = require("moment");
var _ = require("lodash");

// Configurations
Moment.suppressDeprecationWarnings = true;

// same options parsing like git-stats bin
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

GitStats.calendar(options, function(err, data) {
	console.log(JSON.stringify(_.mapValues(data.days, "c"), null, "\t"));
});