(function(app) {
  var voice;
  var synth = window.speechSynthesis;
  synth.onvoiceschanged = function() {
    voice = synth.getVoices().find(function(v) {
      return v.name === 'Google US English';
    });
  };
  var questions = [
    'what is the answer to life the universe and everything?'
  ];
  var unpromptedResponses = [
    'it thinks i said "ok human"!',
    'what!? i didn\'t say anything'
  ];

  function sample(c) { return c[Math.floor(Math.random() * c.length)]; }

  app.GiggleService =
    ng.core.Class({
      constructor: [ng.core.NgZone, function(ngZone) {
        this._speaking = new Rx.Subject();
        this.speaking$ = this._speaking.asObservable().startWith(null);
        this._ngZone = ngZone;
      }],
      prompt: function() {
        var response = sample(unpromptedResponses);
        this._speaking.next('');
        setTimeout(this.speak.bind(this, response), 500);
      },
      speak: function(text) {
        var utterThis = new SpeechSynthesisUtterance(text);
        utterThis.voice = voice;
        utterThis.addEventListener('start', function() {
          this._ngZone.run(function() {
            this._speaking.next(text);
          }.bind(this));
        }.bind(this));
        utterThis.addEventListener('end', function() {
          this._ngZone.run(function() {
            this._speaking.next(null);
          }.bind(this));
        }.bind(this));
        synth.speak(utterThis);
      }
    });
})(window.app || (window.app = {}));
