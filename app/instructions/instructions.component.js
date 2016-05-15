(function(app) {
  app.InstructionsComponent =
    ng.core.Component({
      selector: 'oh-instructions',
      templateUrl: 'app/instructions/instructions.component.html',
      styleUrls: ['app/instructions/instructions.component.css']
    })
    .Class({
      constructor: function() {
        this.isOpen = true;
      },
      hide: function() {
        this.isOpen = false;
      }
    });
})(window.app || (window.app = {}));
