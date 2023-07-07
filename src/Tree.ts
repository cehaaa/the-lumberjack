import Trunk from "./Trunk";
import TrunkEnum from "./enum/TrunkEnum";

interface TrunkInterface {
	type: TrunkEnum;
	element: string;
}

class Tree {
	treeContainer: HTMLDivElement;
	treeTrunksContainer: HTMLDivElement;
	treeCutdownAnimationContainer: HTMLDivElement;

	trunks: Array<TrunkInterface>;
	trunkType: Array<TrunkEnum>;

	constructor() {
		this.treeContainer = document.querySelector("#tree-container")!;
		this.treeTrunksContainer = document.querySelector(
			"#tree-trunks-container"
		)!;
		this.treeCutdownAnimationContainer = document.querySelector(
			"#tree-cutdown-animation-container"
		)!;

		this.trunks = [];
		this.trunkType = [
			TrunkEnum.NORMAL,
			TrunkEnum.BRANCH_LEFT,
			TrunkEnum.BRANCH_RIGHT,
		];
	}

	init() {
		this.initDefaultAmountOfTrunks();
		this.renderTrunks();
	}

	getRandomTrunkType() {
		const { floor, random } = Math;
		const index = floor(random() * this.trunkType.length);

		return this.trunkType[index];
	}

	generateSingleTrunk() {
		const trunk = new Trunk();
		const type = this.getRandomTrunkType();

		if (type === TrunkEnum.BRANCH_LEFT || type === TrunkEnum.BRANCH_RIGHT) {
			this.trunks.push({
				type: TrunkEnum.NORMAL,
				element: trunk.getTrunkElementByType(TrunkEnum.NORMAL),
			});
		}

		this.trunks.push({
			type,
			element: trunk.getTrunkElementByType(type),
		});
	}

	initDefaultAmountOfTrunks() {
		const DEFAULT_AMOUNT_OF_TRUNKS = 6;

		const trunk = new Trunk();

		for (let i = 0; i < DEFAULT_AMOUNT_OF_TRUNKS; i++) {
			const type = this.getRandomTrunkType();

			// prevent first trunk to be left branch
			if (i === 0 && type === TrunkEnum.BRANCH_LEFT) {
				i--;
				continue;
			}

			// prevent no gap between branch
			// always add normal trunk before branch
			if (type === TrunkEnum.BRANCH_LEFT || TrunkEnum.BRANCH_RIGHT) {
				this.trunks.push({
					type: TrunkEnum.NORMAL,
					element: trunk.getTrunkElementByType(TrunkEnum.NORMAL),
				});
			}

			this.trunks.push({
				type,
				element: trunk.getTrunkElementByType(type),
			});
		}
	}

	renderTrunks() {
		this.treeTrunksContainer.innerHTML = "";

		this.trunks.forEach(trunk => {
			this.treeTrunksContainer.innerHTML += trunk.element;
		});
	}

	cutdownTree(playerPosition: string) {
		this.animationSpamHandler(playerPosition);

		this.trunks.shift();
		this.generateSingleTrunk();
		this.renderTrunks();
	}

	animationSpamHandler(playerPosition: string) {
		const cutdownAnimationBlock = document.createElement("div");

		cutdownAnimationBlock.classList.add("cutdown");
		cutdownAnimationBlock.classList.add(
			playerPosition === "left" ? "right" : "left"
		);
		cutdownAnimationBlock.classList.add(
			playerPosition === "left"
				? "falling-to-right-animation"
				: "falling-to-left-animation"
		);

		this.treeCutdownAnimationContainer.appendChild(cutdownAnimationBlock);
		cutdownAnimationBlock.addEventListener("animationend", () => {
			this.treeCutdownAnimationContainer.removeChild(cutdownAnimationBlock);
		});
	}

	reset() {
		this.trunks = [];
		this.initDefaultAmountOfTrunks();
		this.renderTrunks();
	}
}

export default Tree;
