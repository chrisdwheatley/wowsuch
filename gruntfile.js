module.exports = function(grunt) {

  grunt.initConfig({

    shell: {
      options: {
        stdout: true
      },
      clean: {
        command: 'rm -rf build .tmp'
      },
      build: {
        command: 'cp -r src build'
      }
    },

    watch: {
      scripts: {
        files: 'src/*.djs',
        tasks: ['dogescript:dev'],
        options: {
          spawn: false
        },
      },
    },

    dogescript: {
      build: {
        src: ['build/such.djs']
      },
      dev: {
        src: ['src/such.djs']
      }
    },

    useminPrepare: {
      options: {
        dest: 'build'
      },
      html: ['build/index.html']
    },

    usemin: {
      html: ['build/index.html']
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

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    }

  });

  grunt.registerTask('build', ['shell:clean', 'shell:build', 'dogescript:build', 'useminPrepare', 'concat', 'uglify', 'cssmin', 'rev', 'usemin']);
  grunt.registerTask('deploy', ['build', 'gh-pages']);

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-dogescript');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-gh-pages');

};