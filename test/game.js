import chai from 'chai';
import dirtyChai from 'dirty-chai';
import Game from '../src/game.js';

const expect = chai.expect;
chai.use(dirtyChai);

describe('game', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  it('should be defined', () => {
    expect(game).to.exist();
  });

  it('should return live cell when live cell is seeded', () => {
    const seed = [[0, 2]];
    game.init(seed);

    expect(game.isAlive(0, 2)).to.be.true();
  });

  it('should have live cells with 8 neighbours', () => {
    const seed = [[0, 2]];
    game.init(seed);

    const neighbours = game.getNeighbours(0, 2);

    expect(neighbours.length).to.equal(8);
  });
  
  it('should have cell die when less than 2 live neighbours', () => {
    const seed = [[0, 2]];
    game.init(seed);

    game.tick();
    
    expect(game.isAlive(0, 2)).to.be.false();
  });

  it('should have cell live when 2 live neighbours', () => {
    const seed = [[0, 2], [0, 1], [1, 2]];
    game.init(seed);

    game.tick();

    expect(game.isAlive(0, 2)).to.be.true();
  });

  it('should have cell live when 3 live neighbours', () => {
    const seed = [[0, 2], [0, 1], [1, 2]];
    game.init(seed);

    game.tick();

    expect(game.isAlive(0, 2)).to.be.true();
  });

  it('should have cell die when more than 3 live neighbours', () => {
    const seed = [[0, 2], [0, 1], [1, 2], [1, 1], [0, 3]];
    game.init(seed);

    game.tick();

    expect(game.isAlive(0, 2)).to.be.false();
  });

  it('should have cell live when 3 live neighbours', () => {
    const seed = [[0, 1], [1, 2], [1, 1]];
    game.init(seed);

    game.tick();

    expect(game.isAlive(0, 2)).to.be.true();
  });

  it('should have blinker behaviour', () => {
    const seed = [[2, 2], [1, 2], [3, 2]];
    game.init(seed);

    game.tick();

    expect(game.isAlive(2, 3)).to.be.true();
    expect(game.isAlive(2, 2)).to.be.true();
    expect(game.isAlive(2, 1)).to.be.true();

    expect(game.isAlive(3, 2)).to.be.false();
    expect(game.isAlive(1, 2)).to.be.false();
  });
});
