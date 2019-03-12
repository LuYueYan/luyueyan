class getEnergyModal extends eui.Component implements eui.UIComponent {
	public body: eui.Group;
	public getBtn: eui.Image;
	public getText: eui.Label;
	public closeBtn: eui.Button;
	public numText: eui.Label;
	public state: eui.Image;


	public currentNum = 3;//已领取
	public status = 1;// //状态 1可领取 2已领取过 3已领取完 4已过期
	public suid = userDataMaster.myInfo.uid;
	public day = userDataMaster.getToday();
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
		that.postFun(1, (res) => {
			that.currentNum = res.Received;
			that.getText.text = "已领取（" + that.currentNum + "/5）";
			if (that.currentNum >= 5) {
				that.getBtn.texture = RES.getRes('btn_receive_03_png');
			}
		})
		let params = {
			uid: userDataMaster.sourceEnergy.uid,
			be_invitation_uid: userDataMaster.getMyInfo.uid
		}
		ServiceMaster.post(ServiceMaster.getEnergy, params, (res) => {
			if (res.code == 1 && res.data) {
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
		this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
	}
	public postFun(type, callback: Function = null) {
		let params = {
			uid: userDataMaster.getMyInfo.uid,
			type
		}
		ServiceMaster.post(ServiceMaster.getEnergyList, params, (res) => {
			if (res.code == 1 && res.data) {
				callback && callback(res.data);
			}
		})
	}
	public getFun() {
		let that = this;
		if (this.status == 1) {
			//可领
			that.postFun(2, (res) => {
				that.currentNum = res.Received;
				that.getText.text = "已领取（" + that.currentNum + "/5）";
				that.state.visible = true;
				that.numText.visible = true;
				let gold = userDataMaster.myGold + 25;
				userDataMaster.myGold = gold;
				that.status = 2;
				that.getBtn.texture = RES.getRes('btn_present_02_png');
			})
		} else if (this.status == 2) {
			CallbackMaster.openShare(null, false, "&type=energy&day=" + this.day + "&suid=" + this.suid);
		}
	}
	public closeFun() {
		this.parent.removeChild(this);
	}

}