function Meditation(max_breaths) {
  this.max_breaths = max_breaths;
  this.breaths = {inhale: [], exhale: []};
  this.cycle = "inhale";
}