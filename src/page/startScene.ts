class startScene extends eui.Component implements eui.UIComponent {
	public goldText: eui.Label;
	public collection: eui.Image;
	public moreGroup: eui.Group;
	public mask_1: eui.Rect;
	public more_1: eui.Image;
	public mask_2: eui.Rect;
	public more_2: eui.Image;
	public mask_3: eui.Rect;
	public more_3: eui.Image;
	public friendBtn: eui.Image;
	public energyBtn: eui.Image;
	public currentBall: eui.Image;
	public startBtn: eui.Image;
	public houseBtn: eui.Image;
	public travelBtn: eui.Image;
	public rankBtn: eui.Image;
	public shareBtn: eui.Image;


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
		setTimeout(function () {
			if (AdMaster.cacheBannerAd) {
				AdMaster.openBannerAd({ width: 700, height: 300 });
			}
		}, 1000);
		this.goldText.text = '能量果 ' + userDataMaster.gold;
		let list = [
			{ appid: '', path: '', image: '/resource/assets/Aimages/img_spirit_01.png', name: '滴滴滴' },
			{ appid: '', path: '', image: '/resource/assets/Aimages/img_spirit_01.png', name: '滴滴滴' },
			{ appid: '', path: '', image: '/resource/assets/Aimages/img_spirit_01.png', name: '滴滴滴' }
		];
		for (let i = 0; i < 3; i++) {
			// that['more_' + (i + 1)].source = list[i].image;
			// that['more_' + (i + 1)].mask=that['mask_' + (i + 1)];
			that['more_' + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				that.moreFun(list[i])
			}, this);
		}
		egret.Tween.get(that.collection,{loop:true}).to({x:230},500).to({x:244},300)
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
		this.goldText.text = '能量果 ' + userDataMaster.gold;
	}
	public moreFun(item) {
		let type = 1;
		platform.navigateToMiniProgram({
			appId: item.appid,
			path: item.path,
			extraData: {},
			success(suc) {

			}, fail(err) {
				type = 0;
			},
			complete() {
				// CallbackMaster.recommandClick(that.data.id, type)
			}
		})
	}
	public houseFun() {
		let that = this;
		that.addChild(new houseScene())
	}
	public travelFun() {
		let that = this;
		this.addChild(new travelScene())
	}
	public rankFun() {
		let that = this;
		that.addChild(new rank())
	}
	public shareFun() {
		let that = this;
		CallbackMaster.openShare(null, false)
	}
	public friendFun() {
		let that = this;
		that.addChild(new friendHelp())
	}
	public energyFun() {
		let that = this;
		that.addChild(new dayEnergy());
	}
	public startFun() {
		let that = this;
		let parent = that.parent;
		parent.removeChild(that);
		parent.addChild(new runningScene());
		// parent.addChild(new common())
	}

}