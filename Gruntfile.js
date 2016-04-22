module.exports = function(grunt) {

  var date = new Date();
  var timestamp =
    `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-` +
    `${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Concat all Bower components
    'bower_concat': {
      'all': {
        'dest': 'build/_bower.js',
        'cssDest': 'build/_bower.css',
        'mainFiles': {
          'ace-builds': [
            'src-min-noconflict/ace.js',
            'src-min-noconflict/ext-language_tools.js'
          ],
          'angular-ui-ace': 'ui-ace.min.js',
          'bootstrap': ['dist/css/bootstrap.min.css',
            'dist/js/bootstrap.js'
          ],
          'font-awesome': 'css/font-awesome.css'
        },
        'dependencies': {
          'angular-ui-ace': ['angular', 'ace-builds'],
          'underscore': 'jquery',
          'angular': 'jquery'
        }
      }
    },

    // Concat Bower
    'concat': {
      'app_css': {
        'src': ['app/**/*.css'],
        'dest': 'build/compiled_app.css',
      }
    },

    // Compile libraries and source
    'closure-compiler': {
      'libs': {
        'js': ['build/_bower.js', 'build/lb-services.js'],
        'jsOutputFile': 'build/compiled_libs.js',
        'maxBuffer': 5000,
        'options': {
          'compilation_level': 'SIMPLE_OPTIMIZATIONS',
          'debug': null,
          'formatting': 'PRETTY_PRINT',
          'language_out': 'ES5'
        }
      },
      'app': {
        'js': ['app/**/*.js', '!app/*.js'],
        'jsOutputFile': 'build/compiled_app.js',
        'maxBuffer': 5000,
        'options': {
          'compilation_level': 'SIMPLE_OPTIMIZATIONS',
          'debug': null,
          'formatting': 'PRETTY_PRINT'
        }
      }
    },

    'includeSource': {
      'options': {
        'templates': {
          'html': {
            'js': '<script src="{filePath}"></script>',
            'css': '<link rel="stylesheet" type="text/css" ' +
              'href="{filePath}" />',
          }
        }
      },
      'dev': {
        'files': {
          'index.html': 'index.html'
        }
      }
    },

    'serve': {
      'options': {
        'port': 80
      }
    }

  });

  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-bower-concat');
  grunt.loadNpmTasks('grunt-closure-compiler');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-include-source');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-serve');

  grunt.registerTask('default', []);

  grunt.registerTask('build', [
    'includeSource:dev',
    'bower_concat',
    'closure-compiler:libs',
    'closure-compiler:app',
    'concat:app_css'
  ]);

  grunt.registerTask('update_deps', [
    'includeSource:dev',
  ]);

  grunt.registerTask('check', ['closure-compiler:check']);

};
