function Meditation(max_breaths, $prompt, $timer_display) {
  this.max_breaths = max_breaths;
  this.breaths = {inhale: [], exhale: []};
  this.phase = "inhale";
  this.phase_start = Date.now();
  this.$prompt = $prompt;
  this.$timer_display = $timer_display;
  this.initTimer();
  this.displayPrompt();
}

Meditation.prototype.displayPrompt = function() {
  this.$prompt.html(this.phase);
}

Meditation.prototype.breathe = function() {
  this.setPhase();
}

Meditation.prototype.setPhase = function() {
  this.phase = this.phase == "inhale" ? "exhale" : "inhale"
  this.phase_start = Date.now();
  this.displayPrompt();
}

Meditation.prototype.initTimer = function() {
  var self = this;
  this.timerInterval = setInterval(function() {
    self.$timer_display.html(self.timeDiff());
  }, 100);
}

Meditation.prototype.timeDiff = function() {
  return ((Date.now() - this.phase_start) / 1000).toFixed(1)
}