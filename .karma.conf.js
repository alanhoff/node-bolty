module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'browserify'],
    browsers: ['PhantomJS'],
    preprocessors: {
      'test/test-*.js': ['browserify']
    },
    reporters: ['mocha'],
    singleRun: true,
    files: [
      'test/test-*.js'
    ]
  });
};
