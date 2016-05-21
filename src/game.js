export default class Game {
  constructor() {
    this.cells = [];
  }

  init(seed) {
    this.cells = seed;
  }

  tick() {
    const evolution = [];
    let deadCells = [];

    this.cells.forEach(cell => {
      const statusNeighbours = this.getStatusNeighbours(cell[0], cell[1]);
      if (statusNeighbours.liveNeighbours.length === 2) evolution.push(cell);
      if (statusNeighbours.liveNeighbours.length === 3) evolution.push(cell);
      deadCells = deadCells.concat(statusNeighbours.deadNeighbours);
    });
    deadCells = this.removeDuplicateDeadCells(deadCells);
    deadCells.forEach(cell => {
      const statusNeighbours = this.getStatusNeighbours(cell[0], cell[1]);
      if (statusNeighbours.liveNeighbours.length === 3) evolution.push(cell);
    });

    this.cells = evolution;
  }

  removeDuplicateDeadCells(deadCells) {
    const uniqueDeadCells = [];
    deadCells.forEach(cell => {
      if (!uniqueDeadCells.find(u => u[0] === cell[0] && u[1] === cell[1])) {
        uniqueDeadCells.push(cell);
      }
    });
    return uniqueDeadCells;
  }

  getStatusNeighbours(x, y) {
    const liveNeighbours = [];
    const deadNeighbours = [];
    const neighbours = this.getNeighbours(x, y);
    this.cells.forEach(cell => {
      neighbours.forEach(n => {
        if (n[0] === cell[0] && n[1] === cell[1]) liveNeighbours.push(cell);
        else deadNeighbours.push(n);
      });
    });
    return { liveNeighbours, deadNeighbours };
  }

  getNeighbours(x, y) {
    return [
      [x - 1, y - 1],
      [x, y - 1],
      [x + 1, y - 1],
      [x - 1, y],
      [x + 1, y],
      [x - 1, y + 1],
      [x, y + 1],
      [x + 1, y + 1],
    ];
  }

  isAlive(x, y) {
    const cell = this.cells.find(c => c[0] === x && c[1] === y);
    return typeof cell !== 'undefined';
  }
}
