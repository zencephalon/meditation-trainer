function Meditation(max_breaths, $prompt, $timer_display, $stat_display) {
  this.max_breaths = max_breaths;
  this.phase_count = 0;
  this.phases = ["inhale", "hold_inhale", "exhale", "hold_exhale"];
  this.breaths = {};

  this.phases.forEach(function(phase) {
    this.breaths[phase] = [];
  }.bind(this))

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
    $.ajax({
      type: "POST",
      url: '/meditation',
      data: {meditation: this.allStats()}
    }).done(function(result) {
      window.location = result;
    })
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
  var stats = this.allStats();

  for (phase in stats) {
    html += this.formatPhaseStats(phase, stats[phase]);
  }

  this.$stat_display.html(html);
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

Meditation.prototype.allStats = function() {
  var self = this;
  var stats = {};

  this.phases.forEach(function(phase) {
    stats[phase] = self.calcStats(self.breaths[phase]);
  });
  stats["cycle"] = this.calcStats(this.cycles());

  return stats;
}

Meditation.prototype.calcStats = function(breaths) {
  if (breaths.length > 0) {
    var s = sum(breaths);
    var avg = s / breaths.length;
    var max = _(breaths).max();
    var min = _(breaths).min();
    return {max: max, min: min, avg: avg};
  } else {
    return {max: 0, min: 0, avg: 0};
  }
}

Meditation.prototype.cycles = function() {
  return _.chain(
      _.zip.apply(_, _(this.breaths).values())
    ).map(function(cycle_arr) {
      return sum(cycle_arr);
    }).reject(function(val) {
      return isNaN(val)
    }).value();
}

function sum(arr) {
  return _(arr).reduce(function(s, n){ return s + n; }, 0);
}