class startScene extends eui.Component implements eui.UIComponent {
	public bgImg: eui.Image;
	public addGold: eui.Group;
	public goldText: eui.Label;
	public goldImg: eui.Image;
	public collection: eui.Image;
	public circle_light: eui.Image;
	public tryBtn: eui.Group;
	public tryImg: eui.Image;
	public tryName: eui.Image;
	public friendBtn: eui.Image;
	public energyBtn: eui.Image;
	public currentBall: eui.Image;
	public tryTip: eui.Image;
	public energyAddGroup: eui.Group;
	public startBtn: eui.Image;
	public degreeText: eui.Label;
	public houseBtn: eui.Image;
	public travelBtn: eui.Image;
	public rankBtn: eui.Image;
	public shareBtn: eui.Image;
	public houseTip: eui.Image;
	public travelTip: eui.Image;
	public shareTip: eui.Image;
	public energyTip: eui.Image;
	public touchRect: eui.Rect;



	public tryIndex = -1;//今日试玩index
	public trying = false;//是否是试玩结束返回
	public energyAdd = 0;//能量加成百分比
	public touchPosition = [
		{ x: 0, y: 0, name: 'houseBtn', func: 'houseFun' },
		{ x: 0, y: 0, name: 'travelBtn', func: 'travelFun' },
		{ x: 0, y: 0, name: 'rankBtn', func: 'rankFun' },
		{ x: 0, y: 0, name: 'shareBtn', func: 'shareFun' },
		{ x: 0, y: 0, name: 'friendBtn', func: 'friendFun' },
		{ x: 0, y: 0, name: 'energyBtn', func: 'energyFun' },
		{ x: 0, y: 0, name: 'startBtn', func: 'startFun' },
		{ x: 0, y: 0, name: 'tryBtn', func: 'tryFun' },
		{ x: 0, y: 0, name: 'addGold', func: 'addGoldFun' }
	]
	public moreCom: moreScroller;
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
		that.moreCom = new moreScroller();
		that.moreCom.y = 300;
		that.addChild(that.moreCom);
		that.moreCom.cacheAsBitmap = true;
		let match = DeviceMaster.model.match(/iPhone ?X/ig);
		if (match) {
			that.collection.y = 80;
		}
		that.startBtn.filters=[CallbackMaster.glowFilter()]
		setTimeout(function () {

			//今天试玩
			// that.tryBtn.visible = true;
			let tryList = [];
			let cats = userDataMaster.cats;
			for (let i = 0, len = cats.length; i < len; i++) {
				if (!cats[i].state) {
					tryList.push(i);
				}
			}
			that.tryIndex = tryList[Math.floor(Math.random() * tryList.length)];
			that.tryImg.texture = RES.getRes('img_elf_' + that.tryIndex + '2_png');
			that.tryName.texture = RES.getRes('img_name_0' + (that.tryIndex + 1) + '_png');
			egret.Tween.get(that.tryBtn, { loop: true }).to({ rotation: 20 }, 100).to({ rotation: -20 }, 200).to({ rotation: 0 }, 100).wait(1000);

			that.goldText.text = '' + userDataMaster.gold;
			that.currentBall.texture = RES.getRes('img_elf_' + userDataMaster.runCat + '2_png');
			let energy = userDataMaster.sourceEnergy;
			if (energy.uid != 0 && energy.day) {
				that.addChild(new getEnergyModal(energy.uid, energy.day));
			}
			if (userDataMaster.todayVideoEnergy == 2) {
				that.goldImg.texture + RES.getRes('img_moer_02_png');
			} else {
				egret.Tween.get(that.goldImg, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 500).to({ scaleX: 1, scaleY: 1 }, 600)
			}
			that.degreeText.text = userDataMaster.degree + '阶';
		}, 500);
		egret.Tween.get(that.circle_light, { loop: true }).to({ scaleX: 0.5, scaleY: 0.5 }, 800).to({ scaleX: 1, scaleY: 1 }, 1500);
		// if (this.trying) {
		// 	this.addChild(new myBalls());
		// }
		egret.Tween.get(that.collection, { loop: true }).to({ x: 230 }, 500).to({ x: 244 }, 300);
		egret.Tween.get(that.startBtn, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 1000).to({ scaleX: 1, scaleY: 1 }, 800);

		that.touchRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);

		userDataMaster.myCollection.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.updateData, this);
	}
	public touchFun(e: egret.TouchEvent) {
		let that = this;
		let tx = e.stageX;
		let ty = e.stageY;
		let arr = that.touchPosition;
		for (let i = 0, len = arr.length; i < len; i++) {
			let target = that[arr[i].name];
			let dx = tx - (target.x - target.anchorOffsetX);
			let dy = ty - (target.y - target.anchorOffsetY);
			if (dx >= 0 && dx <= target.width && dy >= 0 && dy <= target.height) {
				that[arr[i].func] && that[arr[i].func]();
				return;
			}
		}
	}
	public addGoldFun() {
		let that = this;
		switch (userDataMaster.todayVideoEnergy) {
			case 0:
				//今天还没分享还没看视频
				CallbackMaster.openShare(() => {
					suc(50);
				});
				CallbackMaster.shareFailText = '分享到群或者好友就能获得能量果哦~';
				break;
			case 1:
				// 今天已经分享，还没看视频
				AdMaster.useVideo(() => {
					suc(100);
				}, () => {
					CallbackMaster.openShare(() => {
						suc(100);
					});
					CallbackMaster.shareFailText = '分享到群或者好友就能获得能量果哦~';
				});
				break;
			case 2:
				// 今天已经分享已经看视频
				platform.showModal({
					title: '温馨提示',
					content: '今日次数已用完，明日再来'
				})
				break;
			default: break;
		}
		function suc(num) {
			userDataMaster.dayVideoEnergy.num++;
			userDataMaster.myGold += num;
			that.addChild(new getSuccess(-1, 'x ' + num));
			if (userDataMaster.dayVideoEnergy.num == 2) {
				that.goldImg.texture = RES.getRes('img_moer_02_png');
				egret.Tween.removeTweens(that.goldImg);
			}
		}
	}
	public tryFun() {
		//今日试玩
		let that = this;
		if (userDataMaster.todayTry) {
			AdMaster.useVideo(() => {
				suc();
			}, () => {
				CallbackMaster.openShare(() => {
					suc();
				});
				CallbackMaster.shareFailText = '分享到群或者好友就能立刻试玩' + userDataMaster.cats[that.tryIndex].name + '哦~';
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
		if (this.tryTip.visible) {
			this.currentBall.texture = RES.getRes('img_elf_' + this.tryIndex + '2_png');
		} else {
			this.currentBall.texture = RES.getRes('img_elf_' + userDataMaster.runCat + '2_png');
		}

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
		that.addChild(new rank());
	}
	public shareFun() {
		let that = this;
		CallbackMaster.openShare(() => {
			that.energyAdd = 0.1;
			that.energyAddGroup.visible = true;
			that.shareTip.visible = false;
		});

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
		egret.Tween.removeAllTweens();
		that.touchRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
		userDataMaster.myCollection.removeEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.updateData, this);
		clearInterval(moreScroller.getInstance().scrTerval);
		let parent = that.parent;
		parent.removeChild(that);
		let currentBall = -1;
		if (this.tryTip.visible) {
			currentBall = this.tryIndex;
		}
		parent.addChild(new runningScene(1, 0, 0, currentBall, 0, 0, that.energyAdd));
	}

}