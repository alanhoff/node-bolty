var Benchmark = require('benchmark');
var suite = new Benchmark.Suite();
var fs = require('fs');

var object = {
  name: 'Alan',
  surname: 'Hoffmeister',
  time: new Date().getTime(),
  awesome: true
};

// Read every file in this folder
fs.readdirSync(__dirname)

  // Check if they are  benchmark files
  .filter(function(file){
    return /bench-/.test(file);
  })

  // Add them to the suite
  .forEach(function(file){
    console.log('Loading %s...', file);
    require('./' + file)(suite, object);
  });

console.log('Tests will start now..');

suite.on('cycle', function(event) {
  console.log(String(event.target));
})

.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
})

.run();




