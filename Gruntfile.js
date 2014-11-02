module.exports = function(grunt) {
  grunt.initConfig({
    run: {

      // Run all the tests inside the test folder
      mocha: {
        args: [
          './node_modules/mocha/bin/mocha',
          './test/**/test-*.js',
          '--reporter',
          'spec',
          '--bail'
        ],
      },

      // Run JSDOC
      doc: {
        args: [
          './node_modules/jsdoc-to-markdown/bin/cli.js',
          './lib/**/*.js',
          './.jsdocrc'
        ],
      },

      // Look for JavaScript errors
      hint: {
        args: [
          './node_modules/jshint/bin/jshint',
          './lib',
          './test',
          './examples',
          './Gruntfile.js'
        ],
      },

      // Runs test coverages
      istanbul: {
        args: [
          './node_modules/istanbul/lib/cli.js',
          'cover',
          './node_modules/mocha/bin/_mocha',
          '--report',
          'lcovonly',
          '--',
          '--reporter',
          'spec',
          '--bail',
          './test/**/test-*.js'
        ]
      },

      // Send coverage results to Coveralls
      coveralls: {
        exec: 'cat ./coverage/lcov.info | ' +
          './node_modules/coveralls/bin/coveralls.js'
      }
    },
    jsdoc2md: {
      api: {
        src: './lib//bolty.js',
        dest: './docs/api.md'
      },
      encoders: {
        src: './lib//encoders.js',
        dest: './docs/encoders.md'
      },
      decoders: {
        src: './lib//decoders.js',
        dest: './docs/decoders.md'
      }
    }
  });

  // Loading NPM Grunt plugins
  grunt.loadNpmTasks('grunt-run');
  grunt.loadNpmTasks('grunt-jsdoc-to-markdown');

  // Registering custom named tasks for easy access
  grunt.registerTask('test', [
    'run:hint',
    'run:mocha'
  ]);

  // Registering custom named tasks for easy access
  grunt.registerTask('doc', [
    'jsdoc2md'
  ]);

  // This is the command that Travis will run
  grunt.registerTask('travis', [
    'run:hint',
    'run:istanbul',
    'run:coveralls'
  ]);
};
