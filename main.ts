import "./src/style/tree.css";
import "./src/style/style.css";
import "./src/style/modal.css";
import "./src/style/button.css";
import "./src/style/animation.css";

import Game from "./src/Game";
import UI from "./src/UI";

const game = new Game({
	gameEl: document.querySelector("#game")!,
});

const ui = new UI({
	gameClass: game,

	gameScreen: document.querySelector("#game")!,
	startModal: document.querySelector("#start-modal")!,
	gameModeDurationRadios: [
		...document.querySelectorAll(".game-duration input[type='radio']"),
	] as Array<HTMLInputElement>,
	startGameButton: document.querySelector("#start-game-button")!,
});

ui.init();
