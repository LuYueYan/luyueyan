class getSuccess extends eui.Component implements eui.UIComponent {
	public ignoreBtn: eui.Label;
	public title: eui.Image;
	public type_2: eui.Image;
	public type_1: eui.Group;
	public word: eui.Label;
	public shareBtn: eui.Image;



	public type = 1;//类型 1--能量果 2--解锁球
	public nameOrNum='';//球的名字或者能量果数量 （数量的话类似 'x100'）
	public constructor(type = 1,nameOrNum) {
		super();
		this.type = type;
		this.nameOrNum=nameOrNum;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init();
	}
	public init() {
		let that = this;
		this.word.text=this.nameOrNum;
		this['type_'+this.type].visible = true;
		if (this.type == 2) {
			this.title.texture = RES.getRes('img_tittle_05_png');

		}
		that.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
		that.ignoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ignoreFun, this);
		setTimeout(function () {
			that.ignoreBtn.visible = true;
		}, 5000);
	}
	public shareFun() {
		CallbackMaster.openShare(null, false);
	}
	public ignoreFun() {
		this.parent.removeChild(this);
	}

}