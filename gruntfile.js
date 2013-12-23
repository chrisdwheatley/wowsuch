module.exports = function(grunt) {

  grunt.initConfig({

    shell: {
      options: {
        stdout: true
      },
      clean: {
        command: 'rm -rf build'
      },
      build: {
        command: 'cp -r src build'
      }
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    }

  });

  grunt.registerTask('publish', ['shell:clean', 'shell:build', 'gh-pages']);

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-gh-pages');

};