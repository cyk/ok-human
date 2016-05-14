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
      }],
      prompt: function() {
        this.giggleService.prompt();
      }
    });
})(window.app || (window.app = {}));
