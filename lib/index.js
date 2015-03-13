var spawn = require("child_process").spawn;
var path = require("path");
var fs = require("fs");
var AnsiHtmlStream = require("ansi-html-stream");
var ColorifyStream = require("./ColorifyStream");

// see http://stackoverflow.com/questions/17516772/using-nodejss-spawn-causes-unknown-option-and-error-spawn-enoent-err#answer-17537559
var gitStatsPath = path.join(__dirname, "../node_modules/.bin/git-stats" + (process.platform === "win32" ? ".cmd" : ""));
var gitStatsArgs = process.argv.slice(2).concat([
	"--no-ansi"
]);

var gitStats = spawn(gitStatsPath, gitStatsArgs);

gitStats.stdout//
.pipe(new AnsiHtmlStream())//
.pipe(new ColorifyStream())//
.pipe(process.stdout);

//var font = "data:image/png;base64," + fs.readFileSync(path.join(__dirname, "UbuntuMono-R.ttf")).toString("base64");
var font = "data:image/png;base64," + fs.readFileSync(path.join(__dirname, "DejaVuSansMono.ttf")).toString("base64");
var before = "<html>"//
		+ "<head>"//
		+ "<title>git stats</title>"//
		+ "<style>"//
		+ "	@font-face { font-family: UbuntuMono; src: url('" + font + "'); }"//
		+ "</style>"//
		+ "</head>"//
		+ "<body>"//
		//inpired by ansi-html-stream/bin/ansi-html
		+ "<pre style=\"background-color:#000; color:#fff; padding:20px; max-width:1080px; font-family:UbuntuMono;\">";

console.log(before);

process.on('exit', function() {
	console.log('</pre></body></html>');
});