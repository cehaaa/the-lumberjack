interface ModalConstructorOptions {
	isShow: boolean;
	modalOverlay: HTMLDialogElement;
}

class Modal {
	isShow: boolean;
	modalOverlay: HTMLDialogElement;
	modalContainer: HTMLDivElement;

	resolveCallback: ((value: unknown) => void) | null;

	constructor({ modalOverlay, isShow }: ModalConstructorOptions) {
		this.isShow = isShow;
		this.modalOverlay = modalOverlay;
		this.modalContainer = this.modalOverlay.children[0] as HTMLDivElement;

		this.resolveCallback = null;
	}

	init() {
		if (this.isShow) {
			this.openModal();
		} else {
			this.closeModal();
		}

		this.listener();
	}

	listener() {
		this.modalContainer.addEventListener("animationend", () => {
			this.modalOverlay.style.display = this.isShow ? "flex" : "none";

			if (this.resolveCallback) {
				this.resolveCallback(true);
				this.resolveCallback = null;
			}
		});
	}

	openModal() {
		return new Promise(resolve => {
			this.isShow = true;

			this.modalOverlay.style.display = "flex";

			this.modalContainer.classList.remove("hide-animation");
			this.modalContainer.classList.add("show-animation");

			this.resolveCallback = resolve;
		});
	}

	closeModal() {
		return new Promise(resolve => {
			this.isShow = false;

			this.modalContainer.classList.remove("show-animation");
			this.modalContainer.classList.add("hide-animation");

			this.resolveCallback = resolve;
		});
	}
}

export default Modal;
