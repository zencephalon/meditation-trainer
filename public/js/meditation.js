function Meditation(max_breaths, $prompt, $timer_display) {
  this.max_breaths = max_breaths;
  this.breaths = {inhale: [], exhale: []};
  this.phase = "inhale";
  this.phase_start = Date.now();
  this.$prompt = $prompt;
  this.$timer_display = $timer_display;
  this.initTimer();
  this.setPrompt();
}

Meditation.prototype.setPrompt = function() {
  this.$prompt.html(this.phase);
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