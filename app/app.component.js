(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'oh-app',
      templateUrl: 'app/app.component.html',
      styleUrls: ['app/app.component.css'],
      directives: [app.PromptComponent]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
