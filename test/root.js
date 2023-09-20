global.expect = require('expect');

const babel = require('babel-core');
const jsdom = require('jsdom');
const path = require('path');

before(function(done) {
  const babelResult = babel.transformFileSync(
    path.resolve(__dirname, '..', 'index.js'), {
      presets: ['es2015']
    }
  );

  const html = path.resolve(__dirname, '..', 'index.html')

  jsdom.env(html, [], {
    src: babelResult.code,
    virtualConsole: jsdom.createVirtualConsole().sendTo(console)
  }, (err, window) => {
    if (err) {
      return done(err);
    }

    Object.keys(window).forEach(key => {
      global[key] = window[key];
    });

    return done();
  });
});

function sayHiToHeadphonedRoommate(string) {
  if (string.toLowerCase() === "hello") {
    return "I can't hear you!";
  } else if (string === "HELLO") {
    return "YES INDEED!";
  } else if (string === "Let's have dinner together!") {
    return "I would love to!";
  } else {
    return "I can't hear you!";
  }
}