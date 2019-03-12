class reborn extends eui.Component implements eui.UIComponent {
	public bgImg: eui.Image;
	public scoreText: eui.Label;
	public timing: eui.Image;
	public rebornBtn: eui.Image;
	public ignoreBtn: eui.Label;
    public surpassGroup:eui.Group;

	public score = 0;
	public terval = null;
	public current_time = 5;
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
		this.bgImg.height=this.stage.stageHeight;
		this.scoreText.text = this.score + "";
		platform.openDataContext.postMessage({
			type: "passInit",
			score:that.score,
			width: 80,
			height: 80
		});
		let surpass = platform.openDataContext.createDisplayObject();
		this.surpassGroup.addChild(surpass);

		this.terval = setInterval(() => {
			that.current_time > 1 && that.current_time--;
			that.timing.texture = RES.getRes('img_time_0' + that.current_time + '_png');
			if (that.current_time <= 1) {
				clearInterval(that.terval);
			}
		}, 1000)
		setTimeout(function () {
			that.ignoreBtn.visible = true;
		}, 5000);
		that.ignoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ignoreFun, this);
	}
	public ignoreFun() {
		let parent = this.parent.parent;
		parent.removeChild(this.parent);
		parent.addChild(new gameOver(this.score));
	}

}