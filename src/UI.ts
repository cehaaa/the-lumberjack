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

	startModal: HTMLDialogElement;
	highScoreModal: HTMLDialogElement;
	startGameButton: HTMLButtonElement;
	showHighScoreModalButton: HTMLButtonElement;
	closeShowHighScoreModalButton: HTMLButtonElement;

	highScoreContainer: HTMLDivElement;
	emptyHighScoreIndicator: HTMLDivElement;

	highScoreStorage: HighScoreStorage;

	constructor({ game, highScoreStorage }: UIConstructorOptions) {
		this.game = game;
		this.startModalClass = null;
		this.highScoreModalClass = null;

		this.startModal = document.querySelector("#start-modal")!;
		this.highScoreModal = document.querySelector("#high-score-modal")!;
		this.startGameButton = document.querySelector("#start-game-button")!;
		this.showHighScoreModalButton = document.querySelector(
			"#show-high-score-modal-button"
		)!;
		this.closeShowHighScoreModalButton = document.querySelector(
			"#close-high-score-modal-button"
		)!;

		this.highScoreContainer = document.querySelector("#high-score-container")!;
		this.emptyHighScoreIndicator = document.querySelector(
			"#empty-high-score-indicator"
		)!;

		this.highScoreStorage = highScoreStorage;
	}

	init() {
		this.listener();
		this.initStartModal();

		this.initHighScoreModal();
		this.initHighScoreList();

		this.game.init();
	}

	listener() {
		this.startGameButton.addEventListener(
			"click",
			this.startGameButtonListener.bind(this)
		);

		this.showHighScoreModalButton.addEventListener(
			"click",
			this.showHighScoreModalButtonListener.bind(this)
		);

		this.closeShowHighScoreModalButton.addEventListener(
			"click",
			this.closeShowHighScoreModalButtonListener.bind(this)
		);
	}

	initStartModal() {
		this.startModalClass = new Modal({
			isShow: true,
			modalOverlay: this.startModal,
		});

		this.startModalClass.init();
	}

	initHighScoreModal() {
		this.highScoreModalClass = new Modal({
			isShow: false,
			modalOverlay: this.highScoreModal,
		});

		this.highScoreModalClass.init();
	}

	initHighScoreList() {
		const highScoreList = this.highScoreStorage.getHighScoreList();

		if (highScoreList.length <= 0) {
			this.highScoreContainer.classList.add("empty");
			this.emptyHighScoreIndicator.style.display = "block";
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

		this.highScoreContainer.classList.remove("empty");
		this.highScoreContainer.classList.add("not-empty");

		this.emptyHighScoreIndicator.style.display = "none";

		this.highScoreContainer.innerHTML = html;
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
}

export default UI;
