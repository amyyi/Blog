var webpackConfig = require('../../webpack/config.test');

module.exports = function(config) {

  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    colors: true,
    autoWatch: true,
    files: [
      '../../node_modules/babel-polyfill/dist/polyfill.js',
      '../../node_modules/phantomjs-polyfill/bind-polyfill.js',
      './index.js',
    ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap'],
    },
    reporters: ['spec'],
    specReporter: {
      maxLogLines: 2, //  limit number of lines logged per test
      suppressErrorSummary: true, // do not print error summary
      suppressPassed: true,
      suppressSkipped: true,
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },

  });
};
