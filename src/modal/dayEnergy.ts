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
		this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
		this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this)
	}
	public getFun() {

	}
	public shareFun() {
		CallbackMaster.openShare(null, false, '&type=energy');
	}
	public closeFun() {
		this.parent.removeChild(this);
	}

}