(function(app) {
  var voice;
  var synth = window.speechSynthesis;
  synth.onvoiceschanged = function() {
    voice = synth.getVoices().find(function(v) {
      return v.name === 'Google US English';
    });
  };
  var promptResponses = [
    'it thinks i said "ok human"!',
    'what!? i didn\'t say anything'
  ];

  var promptRequests = [
    'ok human',
    'ok human?!',
    'piece of junk'
  ];

  function sample(c) { return c[Math.floor(Math.random() * c.length)]; }

  app.GiggleService =
    ng.core.Class({
      constructor: [ng.core.NgZone, function(ngZone) {
        this._ngZone = ngZone;
        this._speaking = new Rx.Subject();
        this.speaking$ = this._speaking
          .asObservable()
          .startWith(false);
        this._status = new Rx.Subject();
        this.status$ = this._status
          .asObservable()
          .merge(this.speaking$);

        this.promptRequest$ = this.speaking$
          .skip(1)
          .filter(function(text) { return text === false; })
          .first()
          .concatMap(function() {
            return Rx.Observable.zip(
              Rx.Observable.timer(2000, 5000),
              Rx.Observable.from(promptRequests),
              function(i, r) { return r; }
            );
          })
          .subscribe(function(text) {
            this.speak(text);
          }.bind(this));
      }],
      prompt: function() {
        this._status.next('Listening...');
        setTimeout(function() {
          this.speak(sample(promptResponses));
        }.bind(this), 1000);
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
            this._speaking.next(false);
          }.bind(this));
        }.bind(this));
        synth.speak(utterThis);
      }
    });
})(window.app || (window.app = {}));
