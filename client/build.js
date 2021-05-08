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
if (process.argv[2] == "repeat") {
	setInterval(function () {
		if (Date.now() - lastBuild > 2000) {
			build();
		}
	}, 10000);

}

build();

function build() {
	lastBuild = Date.now();
	console.log("=== Starting a build ===");

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
		}
	});

	console.log("Submitted script rebuilding job");
}
