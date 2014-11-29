$(document).ready(function() {
  var meditation;

  Mousetrap.bind('space', function() {
    if (!meditation) {
      mediation = new Meditation(MAX_BREATHS, $('#prompt'), $('#timer_display'));
    }
    console.log("Hello!");
  })
});
