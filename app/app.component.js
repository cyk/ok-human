(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'oh-app',
      viewProviders: [app.GiggleService],
      templateUrl: 'app/app.component.html',
      styleUrls: ['app/app.component.css'],
      directives: [
        app.InstructionsComponent,
        app.PromptComponent
      ]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
