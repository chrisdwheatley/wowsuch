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

    cssmin: {
      combine: {
        files: {
          'src/so.prod.css': ['src/foundation.min.css', 'src/so.css']
        }
      }
    },

    uglify: {
      combine: {
        files: {
          'src/such.prod.js': ['src/such.js']
        }
      }
    },

    smoosher: {
      build: {
        files: {
          'build/index.html': 'src/index.html',
        },
      },
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    }

  });

  grunt.registerTask('build', ['shell:clean', 'shell:build', 'cssmin', 'uglify', 'smoosher']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html-smoosher');
  grunt.loadNpmTasks('grunt-gh-pages');

};