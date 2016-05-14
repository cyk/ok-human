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
        this.speaking$ = giggleService.speaking$;
      }],
      prompt: function(audio) {
        audio.play();
        this.giggleService.prompt(1000);
      }
    });
})(window.app || (window.app = {}));
