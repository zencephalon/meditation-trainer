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
  this.timerInterval = setInterval(this.displayTimer.bind(this), 100);
}

Meditation.prototype.displayTimer = function() {
  this.$timer_display.html(this.formatSeconds(this.timeDiff()));
}

Meditation.prototype.clearTimer = function() {
  clearInterval(this.timerInterval);
}

// ----- Display -----

Meditation.prototype.displayPrompt = function(prompt) {
  if (!prompt) {
    prompt = this.phase() + " (press Space at end)";
  }
  this.$prompt.html(prompt);
}

Meditation.prototype.displayStats = function() {
  var self = this;
  var html = "";
  this.phases.forEach(function(phase) {
    var stats = self.calcStats(self.breaths[phase]);
    html += self.formatPhaseStats(phase, stats);
  })
  self.$stat_display.html(html);
}

Meditation.prototype.formatPhaseStats = function(phase, stats) {
  var html = "";
  var self = this;
  ['min', 'max', 'avg'].forEach(function(stat) {
      html += phase + " " + stat + ": " + self.formatSeconds(stats[stat]) + "<br>";
  });
  return html;
}

Meditation.prototype.formatSeconds = function(seconds) {
  return "<span class='time'>" + seconds.toFixed(1) + "</span> s";
}

// ----- Stats -----

Meditation.prototype.calcStats = function(breaths) {
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