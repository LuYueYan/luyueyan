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
	public closeBtn: eui.Button;
	public getBtn: eui.Image;

	public fireBall;
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
		if (userDataMaster.cats[4].state) {
			//已解锁
			that.getBtn.texture = RES.getRes('btn_have_unlock_png');
		}
		if (!userDataMaster.cats[4].state && that.list.length >= 6) {
			//可解锁
			that.getBtn.texture = RES.getRes('btn_unlocking_png');
		}
		this.fireBall = movieMaster.getGif('fire_ball');
		this.fireBall.y = 297 ;
		this.fireBall.x = 245;
		this.body.addChild(this.fireBall);
		this.fireBall.gotoAndPlay(0, -1);
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
				that['icon_' + i].visible = false;
				that['text_' + i].visible = false;
				that.list[i].status = 2;
				that.addChild(new getSuccess(-1, 'x 150'));
			}
		})

	}
	public getFun() {
		let that = this;
		if (that.list.length >= 6) {
			//邀请完成 --解锁
			if (!userDataMaster.cats[4].state) {
				//未解锁
				let cat = userDataMaster.cats[4];
				cat.state = true;
				userDataMaster.setCat(4, cat);
				that.getBtn.texture = RES.getRes('btn_have_unlock_png');
				that.addChild(new getSuccess(4, '火火球'));
			} else {
				//已解锁
			}
		} else {
			CallbackMaster.openShare(null, false);
			setTimeout(function () {
				platform.showModal({
					title: '温馨提示',
					content: '新好友加入，你就能获得能量果和火火球~'
				});
			}, 500);

		}

	}
	public closeFun() {
		let that = this;
		this.fireBall.stop();
		egret.Tween.get(this.body).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 200).call(() => {
			that.parent.removeChild(that);
		});
	}
}