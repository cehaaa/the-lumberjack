import "./src/style/tree.css";
import "./src/style/style.css";
import "./src/style/modal.css";
import "./src/style/player.css";
import "./src/style/button.css";
import "./src/style/animation.css";
import "./src/style/high-score.css";

import UI from "./src/UI";
import Game from "./src/Game";
import Tree from "./src/Tree";
import Player from "./src/Player";
import HighScoreStorage from "./src/HighScoreStorage";

const highScoreStorage = new HighScoreStorage();

const player = new Player();

const tree = new Tree();

const game = new Game({
	tree: tree,
	player: player,
	highScoreStorage: highScoreStorage,
});

const ui = new UI({
	game: game,
	highScoreStorage: highScoreStorage,
});

ui.init();
