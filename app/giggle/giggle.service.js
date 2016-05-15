(function(app) {
  var voice;
  var synth = window.speechSynthesis;
  synth.onvoiceschanged = function() {
    voice = synth.getVoices().find(function(v) {
      return v.name === 'Google US English';
    });
  };
  var undesiredPromptResponses = [
    'it thinks i said "ok human"!',
    'what!? i didn\'t say anything'
  ];

  var promptRequests = [
    'ok human',
    'ok human?!',
    'piece of junk'
  ];

  var questions = [
    'what is the answer to life, the universe, and everything?'
  ];

  function sample(c) { return c[Math.floor(Math.random() * c.length)]; }

  app.GiggleService =
    ng.core.Class({
      constructor: [ng.core.NgZone, function(ngZone) {
        this._ngZone = ngZone;

        this._prompt = new Rx.Subject();
        this.prompt$ = this._prompt.asObservable();

        this._listening = new Rx.Subject();
        this.listening$ = this._listening.asObservable();

        this._speaking = new Rx.Subject();
        var speaking$ = this._speaking
          .asObservable()
          .startWith(false);

        this.status$ = this.listening$
          .switchMap(function(listening) {
            return listening ? speaking$ : Rx.Observable.never();
          })
          .merge(
            this.listening$.map(function(isListening) {
              return isListening ? 'Listening...' : null;
            }.bind(this))
          );

        var promptRequests$ = this.listening$
          .skip(1)
          .filter(function(listening) { return listening === false; })
          .first()
          .concatMap(function() {
            return Rx.Observable.zip(
              Rx.Observable.timer(2000, 5000),
              Rx.Observable.from(promptRequests),
              function(i, r) { return r; }
            );
          });

        this.promptRequestSub = promptRequests$.subscribe(function(text) {
          this.speak(text);
          this.promptWasRequested = true;
        }.bind(this));
      }],
      prompt: function() {
        var text;
        this._listening.next(true);
        if (this.promptWasRequested) {
          this.promptRequestSub.unsubscribe();
          text = sample(questions);
        } else {
          text = sample(undesiredPromptResponses);
        }
        setTimeout(function() {
          this.speak(text);
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
            this._listening.next(false);
          }.bind(this));
        }.bind(this));
        synth.speak(utterThis);
      }
    });
})(window.app || (window.app = {}));
