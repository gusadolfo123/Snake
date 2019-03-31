class Game {
  constructor() {}
  async mostrar() {
    console.log('mostrar');
    const result = await fetch('https://jsonplaceholder.typicode.com/users');

    result.json().then(response => {
      console.log(response);
    });
  }
}

export default Game;
