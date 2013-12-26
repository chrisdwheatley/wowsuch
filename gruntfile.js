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

    dogescript: {
      build: {
        src: ['build/such.djs']
      }
    },

    cssmin: {
      combine: {
        files: {
          'build/doge.min.css': ['src/foundation.min.css', 'src/so.css']
        }
      }
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    }

  });

  grunt.registerTask('build', ['shell:clean', 'shell:build', 'dogescript', 'cssmin']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-dogescript');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-gh-pages');

};