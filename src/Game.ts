interface GameConstructorOptions {
	gameEl: HTMLDivElement;
}

class Game {
	gameEl: HTMLDivElement;
	gameDuration: number;

	constructor({ gameEl }: GameConstructorOptions) {
		this.gameEl = gameEl;
		this.gameDuration = 0;
	}

	start() {
		// this.gameEl.classList.add("show-up");
		// this.gameEl.addEventListener("animationend", () => {
		// 	this.gameEl.classList.remove("show-up");
		// });
	}
}

export default Game;
