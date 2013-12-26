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
          'build/doge.min.css': ['build/foundation.min.css', 'build/so.css']
        }
      }
    },

    uglify: {
      prod: {
        files: {
          'build/tmp.js': ['build/such.js', 'build/very.js']
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['build/angular.min.js', 'build/tmp.js'],
        dest: 'build/doge.min.js',
      }
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    }

  });

  grunt.registerTask('build', ['shell:clean', 'shell:build', 'dogescript', 'cssmin', 'uglify', 'concat']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-dogescript');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-gh-pages');

};