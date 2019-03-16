class getEnergyModal extends eui.Component implements eui.UIComponent {
	public body: eui.Group;
	public getBtn: eui.Image;
	public getText: eui.Label;
	public closeBtn: eui.Button;
	public numText: eui.Label;
	public state: eui.Image;


	public currentNum = 0;//已领取
	public status = 1;// //状态 1可领取 2已领取过 3已领取完 4已过期
	public suid = userDataMaster.myInfo.uid;
	public day = userDataMaster.getToday();
	public requestTime = 0;//请求次数
	public constructor(suid = 0, day = '') {
		super();
		if (suid) {
			this.suid = suid;
		}
		if (day != '') {
			day = day;
		}
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
		that.getMyInfo()
		this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
	}
	public getMyInfo() {
		let that = this;
		if (!userDataMaster.getMyInfo.uid) {
			that.requestTime++;
			if (that.requestTime < 5) {
				setTimeout(function () {
					that.getMyInfo();
				}, 500);
			}
			return;
		}
		let params = {
			uid: userDataMaster.sourceEnergy.uid,
			be_invitation_uid: userDataMaster.getMyInfo.uid,
			share_day: userDataMaster.sourceEnergy.day
		}
		ServiceMaster.post(ServiceMaster.getEnergy, params, (res) => {
			if (res.code == 1 && res.data) {
				that.currentNum = res.data.Received;
				that.getText.text = "已领取（" + that.currentNum + "/5）";
				if (that.currentNum >= 5) {
					that.getBtn.texture = RES.getRes('btn_receive_03_png');
				}
				that.status = res.data.status;
				if (res.data.status == 1) {
					//    可领取
				} else if (res.data.status == 2) {
					//已领取
					that.state.visible = true;
					that.getBtn.texture = RES.getRes('btn_present_02_png');
				} else if (res.data.status == 3) {
					//已领完
					that.getBtn.texture = RES.getRes('btn_receive_03_png');
				} else {
					//已过期
					that.getBtn.texture = RES.getRes('btn_receive_out_png');
				}
			}
		})
	}

	public getFun() {
		let that = this;
		if (this.status == 1) {
			//可领
			let params = {
				uid: userDataMaster.sourceEnergy.uid,
				be_invitation_uid: userDataMaster.getMyInfo.uid
			}
			ServiceMaster.post(ServiceMaster.getEnergyDo, params, (res) => {
				if (res.code == 1 && res.data) {
					console.log('领取好友分享的能量', res)
					that.currentNum ++;;
					that.getText.text = "已领取（" + that.currentNum + "/5）";
					that.state.visible = true;
					that.numText.visible = true;
					let gold = userDataMaster.myGold + 30;
					userDataMaster.myGold = gold;
					that.status = 2;
					that.getBtn.texture = RES.getRes('btn_present_02_png');
				}
			})

		} else if (this.status == 2) {
			CallbackMaster.openShare(null, false, "&type=energy&day=" + this.day + "&suid=" + this.suid,1);
		}
	}
	public closeFun() {
		this.parent.removeChild(this);
	}

}