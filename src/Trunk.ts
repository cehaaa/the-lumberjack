import TrunkEnum from "./enum/TrunkEnum";

class Trunk {
	getTrunkElementByType(type: TrunkEnum): string {
		const trunks: {
			[key: string]: string;
		} = {
			NORMAL: this.normalTrunk(),
			BRANCH_LEFT: this.branchLeftTrunk(),
			BRANCH_RIGHT: this.branchRightTrunk(),
		};

		return trunks[type];
	}

	normalTrunk(): string {
		return `
      <div class="tree-trunk">
        <div class="chop"></div>
        <div class="trunk light"></div>
        <div class="trunk medium">
          <div class="texture"></div>
        </div>
        <div class="trunk dark"></div>
      </div>
    `;
	}

	branchRightTrunk(): string {
		return `
      <div class="tree-trunk">
        <div class="chop"></div>
        <div class="branch right"></div>

        <div class="trunk light"></div>
        <div class="trunk medium">
          <div class="texture"></div>
        </div>
        <div class="trunk dark"></div>
      </div>
    `;
	}

	branchLeftTrunk(): string {
		return `
      <div class="tree-trunk">
        <div class="chop"></div>
        <div class="branch left"></div>
        <div class="trunk light"></div>
        <div class="trunk medium">
          <div class="texture"></div>
        </div>
        <div class="trunk dark"></div>
      </div>
    `;
	}
}

export default Trunk;
