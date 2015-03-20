function Clock () {
}

Clock.TICK = 5000;

Clock.prototype.printTime = function () {
  // Format the time in HH:MM:SS
  console.log(this.time.getHours() + ":" + this.time.getMinutes() + ":" + this.time.getSeconds());
};

Clock.prototype.run = function () {
  // 1. Set the currentTime.
  this.time = new Date();
  // 2. Call printTime.
  this.printTime();
  // 3. Schedule the tick interval.
  setInterval(this._tick.bind(this), 5000);
};

Clock.prototype._tick = function () {
  // 1. Increment the currentTime.
  this.time.setTime(this.time.getTime() + Clock.TICK);
  // 2. Call printTime.
  this.printTime();
};

var clock = new Clock();
clock.run();
