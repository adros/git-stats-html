var spawn = require("child_process").spawn;
var path = require("path");
var AnsiHtmlStream = require("ansi-html-stream");
var ColorifyStream = require("./ColorifyStream");

var gitStatsPath = path.join(__dirname, "../node_modules/.bin/git-stats");
var gitStatsArgs = process.argv.slice(2).concat([
	"--no-ansi"
]);

var gitStats = spawn(gitStatsPath, gitStatsArgs);

gitStats.stdout//
.pipe(new AnsiHtmlStream())//
.pipe(new ColorifyStream())//
.pipe(process.stdout);

//inpired by ansi-html-stream/bin/ansi-html
console.log('<pre style="background-color:#000; color:#fff; padding:20px; max-width:900px">');

process.on('exit', function() {
	console.log('</pre>');
});