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

// ----- Main -----

Meditation.prototype.breathe = function() {
  this.breaths[this.phase()].push(this.timeDiff());
  this.setPhase();
  this.displayStats();
  this.checkFinish();
}

Meditation.prototype.checkFinish = function() {
  if (this.phase_count >= 2 * this.max_breaths) {
    this.displayPrompt("Finished");
    this.clearTimer();
    this.displayStats();
  }
}

// ----- Phase -----

Meditation.prototype.phase = function() {
  return this.phases[this.phase_count % this.phases.length];
}

Meditation.prototype.setPhase = function() {
  this.phase_start = Date.now();
  this.phase_count++;
  this.displayPrompt();
}

// ----- Timer -----

Meditation.prototype.timeDiff = function() {
  return ((Date.now() - this.phase_start) / 1000)
}

Meditation.prototype.initTimer = function() {
  var self = this;
  this.timerInterval = setInterval(function() {
    self.$timer_display.html(self.timeDiff().toFixed(1));
  }, 100);
}

Meditation.prototype.clearTimer = function() {
  clearInterval(this.timerInterval);
}

// ----- Display -----

Meditation.prototype.displayPrompt = function(prompt) {
  if (!prompt) {
    prompt = this.phase();
  }
  this.$prompt.html(prompt);
}

Meditation.prototype.displayStats = function() {
  var self = this;
  var html = "";
  this.phases.forEach(function(phase) {
    var stats = self.calcStats(phase);
    ['min', 'max', 'avg'].forEach(function(stat) {
      html += phase + " " + stat + ": " + stats[stat].toFixed(1) + "<br>";
    });
  })
  self.$stat_display.html(html);
}

// ----- Stats -----

Meditation.prototype.calcStats = function(phase) {
  var breaths = this.breaths[phase];
  console.log(breaths)
  if (breaths.length > 0) {
    var sum = _(breaths).reduce(function(s, n){ return s + n; }, 0);
    var avg = sum / breaths.length;
    var max = _(breaths).max();
    var min = _(breaths).min();
    return {max: max, min: min, avg: avg};
  } else {
    return {max: 0, min: 0, avg: 0};
  }
}