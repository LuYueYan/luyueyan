class getSuccess extends eui.Component implements eui.UIComponent {
	public ignoreBtn: eui.Label;
	public title: eui.Image;
	public type_2: eui.Image;
	public type_1: eui.Group;
	public word: eui.Label;
	public shareBtn: eui.Image;
	public body: eui.Group;


	public type = 1;//类型 -1--能量果 >-1--解锁球的index
	public nameOrNum = '';//球的名字或者能量果数量 （数量的话类似 'x100'）
	public constructor(type = -1, nameOrNum) {
		super();
		this.type = type;
		this.nameOrNum = nameOrNum;
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
		egret.Tween.get(this.body).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
		this.word.text = this.nameOrNum;
		
		if (this.type == -1) {
			this.type_1.visible = true;
		}else{
			this.type_2.visible = true;
			this.type_2.texture=RES.getRes('img_elf_'+this.type+'2_png');
			this.title.texture = RES.getRes('img_tittle_05_png');
		}
		that.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
		that.ignoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ignoreFun, this);
		
		that.ignoreBtn.visible = true;
		// setTimeout(function () {
		// 	that.ignoreBtn.visible = true;
		// }, 5000);
	}
	public shareFun() {
		CallbackMaster.openShare(() => { this.ignoreFun() }, false);
	}
	public ignoreFun() {
		let that=this;
		egret.Tween.get(this.body).to({ scaleX: 2, scaleY: 2 ,alpha:0}, 200).call(() => {
			that.parent.removeChild(that);
		});
	}
}