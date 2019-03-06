class dayEnergy extends eui.Component implements eui.UIComponent {
	public closeBtn: eui.Button;
	public shareBtn: eui.Button;
	public getBtn: eui.Image;


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
		if (!userDataMaster.todayEnergy) {
			this.getBtn.texture = RES.getRes('btn_receive_04_png');
		} else {
			this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
		}
		this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
	}
	public getFun() {
        userDataMaster.updateTodayEnergy();
		this.getBtn.texture = RES.getRes('btn_receive_04_png');
		userDataMaster.myGold+=100;
		this.addChild(new getSuccess(1,'x 100'));
		this.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
	}
	public shareFun() {
		CallbackMaster.openShare(null, false, '&type=energy');
	}
	public closeFun() {
		this.parent.removeChild(this);
	}

}