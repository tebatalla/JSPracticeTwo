var Board = require('./board.js');

function Game(interface) {
  this.board = new Board();
  this.interface = interface;
}

Game.prototype.run = function(completionCallback, mark) {
  var context = this;
  this.board.display();
  this.promptMove(mark, function(pos) {
    if (context.board.empty(pos)) {
      context.board.placeMark(pos, mark);
      mark = (mark === "x") ? "o" : "x";
    }

    if (context.board.won()) {
      context.board.display();
      console.log(context.board.winner() + " wins!");
      completionCallback();
    } else {
      context.run(completionCallback, mark);
    }
  });
};

Game.prototype.promptMove = function(mark, callback) {
  this.interface.question(mark +", where would you like to make a move?\n", function(pos) {
    var posArray = pos.split(",").map(function(el){
      return parseInt(el);
    });
    callback(posArray);
  });
};


module.exports = Game;
