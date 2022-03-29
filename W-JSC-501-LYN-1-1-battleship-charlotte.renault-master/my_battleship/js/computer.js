/*jslint browser this */
/*global _, player */

(function (global) {
  "use strict";

  var computer = _.assign({}, player, {
    grid: [],
    tries: [],
    fleet: [],
    game: null,
    play: function () {
      var self = this;
      setTimeout(function () {
        var x = Math.floor(Math.random() * 9);
        var y = Math.floor(Math.random() * 9);
        game.fire(this, y, x, function (hasSucced) {
          self.tries[x][y] = hasSucced;
          self.miniRenderTries(game.miniGrid);
        });
      
      }, 2000);
    },
    isShipOk: function (callback) {
      var ships = 0;

      while (ships <= this.fleet.length) {
        var x = Math.floor(Math.random() * 9);
        var y = Math.floor(Math.random() * 9);

        var direction = Math.floor(Math.random() * 2);
        if (direction === 0) {
          this.pos = "horizontal";
        } else {
          this.pos = "verticale";
        }

        if (this.setActiveShipPosition(x, y)) {
          this.activateNextShip();
          ships++;
        }
      }

      if (ships >= 4) {
        callback();
      }
    }
  });
  global.computer = computer;

}(this));