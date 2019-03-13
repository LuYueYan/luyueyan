class tryModal extends eui.Component implements eui.UIComponent {
	public sureBtn: eui.Image;
	public ignoreBtn: eui.Label;
	public ballImg:eui.Image;

	public currentBall = 0;//试用的类型
	public constructor(index) {
		super();
		this.currentBall=index;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init()
	}
	public init() {
		this.ballImg.texture=RES.getRes('img_elf_'+this.currentBall+'2_png');
		this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sureFun, this);
		this.ignoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ignoreFun, this)
	}
	public sureFun() {
		let parent = this.parent.parent;
		parent.removeChild(this.parent);
		parent.addChild(new startScene(true));
	}
	public ignoreFun() {
		let parent = this.parent.parent;
		parent.removeChild(this.parent);
		parent.addChild(new startScene());
	}

}