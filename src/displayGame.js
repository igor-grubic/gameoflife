export default class DisplayGame {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.generation = 0;
  }

  clearScreen() {
    process.stdout.write('\u001b[2J\u001b[0;0H');
  }

  getBoundries(cells) {
    let x = 0;
    let y = 0;
    cells.forEach(cell => {
      if (cell[0] > x) x = cell[0];
      if (cell[1] > y) y = cell[1];
    });
    return { x, y };
  }

  display(cells) {
    this.clearScreen();

    process.stdout.write(`Generation ${++this.generation}\n`);

    const boundries = this.getBoundries(cells);

    for (let i = this.x; i <= boundries.x; i++) {
      for (let j = this.y; j <= boundries.y; j++) {
        const cell = cells.find(c => c[0] === i && c[1] === j);
        if (typeof cell !== 'undefined') process.stdout.write('O');
        else process.stdout.write(' ');
      }
      process.stdout.write('\n');
    }
  }
}
