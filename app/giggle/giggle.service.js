(function(app) {
  var voice;
  var synth = window.speechSynthesis;
  synth.onvoiceschanged = function() {
    voice = synth.getVoices().find(function(v) {
      return v.name === 'Google US English';
    });
  };
  var trivia = [
    ['what is the answer to life the universe and everything?', 42],
    ['what is 15% of 80', 12],
    ['how far away is the moon?', 238900],
    ['what does the fox say?', null],
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
        // Listening? Huh, what?
        this._speaking.next('');
        this.speakAfterDelay(sample(unpromptedResponses), 500);

        // Now that you've got me attention...
        this.speaking$
          .skipWhile(function(t) { return t !== null; })
          .first()
          .subscribe(this.engage.bind(this));
      },
      engage: function() {
        var questionAndAnswer = sample(trivia);
        var question = questionAndAnswer[0];
        var answer = questionAndAnswer[1];
        this.speakAfterDelay(question, 2000);
      },
      speakAfterDelay: function(text, delay) {
        return setTimeout(this.speak.bind(this, text), delay);
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
