class reborn extends eui.Component implements eui.UIComponent {
	public scoreText: eui.Label;
	public timing: eui.Image;
	public rebornBtn: eui.Image;
	public ignoreBtn: eui.Label;


	public score = 0;
	public constructor(score = 0) {
		super();
		this.score = score;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init()
	}
	public init() {
		let that = this;
		this.scoreText.text = this.score + "";
		setTimeout(function () {
			that.ignoreBtn.visible = true;
		}, 5000);
		that.ignoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ignoreFun, this);
	}
	public ignoreFun() {
		let parent = this.parent.parent;
		parent.removeChild(this.parent);
		parent.addChild(new gameOver());
	}

}