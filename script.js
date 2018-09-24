angular.module('appModule', [])
    .controller('MainController', ["$interval", function($interval) {
        var ctrl = this;
        var chessBorad = [];
        var grid = [];

        function cell(i, j) {
            this.x = i;
            this.y = j;
            this.isActive = 0;
        }

        ctrl.listOfActiveCell = [];

        for (var i = 0; i < 10; i++) {
            var gridByY = [];
            for (var j = 0; j < 10; j++) {
                gridByY.push(new cell(i, j));
            }
            grid.push(gridByY);
        }

        ctrl.grid = grid;
        console.log(grid);

        ctrl.listOfActiveCell = []

        grid.forEach(row => {
            row.forEach(cell => {

                if (cell.x == 0 && cell.y < 3) {
                    cell.isActive = 1;
                    ctrl.listOfActiveCell.push(cell);
                }
            });
        });

        $interval(function() {
            var lastCell = ctrl.listOfActiveCell[2];

            if (lastCell.x == 0 && lastCell.y < 9) {
                var y = lastCell.y + 1
                var x = lastCell.x;
            } else if ((lastCell.x == 0 && lastCell.y == 9) || lastCell.x < 9 && lastCell.y == 9) {
                var x = lastCell.x + 1;
                var y = lastCell.y
            } else if ((lastCell.x == 9 && lastCell.y == 9) || (lastCell.x == 9 && lastCell.y < 9 && lastCell.y != 0)) {
                var x = lastCell.x;
                var y = lastCell.y - 1
            } else if ((lastCell.x == 9 && lastCell.y == 0) || (lastCell.x < 9 && lastCell.y == 0)) {
                var x = lastCell.x - 1;
                var y = lastCell.y;
            }

            var nextCell = grid[x][y];
            nextCell.isActive = 1;
            ctrl.listOfActiveCell.push(nextCell);

            var firstCell = ctrl.listOfActiveCell.splice(0, 1);
            firstCell[0].isActive = 0;
        }, 100);

    }])