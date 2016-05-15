(function(app) {
  app.InstructionsComponent =
    ng.core.Component({
      selector: 'oh-instructions',
      outputs: ['onHide'],
      templateUrl: 'app/instructions/instructions.component.html',
      styleUrls: ['app/instructions/instructions.component.css']
    })
    .Class({
      constructor: function() {
        this.onHide = new ng.core.EventEmitter();
        this.isOpen = true;
      },
      hide: function() {
        this.isOpen = false;
        this.onHide.emit();
      }
    });
})(window.app || (window.app = {}));
