(function(app) {
  app.PromptComponent =
    ng.core.Component({
      selector: 'oh-prompt',
      templateUrl: 'app/prompt/prompt.component.html',
      styleUrls: ['app/prompt/prompt.component.css']
    })
    .Class({
      constructor: [app.GiggleService, function(giggleService) {
        this.giggleService = giggleService;
        this.status$ = giggleService.status$;
        this.speaking$ = giggleService.speaking$;
      }],
      prompt: function(audio) {
        audio.play();
        this.giggleService.prompt();
      }
    });
})(window.app || (window.app = {}));
