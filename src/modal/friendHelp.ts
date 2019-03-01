class friendHelp extends eui.Component implements eui.UIComponent {
	public closeBtn: eui.Button;
	public ball: eui.Image;
	public mask_0: eui.Rect;
	public friend_0: eui.Image;
	public icon_0: eui.Image;
	public text_0: eui.Label;
	public mask_1: eui.Rect;
	public friend_1: eui.Image;
	public icon_1: eui.Image;
	public text_1: eui.Label;
	public mask_2: eui.Rect;
	public friend_2: eui.Image;
	public icon_2: eui.Image;
	public text_2: eui.Label;
	public mask_3: eui.Rect;
	public friend_3: eui.Image;
	public icon_3: eui.Image;
	public text_3: eui.Label;
	public mask_4: eui.Rect;
	public friend_4: eui.Image;
	public icon_4: eui.Image;
	public text_4: eui.Label;
	public mask_5: eui.Rect;
	public friend_5: eui.Image;
	public icon_5: eui.Image;
	public text_5: eui.Label;
	public getBtn:eui.Image;



	public haveGet = false;//是否已经拥有火火球
	public list = [
		{ id: 1, avatarUrl: '/resource/assets/Aimages/img_spirit_01.png' },
		{ id: 2, avatarUrl: '/resource/assets/Aimages/img_spirit_01.png' },
		{ id: 3, avatarUrl: '/resource/assets/Aimages/img_spirit_01.png' }
	]
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
			that['friend_' + i].mask=that['mask_' + i];
			that['text_' + i].text="x50";
			that['icon_' + i].visible=true;
		}
		// for (let j = that.list.length; j < 6; j++) {
		// 	that['friend_' + (j + 1)].addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this)
		// }
		this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
		if (that.haveGet && that.list.length >= 6) {
			//已解锁

		}
		if (!that.haveGet && that.list.length >= 6) {
			//可解锁
			that.getBtn.texture=RES.getRes('btn_unlocking_png');


		}
	}
	public getFun() {
		let that = this;
		if (that.list.length >= 6) {
			//邀请完成 --解锁
			if (1) {
				//未解锁
			} else {

			}
		} else {
			CallbackMaster.openShare(null, false);
		}

	}
	public closeFun() {
		this.parent.removeChild(this);
	}
}