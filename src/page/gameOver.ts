class gameOver extends eui.Component implements eui.UIComponent {
	public bgImg: eui.Image;
	public scoreText: eui.Label;
	public homeBtn: eui.Image;
	public again: eui.Button;
	public openBall: eui.Button;
	public energyNum: eui.Label;
	public getEnergy: eui.Image;
	public travel_0: eui.Group;
	public travel_img_0: eui.Image;
	public travel_name_0: eui.Label;
	public shareBtn_0: eui.Image;
	public travel_new_0: eui.Image;
	public travel_1: eui.Group;
	public travel_img_1: eui.Image;
	public travel_name_1: eui.Label;
	public shareBtn_1: eui.Image;
	public travel_new_1: eui.Image;
	public group_0: eui.Group;
	public mask_0: eui.Rect;
	public more_0: eui.Image;
	public text_0: eui.Label;
	public group_1: eui.Group;
	public mask_1: eui.Rect;
	public more_1: eui.Image;
	public text_1: eui.Label;


	public score = 0;
	public ballId = 0;//这局用的球类型
	public energy = 0;//本局获得的能量果数量
	public more_list = [];//推荐位列表v
	public terval = null;//定时器
	public more_index_0 = 0;
	public more_index_1 = 0;
	public constructor(score = 0, ballId = 0, energy = 0) {
		super();
		this.score = score;
		this.ballId = ballId;
		this.energy = energy;
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		if (this.again) {
			this.init()
		} else {
			this.addEventListener(egret.Event.COMPLETE, this.init, this)
		}
	}
	public init() {
		let that = this;
		soundMaster.stopSongMusic();
		that.bgImg.height = that.stage.stageHeight;
		if (AdMaster.cacheBannerAd) {
			AdMaster.openBannerAd({ width: 700, height: 300 });
		}
		that.scoreText.text = that.score + '';
		userDataMaster.myGold += that.energy;
		that.energyNum.text = 'x ' + that.energy;
		let travel = userDataMaster.MyCats[that.ballId].belong;
		let ran = Math.floor(Math.random() * travel.length);
		let newArr = [];
		for (let i = 0; i < travel.length; i++) {
			if (i != ran) {
				newArr.push(travel[i]);
			}
		}
		let item_0 = userDataMaster.travels[newArr[0]];
		let item_1 = userDataMaster.travels[newArr[1]];
		that.travel_img_0.texture = RES.getRes('img_imprinting_a' + (item_0.id + 1) + '_png');
		that.travel_name_0.text = item_0.name;
		that.travel_img_1.texture = RES.getRes('img_imprinting_a' + (item_1.id + 1) + '_png');
		that.travel_name_1.text = item_1.name;
		if (item_0.state == 0) {
			//初次获得
			item_0.state = 1;
			that.travel_new_0.visible = true;
			userDataMaster.setTravel(newArr[0], item_0);
			userDataMaster.travelList.push(newArr[0]);
		}
		if (item_1.state == 0) {
			//初次获得
			item_1.state = 1;
			that.travel_new_1.visible = true;
			userDataMaster.travelList.push(newArr[1]);
			userDataMaster.setTravel(newArr[1], item_1);
		}
		if (userDataMaster.recommand && userDataMaster.recommand['2'] && userDataMaster.recommand['2'].games) {
			that.more_list = userDataMaster.recommand['2'].games;
			if (that.more_list.length > 1) {
				let len = that.more_list.length;
				that.more_index_1 = len - 1;
				that.more_0.source = that.more_list[that.more_index_0].image;
				if (that.more_list[that.more_index_0].name.length > 5) {
					that.more_list[that.more_index_0].name = that.more_list[that.more_index_0].name.slice(0, 4) + '…';
				}
				that.text_0.text = that.more_list[that.more_index_0].name;
				that.more_0.mask = that.mask_0;
				that.more_1.source = that.more_list[that.more_index_1].image;
				if (that.more_list[that.more_index_1].name.length > 5) {
					that.more_list[that.more_index_1].name = that.more_list[that.more_index_1].name.slice(0, 4) + '…';
				}
				that.text_1.text = that.more_list[that.more_index_1].name;
				that.more_1.mask = that.mask_1;
				that.group_0.visible = true;
				that.group_1.visible = true;
				that.terval = setInterval(() => {
					that.more_index_0 < len - 1 ? that.more_index_0++ : that.more_index_0 = 0;
					that.more_index_1 > 0 ? that.more_index_1-- : that.more_index_1 = len - 1;
					that.more_0.source = that.more_list[that.more_index_0].image;
					if (that.more_list[that.more_index_0].name.length > 5) {
						that.more_list[that.more_index_0].name = that.more_list[that.more_index_0].name.slice(0, 4) + '…';
					}
					that.text_0.text = that.more_list[that.more_index_0].name;
					// that.more_0.mask = that.mask_0;
					that.more_1.source = that.more_list[that.more_index_1].image;
					if (that.more_list[that.more_index_1].name.length > 5) {
						that.more_list[that.more_index_1].name = that.more_list[that.more_index_1].name.slice(0, 4) + '…';
					}
					that.text_1.text = that.more_list[that.more_index_1].name;
					// that.more_1.mask = that.mask_1;
				}, 5000);
				that.group_0.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { that.jumpFun(0) }, that);
				that.group_1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { that.jumpFun(1) }, that);
			}
			egret.Tween.get(that.group_0, { loop: true }).to({ rotation: 20 }, 300).to({ rotation: -20 }, 600).to({ rotation: 0 }, 300);
			egret.Tween.get(that.group_1, { loop: true }).to({ rotation: 20 }, 300).to({ rotation: -20 }, 600).to({ rotation: 0 }, 300);
		}
		egret.Tween.get(that.getEnergy, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 800).to({ scaleX: 1, scaleY: 1 }, 1000);
		this.updateScore();
		this.again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.againFun, this);
		this.shareBtn_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
		this.shareBtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
		this.getEnergy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
		this.openBall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ballFun, this);
		this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.homeFun, this);
	}
	public jumpFun(index) {
		let that = this;
		let item = that.more_list[that['more_index_' + index]];
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
	public updateScore() {
		let params = {
			score: this.score,
			uid: userDataMaster.getMyInfo.uid
		}
		ServiceMaster.post(
			ServiceMaster.getScore,
			params,
			function (suc) {
				if (parseInt(suc.code) === 1 && suc.data) {
					//分数提交成功
				}
			}
		);
	}
	public homeFun() {
		this.terval && clearInterval(this.terval);
		let parent = this.parent;
		parent.removeChild(this);
		parent.addChild(new startScene())
	}
	public getFun() {
		let that = this;
		AdMaster.useVideo(() => {
			suc();
		}, () => {
			CallbackMaster.openShare(() => {
				suc();
			})
		});
		function suc() {
			userDataMaster.myGold += that.energy;
			that.getEnergy.texture = RES.getRes('btn_receive_04_png');
			egret.Tween.removeTweens(that.getEnergy);
			that.getEnergy.removeEventListener(egret.TouchEvent.TOUCH_TAP, that.getFun, that);
			that.addChild(new getSuccess(-1, 'x ' + that.energy * 2));
		}
	}
	public shareFun() {
		CallbackMaster.openShare(null, false);
	}
	public againFun() {
		this.terval && clearInterval(this.terval);
		let parent = this.parent;
		parent.removeChild(this);
		parent.addChild(new runningScene());
	}
	public ballFun() {
		this.terval && clearInterval(this.terval);
		let parent = this.parent;
		parent.removeChild(this);
		let start = new startScene()
		parent.addChild(start)
		start.addChild(new myBalls(true))
	}
}