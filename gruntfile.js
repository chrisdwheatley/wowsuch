module.exports = function(grunt) {

  grunt.initConfig({

    shell: {
      options: {
        stdout: true
      },
      clean: {
        command: 'rm -rf build'
      },
      image: {
        command: 'cp -r src/img build/img'
      }
    },

    inline: {
      html: {
        options: {
          uglify: true
        },
        src: ['src/index.html'],
        dest: ['build/']
      }
    },

    'gh-pages': {
      options: {
        base: 'build'
      },
      src: ['**']
    }

  });

  grunt.registerTask('build', ['shell:clean', 'inline', 'shell:image']);
  grunt.registerTask('deploy', ['shell:clean', 'inline', 'shell:image', 'gh-pages']);

  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-inline');
  grunt.loadNpmTasks('grunt-gh-pages');

};