class Player {
	position: string;

	playerContainer: HTMLDivElement;
	playerEyes: HTMLDivElement[];

	constructor() {
		this.position = "left";
		this.playerContainer = document.querySelector("#player-container")!;
		this.playerEyes = Array.from(document.querySelectorAll(".eye"));
	}

	init() {
		this.playerContainer.classList.remove("hide");
		this.playerContainer.classList.add("show");

		this.shiftPlayerPosition("left");
		this.shiftPlayerEye("right");
	}

	shiftPlayerPosition(position: string) {
		this.playerContainer.classList.remove(this.position);

		this.position = position;

		this.playerContainer.classList.add(this.position);
	}

	shiftPlayerEye(position: string) {
		this.playerEyes.forEach(eye => {
			const cornea = eye.children[0];

			cornea.classList.remove(position === "left" ? "right" : "left");

			cornea.classList.add(position === "right" ? "right" : "left");
		});
	}

	reset() {
		this.shiftPlayerEye("right");
		this.shiftPlayerPosition("left");
	}
}

export default Player;
