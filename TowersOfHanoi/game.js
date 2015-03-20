var reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function Game(stacks) {
  this.stacks = stacks || [[3, 2, 1], [], []];
}

Game.prototype.isWon = function() {
  if (this.stacks[0].length === 0 && this.stacks[1].length === 0) {
    return true;
  } else if (this.stacks[0].length === 0 && this.stacks[2].length === 0) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.isValidMove = function(startTowerIdx, endTowerIdx) {
  var startTower = this.stacks[startTowerIdx];
  var endTower = this.stacks[endTowerIdx];
  if (!startTower || !endTower) {
    return false;
  } else if (endTower.length === 0) {
    return true;
  } else if (endTower[endTower.length - 1] > startTower[startTower.length - 1]) {
    return true;
  } else if (endTower[endTower.length - 1] < startTower[startTower.length - 1]) {
    return false;
  }
};

Game.prototype.move = function(startTowerIdx, endTowerIdx) {
  if (this.isValidMove(startTowerIdx, endTowerIdx)) {
    var startTower = this.stacks[startTowerIdx];
    var endTower = this.stacks[endTowerIdx];
    endTower.push(startTower.pop());
    return true;
  } else {
    return false;
  }
};

Game.prototype.print = function() {
  console.log(JSON.stringify(this.stacks));
};

Game.prototype.promptMove = function(callback) {
  this.print();
  reader.question("Where would you like to move from?", function(startTowerIdx){
    reader.question("Where would you like to move to?" , function(endTowerIdx){
      callback(startTowerIdx, endTowerIdx);
    });
  });
};

Game.prototype.run = function(completionCallback) {
  var context = this;
  this.promptMove(function(startTowerIdx, endTowerIdx) {
    if (!context.move(parseInt(startTowerIdx), parseInt(endTowerIdx))) {
      console.log("Error moving the disc");
    }
    if (context.isWon()) {
      console.log("You won!");
      completionCallback();
    } else {
      context.run(completionCallback);
    }
  });
};

var towers = new Game();

towers.run(function() {
  reader.close();
});
