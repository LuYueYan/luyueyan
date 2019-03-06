class friendHelp extends eui.Component implements eui.UIComponent {
	public mask_0: eui.Rect;
	public friend_0: eui.Image;
	public icon_0: eui.Image;
	public text_0: eui.Label;
	public get_0: eui.Button;
	public mask_1: eui.Rect;
	public friend_1: eui.Image;
	public icon_1: eui.Image;
	public text_1: eui.Label;
	public get_1: eui.Button;
	public mask_2: eui.Rect;
	public friend_2: eui.Image;
	public icon_2: eui.Image;
	public text_2: eui.Label;
	public get_2: eui.Button;
	public mask_3: eui.Rect;
	public friend_3: eui.Image;
	public icon_3: eui.Image;
	public text_3: eui.Label;
	public get_3: eui.Button;
	public mask_4: eui.Rect;
	public friend_4: eui.Image;
	public icon_4: eui.Image;
	public text_4: eui.Label;
	public get_4: eui.Button;
	public mask_5: eui.Rect;
	public friend_5: eui.Image;
	public icon_5: eui.Image;
	public text_5: eui.Label;
	public get_5: eui.Button;
	public ball: eui.Image;
	public closeBtn: eui.Button;
	public getBtn: eui.Image;




	public haveGet = false;//是否已经拥有火火球
	public list = [
		{ id: 1, avatarUrl: '/resource/assets/Aimages/img_spirit_01.png', state: 0 },
		{ id: 2, avatarUrl: '/resource/assets/Aimages/img_spirit_01.png', state: 1 },
		{ id: 3, avatarUrl: '/resource/assets/Aimages/img_spirit_01.png', state: 0 }
	];//state状态值0-未领取 1-已领取
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
		for (let i = 0, len = that.list.length; i < len; i++) {
			that['friend_' + i].source = that.list[i].avatarUrl;
			that['friend_' + i].mask = that['mask_' + i];
			that['text_' + i].text = "x50";
			that['icon_' + i].visible = true;
			if (that.list[i].state == 0) {
				that['get_' + i].visible = true;
				that['get_' + i].addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.getEnergyFun(i) }, this);
			}
		}
		this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
		if (that.haveGet && that.list.length >= 6) {
			//已解锁
		}
		if (!that.haveGet && that.list.length >= 6) {
			//可解锁
			that.getBtn.texture = RES.getRes('btn_unlocking_png');
		}
	}
	public getEnergyFun(i) {
		let gold = userDataMaster.myGold;
		gold += 50;
		userDataMaster.myGold = gold;
		this['get_' + i].visible = false;
		this.list[i].state = 1;
		this.addChild(new getSuccess(1,'x 50'));
	}
	public getFun() {
		let that = this;
		if (that.list.length >= 6) {
			//邀请完成 --解锁
			if (!that.haveGet) {
				//未解锁
				that.addChild(new getSuccess(2,'火火球'));
			} else {
              //已解锁
			}
		} else {
			CallbackMaster.openShare(null, false);
		}

	}
	public closeFun() {
		this.parent.removeChild(this);
	}
}