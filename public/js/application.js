$(document).ready(function() {
  var meditation;

  Mousetrap.bind('space', function() {
    if (!meditation) {
      meditation = new Meditation(MAX_BREATHS, $('#prompt'), $('#timer_display'));
    } else {
      meditation.breathe();
    }
  })
});
