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

    rewrite: {
      link: {
        src: ['build/**/*.html', 'build/widget/**/*.js'],
        editor: function(contents, filePath) {
          return contents.replace('widget/wow-such-widget', 'http://wowsuch.io/widget/wow-such-widget');
        }
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
          'build/widget/wow-such-widget.js': 'src/widget/wow-such-widget.js'
        }
      }
    },

    cssmin: {
      widget: {
        files: {
          'build/widget/wow-such-widget.css': 'src/widget/wow-such-widget.css'
        }
      }
    },

    rev: {
      site: {
        options: {
          encoding: 'utf8',
          algorithm: 'md5',
          length: 8
        },
        files: {
          src: ['build/doge.min.{js,css,png,jpg}']
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

  grunt.registerTask('buildPrep', ['shell:clean', 'shell:build'])
  grunt.registerTask('buildSite', ['dogescript:build', 'useminPrepare', 'concat', 'uglify:generated', 'cssmin:generated', 'rev:site', 'usemin']);
  grunt.registerTask('buildWidget', ['uglify:widget', 'cssmin:widget', 'rewrite']);
  grunt.registerTask('build', ['buildPrep', 'buildSite', 'buildWidget']);
  grunt.registerTask('deploy', ['buildPrep', 'buildSite', 'buildWidget', 'gh-pages']);

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-dogescript');
  grunt.loadNpmTasks('grunt-rewrite');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-rev');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-gh-pages');

};