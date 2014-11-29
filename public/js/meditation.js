function Meditation(max_breaths, $prompt, $timer_display, $stat_display) {
  this.max_breaths = max_breaths;
  this.breaths = {inhale: [], exhale: []};
  this.phase_count = 0;
  this.phases = ["inhale", "exhale"];
  this.phase_start = Date.now();
  this.$prompt = $prompt;
  this.$timer_display = $timer_display;
  this.$stat_display = $stat_display;
  this.initTimer();
  this.displayPrompt();
}

Meditation.prototype.phase = function() {
  return this.phases[this.phase_count % this.phases.length];
}

Meditation.prototype.displayPrompt = function() {
  this.$prompt.html(this.phase());
}

Meditation.prototype.displayStats = function() {
  this.$stat_display.html("Average inhale: " + this.calcAverage("inhale"));
}

Meditation.prototype.calcAverage = function(phase) {
  console.log(this.breaths[phase]);
  var sum = _(this.breaths[phase]).reduce(function(memo, num){ return memo + num; }, 0);
  return sum / this.breaths[phase].length;
}

Meditation.prototype.breathe = function() {
  this.breaths[this.phase()].push(this.timeDiff());
  this.setPhase();
  this.displayStats();
  this.checkFinish();
}

Meditation.prototype.checkFinish = function() {
  if (this.phase_count >= 2 * this.max_breaths) {
    console.log("Finished!");
  }
}

Meditation.prototype.setPhase = function() {
  this.phase_start = Date.now();
  this.phase_count++;
  this.displayPrompt();
}

Meditation.prototype.initTimer = function() {
  var self = this;
  this.timerInterval = setInterval(function() {
    self.$timer_display.html(self.timeDiff().toFixed(1));
  }, 100);
}

Meditation.prototype.timeDiff = function() {
  return ((Date.now() - this.phase_start) / 1000)
}