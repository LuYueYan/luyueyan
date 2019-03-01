class getEnergyModal extends eui.Component implements eui.UIComponent {
	public body: eui.Group;
	public getBtn: eui.Image;
	public getText: eui.Label;
	public closeBtn: eui.Button;
	public numText: eui.Label;
	public state: eui.Image;


	public currentNum = 3;//已领取
	public haveGet = false;
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
		this.getText.text = "当前（" + this.currentNum + "/5）";
		if (this.haveGet) {
			this.getBtn.texture = RES.getRes('');
		}
		this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
	}
	public getFun() {
		if (!this.haveGet) {
			this.currentNum++;
			this.getText.text = "当前（" + this.currentNum + "/5）";
			this.state.visible = true;
			this.numText.visible = true;
			let gold = userDataMaster.myGold + 25;
			userDataMaster.myGold = gold;
			this.haveGet = true;
		} else {
			CallbackMaster.openShare(null, false, "&type=energy");
		}

	}
	public closeFun() {
		this.parent.removeChild(this);
	}

}