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

    uglify: {
      widget: {
        files: {
          'build/widget/wow-such-widget.min.js': 'src/widget/wow-such-widget.js'
        }
      }
    },

    cssmin: {
      widget: {
        files: {
          'build/widget/wow-such-widget.min.css': 'src/widget/wow-such-widget.css'
        }
      }
    },

    rev: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      site: {
        files: {
          src: ['build/doge.min.{js,css,png,jpg}']
        }
      },
      widget: {
        files: {
          src: ['build/widget/wow-such-widget.min.{js,css,png,jpg}']
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

  grunt.registerTask('buildSite', ['shell:clean', 'shell:build', 'dogescript:build', 'useminPrepare', 'concat', 'uglify:generated', 'cssmin:generated', 'rev:site', 'usemin']);
  grunt.registerTask('buildWidget', ['shell:clean', 'shell:build', 'uglify:widget', 'cssmin:widget', 'rev:widget']);
  grunt.registerTask('deploy', ['buildSite', 'buildWidget', 'gh-pages']);

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