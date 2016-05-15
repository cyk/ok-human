(function(app) {
  var voice;
  var synth = window.speechSynthesis;
  var SpeechRecognition = window.webkitSpeechRecognition;

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
    ['what is the answer to life, the universe, and everything?', '42'],
    ['what is 15% of 80', '12'],
    ['what is 30% of 160', '48'],
    ['how old is barack obama?', '54'],
    ['how old is sandra bullock?', '51'],
    ['what size shoe does Michael Jordan wear', '13']
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

        this._status = new Rx.Subject();
        this.status$ = this._status.asObservable()
          .merge(
            this.listening$
              .switchMap(function(listening) {
                return listening ? speaking$ : Rx.Observable.never();
              })
          )
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
          var questionAndAnswer = sample(questions);
          this.attemptAnswerAfterListening(questionAndAnswer[1]);
          setTimeout(function() {
            this.speak(questionAndAnswer[0]);
          }.bind(this), 1000);
        } else {
          setTimeout(function() {
            this.speak(sample(undesiredPromptResponses));
          }.bind(this), 1000);
        }
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
      },
      thank: function() {
        this.speak('Thank you!');
      },
      berate: function() {
        this.speak('That cant be right. Where is my iPhone?');
      },
      attemptAnswerAfterListening: function(answer) {
        var sub = this.listening$.subscribe(function(listening) {
          if (listening === false) {
            this.attemptAnswer(answer);
            sub.unsubscribe();
          }
        }.bind(this));
      },
      attemptAnswer: function(answer) {
        var recognition = new SpeechRecognition();
        var giggle = this;
        recognition.start();
        recognition.onresult = function(event) {
          if (event.results[0].isFinal) {
            console.log(event.results[0][0].transcript);
            if (event.results[0][0].transcript === answer) {
              giggle.thank();
            } else {
              giggle.berate();
            }
          }
        };
      }
    });
})(window.app || (window.app = {}));
