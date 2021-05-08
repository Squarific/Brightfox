
const _ = require("lodash");
const fs = require("fs");
const path = require("path");
const compressor = require("node-minify");
const minify = require("@node-minify/core")
const uglifyES = require("@node-minify/uglify-es")
const mustache = require("mustache")
const exec = require("child_process").execSync;
const chokidar = require('chokidar');

var lastBuild = Date.now();
var building = 0;
if (process.argv[2] == "repeat") {
	/*fs.watch("src", { recursive: true }, function () {
		// Don't build too often, changes often happen multiple times
		// with a lot of text editors even with a single save
		if (Date.now() - lastBuild > 5000) build();
	});*/

	/*chokidar.watch('src').on('all', (event, path) => {
	  //console.log("Files changed");
	  if (Date.now() - lastBuild > 2000) {
		console.log("Files changed");
		build();
	  }
	  //else console.log("...but too quickly after the previous one.");
	});*/

	setInterval(function () {
		if (Date.now() - lastBuild > 2000) {
			build();
		}
	}, 10000);

}

build();

function build() {
	lastBuild = Date.now();
	if (building !== 0) return console.log("ALREADY BUILDING", building);

	console.log("=== Starting a build ===");
	building = 1;

	/* compressor.minify({
		compressor: "gcc",
		input: "src/scripts/** /*.js", <--- remove space before /
		output: "dist/anondraw.min.js",
		//options: [ "--language_in=ES5" ],
	options: {
	  languageIn: "ES5",
	  warningLevel: "QUIET",
	  //compilationLevel: "WHITESPACE_ONLY"
	},
		callback: function(err, min) {
			if (err) {
				console.log("[ERROR] Rebuilding scripts failed", err);
				return;
			}
			console.log("Scripts rebuilt.");
	  building--;
		}
	});*/

	minify({
		compressor: uglifyES,
		input: "src/**/*.js",
		output: "demo/SitePlugins.min.js",
		options: {
			warnings: true, // pass true to display compressor warnings.
			mangle: false, // pass false to skip mangling names.
			compress: false // pass false to skip compressing entirely. Pass an object to specify custom compressor options.
		},
		callback: function (err, min) {
			if (err) {
				console.log("[ERROR] Rebuilding scripts failed", err);
				return;
			}
			console.log("Scripts rebuilt.");
			building--;
		}
	});

	console.log("Submitted script rebuilding job");

	/*compressor.minify({
		compressor: "yui-css",
		input: "src/css/*.css",
		output: "dist/anondraw.min.css",
		callback: function(err, min) {
			if (err) {
				console.log("[ERROR] Rebuilding styles failed", err);
				return;
			}
			console.log("Styles rebuilt.");
	  building--;
		}
	});*/

	console.log("Submitted style rebuilding job");
}
