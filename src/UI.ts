import Game from "./Game";
import Modal from "./Modal";

interface UIConstructorOptions {
	gameClass: Game;

	gameScreen: HTMLDivElement;
	startModal: HTMLDialogElement;
	gameModeDurationRadios: Array<HTMLInputElement>;
	startGameButton: HTMLButtonElement;
}

class UI {
	gameClass: Game;
	startModalClass: Modal | null;

	gameScreen: HTMLDivElement;
	startModal: HTMLDialogElement;
	gameModeDurationRadios: Array<HTMLInputElement>;
	startGameButton: HTMLButtonElement;

	gameDuration: number;

	constructor({
		gameClass,
		gameScreen,
		startModal,
		gameModeDurationRadios,
		startGameButton,
	}: UIConstructorOptions) {
		this.gameClass = gameClass;

		this.gameScreen = gameScreen;
		this.startModal = startModal;
		this.gameModeDurationRadios = gameModeDurationRadios;
		this.startGameButton = startGameButton;

		this.startModalClass = null;

		this.gameDuration = this.gameModeDurationRadios.find(
			radio => radio.checked
		)!.value as unknown as number;
	}

	init() {
		this.listener();

		this.initStartModal();
	}

	listener() {
		this.gameModeDurationRadios.forEach(radio => {
			radio.addEventListener(
				"change",
				this.gameModeDurationRadiosListener.bind(this)
			);
		});

		this.startGameButton.addEventListener(
			"click",
			this.startGameButtonListener.bind(this)
		);
	}

	initStartModal() {
		this.startModalClass = new Modal({
			modalEl: this.startModal,
			isShow: true,
		});

		this.startModalClass.init();
	}

	gameModeDurationRadiosListener(e: Event) {
		const target = e.target as HTMLInputElement;
		const value = target.value;

		this.gameDuration = Number(value);
	}

	startGameButtonListener() {
		this.startModalClass!.closeModal();
	}
}

export default UI;
