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
		let that = this;
		egret.Tween.get(this.body).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
		switch (userDataMaster.todayEnergy) {
			case 0:
				break;
			case 1:
				that.getBtn.texture = RES.getRes('btn_receive_video_png');
				break;
			case 2:
				that.getBtn.texture = RES.getRes('btn_receive_04_png');
				break;
			default: break;
		}
		that.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
		this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
	}
	public getFun() {
		let that = this;
		let state = userDataMaster.todayEnergy;
		if (state == 0) {
			suc('video');
		} else if (state == 1) {
			AdMaster.useVideo(() => {
				suc('04');
			}, () => {
				CallbackMaster.openShare(() => {
					suc('04');
				})
			});
		}
		function suc(str) {
			userDataMaster.dayEnergy.num++;
			userDataMaster.myGold += 100;
			that.addChild(new getSuccess(-1, 'x 100'));
			that.getBtn.texture = RES.getRes('btn_receive_' + str + '_png');
		}
	}
	public shareFun() {
		CallbackMaster.openShare(null, false, '&type=energy&day=' + userDataMaster.getToday());
	}
	public closeFun() {
		let that = this;
		egret.Tween.get(this.body).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 200).call(() => {
			that.parent.removeChild(that);
		});

	}

}