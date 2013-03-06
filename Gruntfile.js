module.exports = function(grunt) {

	// Load local tasks.
	grunt.loadTasks('tasks');

	// Default task.
	grunt.registerTask('default', 'lint');

};
