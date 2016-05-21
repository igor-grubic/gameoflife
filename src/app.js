import Game from './game.js';
import DisplayGame from './displayGame.js';
import gameSeeds from './gameSeeds.js';

const game = new Game();
const displayGame = new DisplayGame();
game.init(gameSeeds.random(0, 0, 15, 25));

setInterval(() => {
  game.tick();
  displayGame.display(game.cells);
}, 1000);
