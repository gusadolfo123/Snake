import Position from "./position";

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

  collision() {}

  init() {
    this.generateFood();
    this.snake.push(new Position(this.size, this.size));
    this.director = setInterval(() => {
      this.next();
      this.show();
    }, this.velocity);
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

  next() {
    for (let index = 0; index < this.snake.length; index++) {

      let positionPrev = Object.assign(new Position(), this.snake[index]);

      switch (this.direction) {
        case 1:
          this.snake[index].Y -= this.size;
          break;
        case 2:
          this.snake[index].Y += this.size;
          break;
        case 3:
          this.snake[index].X += this.size;
          break;
        case 4:
          this.snake[index].X -= this.size;
          break;
      }

      if (this.snake[0].X == this.food.X && this.snake[0].Y == this.food.Y) {
        this.score += 10;
        this.snake.push(positionPrev);
        this.generateFood();
      }
      break;
    }
  }

}

export default Game;