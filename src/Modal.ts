interface ModalConstructorOptions {
	modalEl: HTMLDialogElement;
	isShow: boolean;
}

class Modal {
	modalEl: HTMLDialogElement;
	isShow: boolean;

	resolveCallback: null | ((value: unknown) => void);

	constructor({ modalEl, isShow }: ModalConstructorOptions) {
		this.modalEl = modalEl;
		this.isShow = isShow;

		this.resolveCallback = null;
	}

	init() {
		if (this.isShow) {
			this.openModal();
		} else {
			this.closeModal();
		}

		// this.listener();
	}

	listener() {
		this.modalEl.addEventListener("animationend", () => {
			if (this.isShow) {
				this.modalEl.classList.remove("hide");
			} else {
				this.modalEl.classList.remove("show");
			}

			if (this.resolveCallback) {
				this.resolveCallback(true);
				this.resolveCallback = null;
			}
		});
	}

	openModal(): Promise<void> {
		return new Promise(resolve => {
			this.isShow = true;

			this.modalEl.classList.remove("hide");
			this.modalEl.classList.add("show");

			resolve();

			// this.resolveCallback = resolve;
		});
	}

	closeModal() {
		// return new Promise(resolve => {
		// 	this.isShow = false;
		// 	this.modalEl.classList.add("hide-animation");
		// 	this.modalEl.addEventListener("animationend", () => {
		// 		this.modalEl.classList.remove("show");
		// 		this.modalEl.classList.remove("hide-animation");
		// 	});
		// 	this.resolveCallback = resolve;
		// });
	}
}

export default Modal;
