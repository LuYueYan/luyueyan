class startScene extends eui.Component implements eui.UIComponent {
	public bgImg: eui.Image;
	public goldText: eui.Label;
	public collection: eui.Image;
	public moreGroup: eui.Group;
	public mask_1: eui.Rect;
	public more_1: eui.Image;
	public text_1: eui.Label;
	public mask_2: eui.Rect;
	public more_2: eui.Image;
	public text_2: eui.Label;
	public mask_3: eui.Rect;
	public more_3: eui.Image;
	public text_3: eui.Label;
	public friendBtn: eui.Image;
	public energyBtn: eui.Image;
	public currentBall: eui.Image;
	public startBtn: eui.Image;
	public houseBtn: eui.Image;
	public travelBtn: eui.Image;
	public rankBtn: eui.Image;
	public shareBtn: eui.Image;
	public houseTip: eui.Image;
	public travelTip: eui.Image;
	public shareTip: eui.Image;
	public energyTip: eui.Image;




	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		if (this.startBtn === null) {
			this.addEventListener(egret.Event.COMPLETE, this.init, this)
		} else {
			this.init()
		}
	}
	public init() {
		let that = this;
		userDataMaster.createLoginBtn(0, 100, 300, 100);
		that.bgImg.height = that.stage.stageHeight;
		setTimeout(function () {
			if (AdMaster.cacheBannerAd) {
				AdMaster.openBannerAd({ width: 700, height: 300 });
			}
		}, 1000);

		let match = DeviceMaster.model.match(/iPhone ?X/ig);
		if (match) {
			that.collection.y = 80;
		}

		this.goldText.text = '' + userDataMaster.gold;
		this.currentBall.texture = RES.getRes('img_elf_'+userDataMaster.runCat+'2_png');

		if (userDataMaster.recommand && userDataMaster.recommand['1'] && userDataMaster.recommand['1'].games) {
			let list = userDataMaster.recommand['1'].games;
			for (let i = 0; i < 3 && i < list.length; i++) {
				that['more_' + (i + 1)].source = list[i].image;
				let text=list[i].name.length>4?list[i].name.substr(0,3)+'…':list[i].name;
				that['text_' + (i + 1)].text = text;
				that['more_' + (i + 1)].mask = that['mask_' + (i + 1)];
				that['more_' + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
					that.moreFun(list[i])
				}, this);
			}
		}

		let energy = userDataMaster.sourceEnergy;
		if (energy.uid && energy.day) {
			this.addChild(new getEnergyModal(energy.uid, energy.day))
		}
		egret.Tween.get(that.collection, { loop: true }).to({ x: 230 }, 500).to({ x: 244 }, 300)
		that.houseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.houseFun, this);
		that.travelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.travelFun, this)
		that.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankFun, this)
		that.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this)
		that.friendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.friendFun, this)
		that.energyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.energyFun, this)
		that.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startFun, this);
		userDataMaster.myCollection.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.updateData, this)
	}
	public updateData(evt: eui.CollectionEvent): void {
		this.goldText.text = '' + userDataMaster.gold;
		this.currentBall.texture = RES.getRes('img_elf_'+userDataMaster.runCat+'2_png');
	}
	public moreFun(item) {

		CallbackMaster.recommandClick(1, item);
		let type = 2;
		platform.navigateToMiniProgram({
			appId: item.appid,
			path: item.path,
			extraData: {},
			success(suc) {

			}, fail(err) {
				type = 3;
			},
			complete() {
				CallbackMaster.recommandClick(type, item)
			}
		})
	}
	public houseFun() {
		let that = this;
		that.addChild(new myBalls());
		that.houseTip.visible = false;
	}
	public travelFun() {
		let that = this;
		this.addChild(new travelScene());
		that.travelTip.visible = false;
	}
	public rankFun() {
		let that = this;
		that.addChild(new rank())
	}
	public shareFun() {
		let that = this;
		CallbackMaster.openShare(null, false);
		that.shareTip.visible = false;
	}
	public friendFun() {
		let that = this;
		that.addChild(new friendHelp())
	}
	public energyFun() {
		let that = this;
		that.addChild(new dayEnergy());
		that.energyTip.visible = false;
	}
	public startFun() {
		let that = this;
		let parent = that.parent;
		parent.removeChild(that);
		parent.addChild(new runningScene());
		// parent.addChild(new common())
	}

}