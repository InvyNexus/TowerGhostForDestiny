module.exports = function(grunt) {
	grunt.config.set('removelogging',{
		js: {
		  src: [ '../www/js/tgd/*.js',
				'../www/js/app/*.js',
				'../www/js/extras/*.js' ],
		  dest: "../www/resources/3.tower_ghost.js",
		  options: {
			namespace: [ "console", "tgd" ],
			methods: "localLog log info warn error assert count clear group groupEnd groupCollapsed trace debug dir dirxml profile profileEnd time timeEnd timeStamp table exception".split(" "),
			verbose: true
		  }
		}
	});
};