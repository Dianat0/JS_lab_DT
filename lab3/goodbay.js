(function () {
  var speakWord = "Goodbye";
  window.goodbyeSpeaker = {
    speak: function (name) {
      console.log(speakWord + " " + name);
    }
  };
})();
