class dayEnergy extends eui.Component implements eui.UIComponent {
	public closeBtn: eui.Button;
	public shareBtn: eui.Button;
	public getBtn: eui.Image;
	public body: eui.Group;

	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init()
	}
	public init() {
		egret.Tween.get(this.body).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
		if (!userDataMaster.todayEnergy) {
			this.getBtn.texture = RES.getRes('btn_receive_04_png');
		} else {
			this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
		}
		this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
	}
	public getFun() {
		if (userDataMaster.todayEnergy) {
			userDataMaster.updateTodayEnergy();
			this.getBtn.texture = RES.getRes('btn_receive_04_png');
			userDataMaster.myGold += 100;
			this.addChild(new getSuccess(-1, 'x 100'));
			this.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
		}
	}
	public shareFun() {
		CallbackMaster.openShare(null, false, '&type=energy&day=' + userDataMaster.getToday());
	}
	public closeFun() {
		let that=this;
		egret.Tween.get(this.body).to({ scaleX: 2, scaleY: 2 ,alpha:0}, 200).call(() => {
			that.parent.removeChild(that);
		});

	}

}