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
      build: {
        src: ['build/angular.min.js', 'build/tmp.js'],
        dest: 'build/doge.min.js',
      }
    },

    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      files: {
        src: ['build/doge.min.{js,css,png,jpg}']
      }
    },

    useminPrepare: {
      html: ['build/index.html']
    },

    usemin: {
      html: ['build/index.html']
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    }

  });

  grunt.registerTask('build', ['shell:clean', 'shell:build', 'useminPrepare', 'dogescript', 'cssmin', 'uglify', 'concat', 'rev', 'usemin']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-dogescript');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-gh-pages');

};