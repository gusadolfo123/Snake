import Position from './position';
import {isNullOrUndefined} from 'util';

class Game {
  constructor(size = 15, canvas) {
    this.food = new Position(0, 0);
    this.score = 0;
    this.size = size;
    this.snake = [];
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.director = null;
    this.direction = 2;
    this.velocity = 80;
  }

  generateFood() {
    this.food.X = this.randomNumber();
    this.food.Y = this.randomNumber();
  }

  randomNumber() {
    do {
      var number = Math.round(Math.floor(Math.random() * (this.canvas.width - 0) + parseInt(0)));
      var isPar = number % this.size;
    } while (isPar != 0);
    return number;
  }

  init() {
    this.generateFood();
    this.snake.push(new Position(this.size, this.size));
    this.director = setInterval(() => {
      // this.snake.map((element, index) => {
      this.next(this.snake[0], 0);
      // });
      this.collision();
      this.show();
    }, this.velocity);
  }

  collision() {
    let prev = Object.assign(new Position(), this.snake[0]);
    if (this.snake[0].X == this.food.X && this.snake[0].Y == this.food.Y) {
      this.score += 10;
      this.snake.push(prev);
      this.generateFood();
    }
  }

  show() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.snake.map(element => {
      this.ctx.fillStyle = 'green';
      this.ctx.fillRect(element.X, element.Y, this.size, this.size);
    });

    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.food.X, this.food.Y, this.size, this.size);
  }

  next(element, index) {
    let prev = Object.assign(new Position(), element);
    switch (this.direction) {
      case 1:
        element.Y -= this.size;
        break;
      case 2:
        element.Y += this.size;
        break;
      case 3:
        element.X += this.size;
        break;
      case 4:
        element.X -= this.size;
        break;
    }

    if (!isNullOrUndefined(this.snake[index + 1])) {
      this.next(this.snake[index + 1], index + 1);
    }
  }
}

export default Game;
