import Game from "./Game";
import Modal from "./Modal";
import HighScoreStorage from "./HighScoreStorage";

interface UIConstructorOptions {
	game: Game;
	highScoreStorage: HighScoreStorage;
}

class UI {
	game: Game;

	startModalClass: Modal | null;
	highScoreModalClass: Modal | null;
	inputPlayerNameModalClass: Modal | null;

	scoreboard: HTMLDivElement;

	highScoreStorage: HighScoreStorage;

	constructor({ game, highScoreStorage }: UIConstructorOptions) {
		this.game = game;
		this.startModalClass = null;
		this.highScoreModalClass = null;
		this.inputPlayerNameModalClass = null;

		this.scoreboard = document.querySelector("#scoreboard span")!;

		this.highScoreStorage = highScoreStorage;
	}

	init() {
		this.listener();
		this.initStartModal();

		this.initHighScoreList();
		this.initHighScoreModal();
		this.initInputPlayerNameModal();

		this.game.init({
			inputPlayerNameModalClass: this.inputPlayerNameModalClass,
		});
	}

	listener() {
		// element
		const startGameButton =
			document.querySelector<HTMLButtonElement>("#start-game-button")!;
		const showHighScoreModalButton = document.querySelector<HTMLButtonElement>(
			"#show-high-score-modal-button"
		)!;
		const closeShowHighScoreModalButton =
			document.querySelector<HTMLButtonElement>(
				"#close-high-score-modal-button"
			)!;

		const startNewGameButton = document.querySelector<HTMLButtonElement>(
			"#start-new-game-button"
		)!;
		const closeInputPlayerNameModalButton =
			document.querySelector<HTMLButtonElement>(
				"#close-input-player-name-modal-button"
			)!;

		startGameButton.addEventListener(
			"click",
			this.startGameButtonListener.bind(this)
		);

		showHighScoreModalButton.addEventListener(
			"click",
			this.showHighScoreModalButtonListener.bind(this)
		);

		closeShowHighScoreModalButton.addEventListener(
			"click",
			this.closeShowHighScoreModalButtonListener.bind(this)
		);

		startNewGameButton.addEventListener(
			"click",
			this.startNewGameButtonListener.bind(this)
		);

		closeInputPlayerNameModalButton.addEventListener(
			"click",
			this.closeInputPlayerNameModalButtonListener.bind(this)
		);
	}

	initStartModal() {
		this.startModalClass = new Modal({
			isShow: true,
			modalOverlay: document.querySelector<HTMLDialogElement>("#start-modal")!,
		});

		this.startModalClass.init();
	}

	initHighScoreModal() {
		this.highScoreModalClass = new Modal({
			isShow: false,
			modalOverlay:
				document.querySelector<HTMLDialogElement>("#high-score-modal")!,
		});

		this.highScoreModalClass.init();
	}

	initInputPlayerNameModal() {
		this.inputPlayerNameModalClass = new Modal({
			isShow: false,
			modalOverlay: document.querySelector<HTMLDialogElement>(
				"#input-player-name-modal"
			)!,
		});

		this.inputPlayerNameModalClass.init();
	}

	initScoreBoard() {
		this.scoreboard.innerHTML = this.game.score.toString();
	}

	initHighScoreList() {
		const highScoreContainer = document.querySelector<HTMLDivElement>(
			"#high-score-container"
		)!;
		const emptyHighScoreIndicator = document.querySelector<HTMLDivElement>(
			"#empty-high-score-indicator"
		)!;

		const highScoreList = this.highScoreStorage
			.getHighScoreList()
			.sort((a, b) => b.score - a.score);

		if (highScoreList.length <= 0) {
			highScoreContainer.classList.add("empty");
			emptyHighScoreIndicator.style.display = "block";
			return;
		}

		const html = highScoreList.reduce((acc: string, curr) => {
			return (acc += `
        <div class="high-score-card">
          <div>${curr.name}</div>
          <div>${curr.score}</div>
        </div>
      `);
		}, "");

		highScoreContainer.classList.remove("empty");
		highScoreContainer.classList.add("not-empty");

		// emptyHighScoreIndicator.style.display = "none";

		highScoreContainer.innerHTML = html;
	}

	startGameButtonListener() {
		this.startModalClass!.closeModal();
		this.game.initCountdownBeforeGameStart(3);
	}

	showHighScoreModalButtonListener() {
		this.initHighScoreList();
		this.startModalClass!.closeModal();
		this.highScoreModalClass!.openModal();
	}

	closeShowHighScoreModalButtonListener() {
		this.startModalClass!.openModal();
		this.highScoreModalClass!.closeModal();
	}

	startNewGameButtonListener() {
		this.game.saveScoreToLocalStorage();
		this.game.resetGame();
		this.game.initCountdownBeforeGameStart(3);

		this.scoreboard.innerHTML = this.game.score.toString();

		this.inputPlayerNameModalClass?.closeModal();
	}

	closeInputPlayerNameModalButtonListener() {
		this.game.saveScoreToLocalStorage();
		this.game.resetGame();

		this.scoreboard.innerHTML = this.game.score.toString();

		this.inputPlayerNameModalClass!.closeModal();
		this.startModalClass!.openModal();
	}
}

export default UI;
