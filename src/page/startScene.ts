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
	public tryBtn: eui.Group;
	public tryImg: eui.Image;
	public tryTip: eui.Image;
	public addGold: eui.Image;



	public tryIndex = -1;//今日试玩index
	public trying = false;//是否是试玩结束返回
	public energyAdd = 0;//能量加成百分比
	public constructor(trying = false) {
		super();
		this.trying = trying;
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
		if (userDataMaster.todayTry) {
			//今天还没试玩
			this.tryBtn.visible = true;
			let tryList = [];
			let cats = userDataMaster.cats;
			for (let i = 0, len = cats.length; i < len; i++) {
				if (!cats[i].state) {
					tryList.push(i);
				}
			}
			this.tryIndex = Math.floor(Math.random() * tryList.length);
			this.tryImg.texture = RES.getRes('img_elf_' + this.tryIndex + '2_png');
		}
		if (userDataMaster.getMyInfo.uid) {
			// userDataMaster.createLoginBtn()
		}
		this.goldText.text = '' + userDataMaster.gold;
		this.currentBall.texture = RES.getRes('img_elf_' + userDataMaster.runCat + '2_png');
		if (userDataMaster.recommand && userDataMaster.recommand['1'] && userDataMaster.recommand['1'].games) {
			let list = userDataMaster.recommand['1'].games;
			for (let i = 0; i < 3 && i < list.length; i++) {
				that['more_' + (i + 1)].source = list[i].image;
				let text = list[i].name.length > 4 ? list[i].name.substr(0, 3) + '…' : list[i].name;
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
		// if (this.trying) {
		// 	this.addChild(new myBalls());
		// }
		egret.Tween.get(that.collection, { loop: true }).to({ x: 230 }, 500).to({ x: 244 }, 300);
		egret.Tween.get(that.startBtn, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 1000).to({ scaleX: 1, scaleY: 1 }, 800);
		that.houseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.houseFun, this);
		that.travelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.travelFun, this)
		that.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankFun, this)
		that.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this)
		that.friendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.friendFun, this)
		that.energyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.energyFun, this)
		that.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startFun, this);
		that.tryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tryFun, this);
		that.addGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addGoldFun, this);
		userDataMaster.myCollection.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.updateData, this)
	}
	public addGoldFun() {
		AdMaster.useVideo(() => {
			suc();
		}, () => {
			console.log('share')
			CallbackMaster.openShare(() => {
				suc();
			})
		});
		function suc() {
			userDataMaster.myGold += 20;
		}
	}
	public tryFun() {
		//今日试玩
       let that=this;
		if (userDataMaster.todayTry) {
			AdMaster.useVideo(() => {
				suc();
			}, () => {
				console.log('share')
				CallbackMaster.openShare(() => {
					suc();
				})
			});

		} else {
			platform.showModal({
				title: '温馨提示',
				content: '今天你已经试玩过了，请明天再来哦'
			})
		}
		function suc() {
			that.tryTip.visible = true;
			that.currentBall.texture = RES.getRes('img_elf_' + that.tryIndex + '2_png');
			userDataMaster.updateTodayTry();
		}

	}
	public updateData(evt: eui.CollectionEvent): void {
		this.goldText.text = '' + userDataMaster.gold;
		this.currentBall.texture = RES.getRes('img_elf_' + userDataMaster.runCat + '2_png');
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
		CallbackMaster.openShare(() => {
			that.energyAdd = 0.1
		});
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
		let currentBall = -1;
		if (this.tryTip.visible) {
			currentBall = this.tryIndex;
		}
		parent.addChild(new runningScene(1, 0, 0, currentBall, 0, 0, 0.1));
	}

}