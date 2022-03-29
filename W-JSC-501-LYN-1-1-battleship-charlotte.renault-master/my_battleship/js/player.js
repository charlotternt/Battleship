/*jslint browser this */
/*global _, shipFactory, player, utils */

(function (global) {
    "use strict";

    var ship = {dom: {parentNode: {removeChild: function () {}}}};
    var arrai = [];

    var player = {
      grid: [],
      tries: [],
      fleet: [],
      game: null,
      activeShip: 0,
      init: function () {
        // créé la flotte
        this.fleet.push(shipFactory.build(shipFactory.TYPE_BATTLESHIP));
        this.fleet.push(shipFactory.build(shipFactory.TYPE_DESTROYER));
        this.fleet.push(shipFactory.build(shipFactory.TYPE_SUBMARINE));
        this.fleet.push(shipFactory.build(shipFactory.TYPE_SMALL_SHIP));

        // créé les grilles
        this.grid = utils.createGrid(10, 10);
        this.tries = utils.createGrid(10, 10);
      },
      setGame: function () {},
      play: function (col, line) {
        // appel la fonction fire du game, et lui passe une calback pour récupérer le résultat du tir
        game.fire( this, col,line,_.bind(function (hasSucced) {
            this.tries[line][col] = hasSucced;
          }, this)
        );
      },
      // quand il est attaqué le joueur doit dire si il a un bateaux ou non à l'emplacement choisi par l'adversaire
      receiveAttack: function (col, line, callback) {
        var succeed = false;

        if (this.grid[line][col] !== 0) {
          succeed = true;
          this.grid[line][col] = 0;
        }
        callback.call(undefined, succeed);
      },
      setActiveShipPosition: function (x, y) {
        var ship = this.fleet[this.activeShip];
        var i = 0;

        if (ship.getLife() == 5) {
          if (x < Math.floor(ship.getLife() / 2) || x > 7) {
            return false;
          }
          for (let i = 0; i < arrai.length; i++) {
            for (let xPos = x - 2; xPos <= x + 2; xPos++) {
              console.log(i);
              if (arrai[i][0] == xPos && arrai[i][1] == y) {
                return false;
              }
            }
          }
          arrai.push([x + 2, y]);
          arrai.push([x - 2, y]);
          arrai.push([x + 1, y]);
          arrai.push([x - 1, y]);
          arrai.push([x, y]);
        }

        if (ship.getLife() == 4) {
          if (x < Math.floor(ship.getLife() / 2) || x > 8) {
            return false;
          }
          for (let i = 0; i < arrai.length; i++) {
            for (let xPos = x - 2; xPos <= x + 1; xPos++) {
              console.log(i);
              if (arrai[i][0] == xPos && arrai[i][1] == y) {
                return false;
              }
            }
          }
          arrai.push([x - 2, y]);
          arrai.push([x + 1, y]);
          arrai.push([x - 1, y]);
          arrai.push([x, y]);
        }

        if (ship.getLife() == 3) {
          if (x < Math.floor(ship.getLife() / 2) || x > 8) {
            return false;
          }
          for (let i = 0; i < arrai.length; i++) {
            for (let xPos = x - 1; xPos <= x + 1; xPos++) {
              console.log(i);
              if (arrai[i][0] == xPos && arrai[i][1] == y) {
                return false;
              }
            }
          }
          arrai.push([x + 1, y]);
          arrai.push([x - 1, y]);
          arrai.push([x, y]);
        }
        console.log(arrai);

        while (i < ship.getLife()) {
          this.grid[y][x + i] = ship.getId();
          i += 1;
        }

        return true;
      },
      clearPreview: function () {
        this.fleet.forEach(function (ship) {
          if (ship.dom.parentNode) {
            ship.dom.parentNode.removeChild(ship.dom);
          }
        });
      },
      resetShipPlacement: function () {
        this.clearPreview();

        this.activeShip = 0;
        this.grid = utils.createGrid(10, 10);
      },
      activateNextShip: function () {
        if (this.activeShip < this.fleet.length - 1) {
          this.activeShip += 1;
          return true;
        } else {
          return false;
        }
      },
      miniRenderTries: function (miniGrid) {
        var ship = this.fleet[this.activeShip];
        this.tries.forEach(function (row, rid) {
          row.forEach(function (val, col) {
            var node = miniGrid.querySelector( ".row:nth-child(" + (rid + 1) + ") .cell:nth-child(" + (col + 1) + ")");

            if (val === true) {
              node.style.backgroundColor = "#B11E28";
            }
            if (ship.getLife() === 0) {
                var dead = document.querySelector(".fleet");
                dead.className += " sunk";
            }
          });
        });
      },
      renderTries: function (grid) {
        this.tries.forEach(function (row, rid) {
          row.forEach(function (val, col) {
            var node = grid.querySelector(".row:nth-child(" + (rid + 1) + ") .cell:nth-child(" + (col + 1) + ")" );

            if (val === true) {

              node.classList.add("explode");
            } else if (val === false) {

              node.classList.add("miss");
            }
          });
        });
      },
      renderShips: function (grid) {},
    };

    global.player = player;

}(this));