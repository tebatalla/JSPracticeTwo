var ttt = require("./ttt");
var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

var game = new ttt.Game(reader);

game.run(function(){
  reader.close();
}, "x");
