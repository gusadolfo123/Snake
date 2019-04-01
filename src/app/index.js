import 'isomorphic-fetch';
import '../app/index.css';
import Game from './classes/game';

const canvas = document.getElementById('canvas');
const game = new Game(15, canvas);

const main = () => {
    game.init();
};

main();

document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 38:
            game.direction = 1;
            break;
        case 40:
            game.direction = 2;
            break;
        case 39:
            game.direction = 3;
            break;
        case 37:
            game.direction = 4;
            break;
    }
});