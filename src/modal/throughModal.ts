class throughModal extends eui.Component implements eui.UIComponent {
	public processMask: eui.Rect;
	public process: eui.Rect;
	public tap_1: eui.Image;
	public tap_2: eui.Image;
	public item_0: eui.Image;
	public item_1: eui.Image;
	public item_2: eui.Image;


	public list = [];
	public chooseList = [];
	public terval = null;
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
		let that = this;
		// for (let i = 0; i < 3; i++) {
		// 	let ran = Math.random() > 0.5 ? 2 : 1;
		// 	that.list.push(ran);
		// 	that['item_' + i].texture = RES.getRes('img_spirit_0' + ran + '_png');
		// }
		// that.timeFun()
		// that.tap_1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { that.chooseFun(1) }, this);
		// that.tap_2.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { that.chooseFun(2) }, this);
	}
	public chooseFun(type) {
		let len = this.chooseList.length;
		if (this.list[len] == type) {
			this.chooseList.push(type);
			if (this.chooseList.length == 3) {
				//通过
				clearInterval(this.terval);
				this.endFun(true)
			}
		}
	}
	public timeFun() {
		let that = this;
		that.terval = setInterval(() => {
			if (that.processMask.width > 0) {
				that.processMask.width -= 20;
			} else {
				clearInterval(that.terval);
				that.endFun(false)
			}
		}, 200)
	}
	public endFun(type: boolean) {
		console.log(999, type)
		this.parent.removeChild(this);
	}

}