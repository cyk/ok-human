(function(app) {
  app.PromptComponent =
    ng.core.Component({
      selector: 'oh-prompt',
      templateUrl: 'app/prompt/prompt.component.html',
      styleUrls: ['app/prompt/prompt.component.css']
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
