# git-stats-html

DEPRECATED! Use https://github.com/IonicaBizau/git-stats-html instead
Wrapper for git-stats module, which transforms its output to HTML.

## usage

	npm install -g git+https://github.com/adros/git-stats-html

	git-stats-html > stats.html
	git-stats-html "1 january 2015" > sample.html


## implementation

Module calls git-stats CLI too with --no-ansi switch. Than transform it to HTML using ansi-html-stream
and then replaces selected characters for SPANs with color defined in style.

## get data as json

	git-stats-data