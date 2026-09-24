(function () {
  var speakWord = "Hello";
  window.helloSpeaker = {
    speak: function (name) {
      console.log(speakWord + " " + name);
    }
  };
})();
