import Position from './position';
import {
  isNullOrUndefined
} from 'util';

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
    this.velocity = 50;
    this.a = new AudioContext(); // browsers limit the number of concurrent audio contexts, so you better re-use'em
  }

  beep(vol, freq, duration) {
    var v = this.a.createOscillator();
    var u = this.a.createGain();
    v.connect(u);
    v.frequency.value = freq;
    v.type = 'square';
    u.connect(this.a.destination);
    u.gain.value = vol * 0.01;
    v.start(this.a.currentTime);
    v.stop(this.a.currentTime + duration * 0.001);
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

  collision() {
    // valida colision contra paredes
    if (this.snake[0].Y == this.canvas.height) {
      console.log(this.snake[0].Y, this.snake[0].X);
      console.log('Colisiono 1');
    } else if (this.snake[0].Y == -this.size) {
      console.log(this.snake[0].Y, this.snake[0].X);
      console.log('Colisiono 2');
    } else if (this.snake[0].X == this.canvas.width) {
      console.log(this.snake[0].X, this.snake[0].Y);
      console.log('Colisiono 3');
    } else if (this.snake[0].X == -this.size) {
      console.log(this.snake[0].X, this.snake[0].Y);
      console.log('Colisiono 4');
    }

    // valida colision contra si mismo
    for (let index = 1; index < this.snake.length; index++) {
      const element = this.snake[index];
      if (this.snake[0].X == element.X && this.snake[0].Y == element.Y) {
        console.log('Colisiono contra si mismo');
      }
    }
  }

  init() {
    this.generateFood();
    this.snake.push(new Position(this.size, this.size));
    this.director = setInterval(() => {
      // this.next();
      //this.nextU(this.snake.length - 1);
      this.next();
      this.collision();
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
        this.beep(100, 520, 200);
        this.generateFood();
      }
      break;
    }
  }

  nextU(index) {
    console.log(index, this.snake);
    if (isNullOrUndefined(this.snake[index])) return 0;
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
    return this.nextU(index++);
  }
}

export default Game;