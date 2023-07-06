interface HeroConstructorOptions {
	playerContainer: HTMLDivElement;
	playerEyes: HTMLDivElement[];
}

class Player {
	position: string;

	playerContainer: HTMLDivElement;
	playerEyes: HTMLDivElement[];

	constructor({ playerContainer, playerEyes }: HeroConstructorOptions) {
		this.position = "left";
		this.playerContainer = playerContainer;
		this.playerEyes = playerEyes;
	}

	init() {
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
}

export default Player;
