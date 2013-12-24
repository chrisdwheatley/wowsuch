module.exports = function(grunt) {

  grunt.initConfig({

    shell: {
      options: {
        stdout: true
      },
      clean: {
        command: 'rm -rf build'
      }
    },

    inline: {
      dist: {
        options: {
          cssmin: true,
          uglify: true
        },
        src: ['src/index.html'],
        dest: ['build/index.html']
      }
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    }

  });

  grunt.registerTask('build', ['shell:clean', 'inline']);
  grunt.registerTask('deploy', ['shell:clean', 'inline', 'gh-pages']);

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-gh-pages');

};