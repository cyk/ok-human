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

  function sample(c) { return c[Math.floor(Math.random() * c.length)]; }

  app.GiggleService =
    ng.core.Class({
      constructor: [ng.core.NgZone, function(ngZone) {
        this._speaking = new Rx.Subject();
        this.speaking$ = this._speaking.asObservable().startWith(false);
        this._ngZone = ngZone;
      }],
      prompt: function() {
        var response = sample(unpromptedResponses);
        setTimeout(this.speak.bind(this, response), 500);
      },
      speak: function(text) {
        var utterThis = new SpeechSynthesisUtterance(text);
        utterThis.voice = voice;
        utterThis.addEventListener('start', function() {
          this._ngZone.run(function() {
            this._speaking.next(true);
          }.bind(this));
        }.bind(this));
        utterThis.addEventListener('end', function() {
          this._ngZone.run(function() {
            this._speaking.next(false);
          }.bind(this));
        }.bind(this));
        synth.speak(utterThis);
      }
    });
})(window.app || (window.app = {}));
