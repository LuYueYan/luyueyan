class friendHelp extends eui.Component implements eui.UIComponent {
	public body: eui.Group;
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


	public list = [];//"status":  状态1未领取2已领取
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
		that.getList()
		egret.Tween.get(this.body).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);

		this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
		if (userDataMaster.cats[8].state) {
			//已解锁
		}
		if (!userDataMaster.cats[8].state && that.list.length >= 6) {
			//可解锁
			that.getBtn.texture = RES.getRes('btn_unlocking_png');

		}
	}
	public getList() {
		let that = this;
		let params = {
			uid: userDataMaster.getMyInfo.uid || 0
		}
		ServiceMaster.post(ServiceMaster.getAssistanceList, params, (res) => {
			if (res.code == 1 && res.data) {
				that.list = res.data.list;
				for (let i = 0, len = res.data.total; i < len; i++) {
					that['friend_' + i].source = that.list[i].avatarUrl;
					that['friend_' + i].mask = that['mask_' + i];
					if (that.list[i].status == 1) {
						that['get_' + i].visible = true;
						that['get_' + i].addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.getEnergyFun(i) }, this);
					} else {
						that['icon_' + i].visible = false;
						that['text_' + i].visible = false;
					}
				}
			}
		})
	}
	public getEnergyFun(i) {
		let that = this;
		let params = {
			id: that.list[i].id,
			uid: userDataMaster.getMyInfo.uid
		}
		ServiceMaster.post(ServiceMaster.receiveAssistance, params, (res) => {
			if (res.code == 1 && res.data) {
				let gold = userDataMaster.myGold;
				gold += 150;
				userDataMaster.myGold = gold;
				that['get_' + i].visible = false;
				that.list[i].status = 2;
				that.addChild(new getSuccess(-1, 'x 150'));
			}
		})

	}
	public getFun() {
		let that = this;
		if (that.list.length >= 6) {
			//邀请完成 --解锁
			if (!userDataMaster.cats[8].state) {
				//未解锁
				let cat = userDataMaster.cats[8];
				cat.state = true;
				userDataMaster.setCat(8, cat);
				that.addChild(new getSuccess(4, '火火球'));
			} else {
				//已解锁
			}
		} else {
			CallbackMaster.openShare(null, false);
		}

	}
	public closeFun() {
		let that = this;
		egret.Tween.get(this.body).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 200).call(() => {
			that.parent.removeChild(that);
		});
	}
}