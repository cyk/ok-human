(function(app) {
  var voice;
  var synth = window.speechSynthesis;
  synth.onvoiceschanged = function() {
    voice = synth.getVoices().find(function(v) {
      return v.name === 'Google US English';
    });
  };
  var unpromptedResponses = [
    'it thinks i said "ok human"!',
    'what!? i didn\'t say anything'
  ];

  app.GiggleService =
    ng.core.Class({
      constructor: function() {},
      prompt: function() {
        var response = unpromptedResponses[
          Math.floor(Math.random() * unpromptedResponses.length)
        ];
        this.speak(response);
      },
      speak: function(text) {
        var utterThis = new SpeechSynthesisUtterance(text);
        utterThis.voice = voice;
        synth.speak(utterThis);
      }
    });
})(window.app || (window.app = {}));
