// Replaces characters for spans with color style

var util = require("util");
var Transform = require("stream").Transform;

var ansiToColor = {
	"11034" : "303030",
	"9634" : "777", //original is 444, but make it a bit lighter
	"9635" : "87AF00",
	"9636" : "5FAF5F",
	"9632" : "AFFF00"
};

function Colorify() {
	Transform.apply(this, arguments);
}
util.inherits(Colorify, Transform);

Colorify.prototype._transform = function(chunk, enc, cb) {
	var colorChunk = chunk.toString().replace(/&#([0-9]+);/g, replacer);
	this.push(colorChunk, enc);
	cb();
};

function replacer(match, num) {
	if (num in ansiToColor) {
		return "<span style='color:#" + ansiToColor[num] + "'>&#9632;</span>";
	}
	return match;
}

module.exports = Colorify;
