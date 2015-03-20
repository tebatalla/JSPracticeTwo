function Board() {
  this.grid = this.makeGrid();
}

Board.prototype.makeGrid = function() {
  var grid = [];
  for (var i = 0; i < 3; i++) {
    grid.push([" ", " ", " "]);
  }
  return grid;
};

Board.prototype.winner = function() {
  var marks = ["o", "x"];
  var current;
  for (var i = 0; i < marks.length; i++) {
    current = marks[i];
    for (var j = 0; j < this.grid.length; j++) {
      if (this.checkRows(this.grid[j], current)) {
        return current;
      }
      if (this.checkCols(j, current)) {
        return current;
      }
    }

    if (this.checkDiagonals(current)) {
      return current;
    }
  }
  return false;
};

Board.prototype.checkRows = function(row, mark) {
  var isCurrentMark = function(el) {
    return el === mark;
  };
  if (row.every(isCurrentMark)) {
    return true;
  }
};

Board.prototype.checkCols = function(row, mark) {
  var col = [];
  var isCurrentMark = function(el) {
    return el === mark;
  };

  for (var k = 0; k < this.grid[row].length; k++) {
    col.push(this.grid[k][row]);
  }
  if (col.every(isCurrentMark)) {
    return true;
  }
  col.length = 0;
};

Board.prototype.checkDiagonals = function(mark) {
  if (this.pos([0, 0]) === mark &&
        this.pos([1, 1]) === mark &&
        this.pos([2, 2]) === mark) {
    return mark;
  } else if (this.pos([0, 2]) === mark &&
        this.pos([1, 1]) === mark &&
        this.pos([2, 0]) === mark) {
    return true;
  }
};

Board.prototype.won = function() {
  return !!this.winner();
};

Board.prototype.empty = function(pos) {
  return this.pos(pos) === " ";
};

Board.prototype.placeMark = function(pos, mark) {
  this.grid[pos[0]][pos[1]] = mark;
  return true;
};

Board.prototype.pos = function(pos) {
  var x = pos[0];
  var y = pos[1];
  return this.grid[x][y];
};

Board.prototype.display = function() {
  console.log(JSON.stringify(this.grid[0]));
  console.log(JSON.stringify(this.grid[1]));
  console.log(JSON.stringify(this.grid[2]));
};

module.exports = Board;
