import Tree from "./Tree";
import Modal from "./Modal";
import Player from "./Player";
import TrunkEnum from "./enum/TrunkEnum";
import HighScoreStorage from "./HighScoreStorage";
interface GameConstructorOptions {
	tree: Tree;
	player: Player;
	highScoreStorage: HighScoreStorage;
}

class Game {
	tree: Tree;
	player: Player;
	highScoreStorage: HighScoreStorage;
	inputPlayerNameModalClass: Modal | null;

	score: number;
	gameOver: boolean;

	gameScreen: HTMLDivElement;
	scoreboard: HTMLSpanElement;
	closeGameButton: HTMLButtonElement;
	startNewGameButton: HTMLButtonElement;
	gameCountdownBeforeStartContainer: HTMLDivElement;

	constructor({ tree, player, highScoreStorage }: GameConstructorOptions) {
		this.tree = tree;
		this.player = player;
		this.inputPlayerNameModalClass = null;

		this.score = 0;
		this.gameOver = false;

		this.gameScreen = document.querySelector("#game-container")!;
		this.scoreboard = document.querySelector("#scoreboard span")!;
		this.closeGameButton = document.querySelector("#close-game-button")!;
		this.startNewGameButton = document.querySelector("#start-new-game-button")!;
		this.gameCountdownBeforeStartContainer = document.querySelector(
			"#game-countdown-before-start-container"
		)!;

		this.highScoreStorage = highScoreStorage;
	}

	init() {
		this.initGameUIComponent();
		this.initInputPlayerNameModal();
	}

	listener() {
		const handleKeyDown = (e: KeyboardEvent) => {
			const key = e.key.toUpperCase();

			if (key === "F") {
				this.tree.cutdownTree("left");
				this.player.shiftPlayerPosition("left");
				this.player.shiftPlayerEye("right");

				this.score += 10;
				this.gameOverChecker(handleKeyDown);
			}

			if (key === "J") {
				this.tree.cutdownTree("right");
				this.player.shiftPlayerPosition("right");
				this.player.shiftPlayerEye("left");

				this.score += 10;
				this.gameOverChecker(handleKeyDown);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		this.startNewGameButton.addEventListener(
			"click",
			this.startNewGameButtonHandler.bind(this)
		);

		this.closeGameButton.addEventListener(
			"click",
			this.closeGameButtonHandler.bind(this)
		);
	}

	initGameUIComponent() {
		this.tree.init();
		this.player.init();

		this.initScoreboard();
	}

	initScoreboard() {
		this.scoreboard.innerHTML = this.score.toString();
	}

	initInputPlayerNameModal() {
		this.inputPlayerNameModalClass = new Modal({
			isShow: false,
			modalOverlay: document.querySelector("#input-player-name-modal")!,
		});

		this.inputPlayerNameModalClass.init();
	}

	initCountdownBeforeGameStart(countdownDuration: number) {
		this.gameCountdownBeforeStartContainer.classList.remove("hide");
		this.gameCountdownBeforeStartContainer.classList.add("show");

		const countdownCounterContainer = this.gameCountdownBeforeStartContainer
			.children[0] as HTMLDivElement;

		const countdownPromise = new Promise<void>(resolve => {
			const countdown = setInterval(() => {
				countdownCounterContainer.classList.add("show-animation-scale");

				countdownCounterContainer.addEventListener("animationend", () => {
					countdownCounterContainer.classList.remove("show-animation-scale");
				});

				if (countdownDuration === 0) {
					countdownCounterContainer.innerHTML = "Start!";
				} else
					countdownCounterContainer.innerHTML = countdownDuration.toString();

				if (countdownDuration < 0) {
					this.gameCountdownBeforeStartContainer.classList.remove("show");
					this.gameCountdownBeforeStartContainer.classList.add("hide");

					clearInterval(countdown);
				}

				countdownDuration--;
			}, 1000);

			setTimeout(() => {
				resolve();
			}, 5000);
		});

		countdownCounterContainer.innerText = "";

		countdownPromise.then(() => {
			this.listener();
		});
	}

	gameOverChecker(handleKeyDown: (e: KeyboardEvent) => void) {
		const playerPosition = this.player.position;
		const currentTreeTrunk = this.tree.trunks[0];

		if (
			(currentTreeTrunk.type === TrunkEnum.BRANCH_LEFT &&
				playerPosition === "left") ||
			(currentTreeTrunk.type === TrunkEnum.BRANCH_RIGHT &&
				playerPosition === "right")
		) {
			window.removeEventListener("keydown", handleKeyDown);

			this.inputPlayerNameModalClass!.openModal();
		} else {
			this.scoreboard.innerHTML = this.score.toString();
		}
	}

	saveScoreToLocalStorage() {
		const playerName =
			document.querySelector<HTMLInputElement>("#input-player-name")!.value;

		this.highScoreStorage.setHighScoreList({
			name: playerName === "" ? "Anonymous" : playerName,
			score: this.score - 10 < 0 ? 10 : this.score - 10,
		});
	}

	resetGame() {
		this.score = 0;
		this.gameOver = false;

		this.tree.reset();
		this.player.reset();

		this.initScoreboard();
		this.initCountdownBeforeGameStart(3);
	}

	startNewGameButtonHandler() {
		this.inputPlayerNameModalClass!.closeModal();
		this.saveScoreToLocalStorage();
		this.resetGame();
	}

	closeGameButtonHandler() {
		this.inputPlayerNameModalClass!.closeModal();
		this.saveScoreToLocalStorage();

		const startModal = new Modal({
			isShow: true,
			modalOverlay: document.querySelector("#start-modal")!,
		});

		startModal.init();
	}
}

export default Game;
