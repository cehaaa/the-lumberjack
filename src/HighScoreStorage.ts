export type IndividualHighScore = {
	name: string;
	score: number;
};

export class HighScoreStorage {
	ls: Storage;
	name: string;

	constructor() {
		this.ls = localStorage;
		this.name = "LUMBERJACK:HIGH_SCORE";
	}

	getHighScoreList() {
		const lsItem = this.ls.getItem(this.name);
		return (lsItem === null ? [] : JSON.parse(lsItem)) as IndividualHighScore[];
	}

	setHighScoreList({ name, score }: { name: string; score: number }) {
		const highScoreList = this.getHighScoreList();
		highScoreList.push({ name, score });

		this.ls.setItem(this.name, JSON.stringify(highScoreList));
	}
}

export default HighScoreStorage;
