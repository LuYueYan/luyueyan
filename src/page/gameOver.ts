class gameOver extends eui.Component implements eui.UIComponent {
	public bgImg: eui.Image;
	public scoreText: eui.Label;
	public homeBtn: eui.Image;
	public travelBtn: eui.Image;
	public newTip: eui.Image;
	public energyAddImg: eui.Image;
	public getEnergy: eui.Group;
	public energyNum: eui.Label;
	public doubleEnergy: eui.Group;
	public light: eui.Image;
	public gift: eui.Image;
	public doubleNum: eui.Label;
	public doubleTimes: eui.Label;
	public titleText: eui.Label;
	public again: eui.Image;
	public shareBtn: eui.Image;
	public openBall: eui.Button;
	public processGroup: eui.Group;
	public proBar: eui.Rect;
	public centerImg: eui.Image;
	public rightImg: eui.Image;
	public degree_0: eui.Label;
	public degree_1: eui.Label;
	public degree_2: eui.Label;
	public headGroup: eui.Group;
	public head: eui.Image;
	public headMask: eui.Rect;
	public proGroup: eui.Group;
	public percentText: eui.Label;
	public topGroup: eui.Group;
	public surpassText: eui.Label;
	public touchRect: eui.Rect;
	public group_0: eui.Group;
	public mask_0: eui.Rect;
	public more_0: eui.Image;
	public text_0: eui.Label;
	public group_1: eui.Group;
	public mask_1: eui.Rect;
	public more_1: eui.Image;
	public text_1: eui.Label;


	public multip = 1;//视频奖励多少倍
	public score = 0;
	public ballId = 0;//这局用的球类型
	public energy = 0;//本局获得的能量果数量
	public energyAdd = 0;//能量果加成百分几
	public more_list = [];//推荐位列表v
	public terval = null;//定时器
	public more_index_0 = 0;
	public more_index_1 = 0;
	public pro = 0;//本阶段进度
	public touchPosition = [
		{ name: 'homeBtn', func: 'homeFun' },
		{ name: 'travelBtn', func: 'travelFun' },
		{ name: 'getEnergy', func: 'getEnergyFun' },
		{ name: 'doubleEnergy', func: 'doubleEnergyFun' },
		{ name: 'again', func: 'againFun' },
		{ name: 'shareBtn', func: 'shareFun' },
		{ name: 'openBall', func: 'openBallFun' }
	];
	public haveGet = false;//是否已领取奖励
	public through;//烟花效果
	public constructor(score = 0, ballId = 0, energy = 0, energyAdd = 0, pro) {
		super();
		// score--分数 ballId--精灵索引 energy--获得的能量果 energyAdd--能量果是否加成 pro--本阶段进度
		this.score = score;
		this.ballId = ballId;
		this.energy = parseInt(energy * (1 + energyAdd) + '');
		this.energyAdd = energyAdd;
		this.pro = pro;
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
		if (AdMaster.cacheBannerAd) {
			AdMaster.openBannerAd({ width: 700, height: 300 });
		}
		that.scoreText.text = that.score + '';
		userDataMaster.myGold += that.energy;
		this.bgImg.height = this.stage.stageHeight;
		var degree = userDataMaster.degree + 1;
		let w = 280 * that.pro;
		if (that.pro == 1) {
			that.centerImg.texture = RES.getRes('img_bg_steps_01_png');
			that.titleText.text = '恭喜通关';
			that.again.texture = RES.getRes('btn_receive_14_png');
			egret.Tween.get(that.centerImg, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000);
			that.through = movieMaster.getGif('through');
			that.through.y = 100;
			that.addChild(that.through);
			that.through.gotoAndPlay(0, -1);
		}
		if (degree >= 10) {
			that.rightImg.visible = false;
			that.degree_2.visible = false;
		}
		if (degree == 11) {
			w = 560 * that.pro;
			that.degree_1.visible = false;
			that.centerImg.visible = false;
		}
		if (userDataMaster.degree == 10) {
			that.titleText.text = '游戏结束';
			that.removeChild(that.processGroup);
			that.topGroup.visible = true;
		}
		that.degree_0.text = (degree - 1) + '阶';
		that.degree_1.text = degree + '阶';
		that.degree_2.text = (degree + 1) + '阶';
		egret.Tween.get(that.light, { loop: true }).to({ rotation: 360 }, 5000);
		egret.Tween.get(that.gift, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000);


		that.headGroup.x = w;
		that.head.source = userDataMaster.myInfo.avatarUrl;
		that.head.mask = that.headMask;
		that.proGroup.x = w;
		that.proBar.width = w;

		that.percentText.text = Math.floor(that.pro * 100) + '%';

		that.energyNum.text = '' + that.energy;
		that.doubleNum.text = that.energy + ' x';
		// if (that.energyAdd != 0) {
		// 	that.energyAddImg.visible = true;
		// }
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
		if (item_0.state == 0) {
			//初次获得
			item_0.state = 2;
			that.newTip.visible = true;
			userDataMaster.setTravel(newArr[0], item_0);
			userDataMaster.travelList.push(newArr[0]);
		}
		if (item_1.state == 0) {
			//初次获得
			item_1.state = 2;
			that.newTip.visible = true;
			userDataMaster.setTravel(newArr[1], item_1);
			userDataMaster.travelList.push(newArr[1]);
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

		this.updateScore();
		that.touchRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
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
		let that = this;
		let level = userDataMaster.degree;
		platform.openDataContext.postMessage({
			type: "updateScore",
			score: that.score,
			level: level,
			width: 80,
			height: 80
		});

		let params = {
			level,
			score: this.score,
			uid: userDataMaster.getMyInfo.uid
		}
		ServiceMaster.post(
			ServiceMaster.getScore,
			params,
			function (suc) {
				if (parseInt(suc.code) === 1 && suc.data) {
					//分数提交成功
					if (userDataMaster.degree == 10) {
						//第10阶段
						if (suc.data.transcend == 1) {
							let texture = RES.getRes('img_hight_png');
							let img = new eui.Image(texture);
							img.x = 370, img.y = 205;
							that.addChild(img);
						}
						if (suc.data.proportion >= 0) {
							that.surpassText.text = suc.data.proportion + '%';
						}
					}
				}
			}
		);

		if (that.pro == 1) {
			userDataMaster.degree++;
		}
	}
	public homeFun() {
		let parent = this.closeSceneFun();
		let start = new startScene()
		parent.addChild(start);
		start.addChild(new friendHelp());
	}
	public getEnergyFun() {
		let that = this;
		if (that.haveGet) {
			return;
		}
		that.addChild(new getSuccess(-1, '' + that.energy));
		that.haveGet = true;
		that.removeChild(that.doubleEnergy);
		that.getEnergy.x = (750 - that.getEnergy.width) / 2;
		that.getEnergy.addChild(that.createGot());
	}
	public doubleEnergyFun() {
		let that = this;
		if (that.haveGet) {
			return;
		}
		AdMaster.useVideo(() => {
			suc();
		}, () => {
			CallbackMaster.openShare(() => {
				suc();
			})
		});
		function suc() {
			that.multip = 2 + Math.floor(Math.random() * 3);//2-4倍
			userDataMaster.myGold += that.energy * (that.multip - 1);
			that.doubleTimes.text = '' + that.multip;
			egret.Tween.removeTweens(that.light);
			egret.Tween.removeTweens(that.gift);
			that.gift.scaleX = 1;
			that.gift.scaleY = 1;
			that.addChild(new getSuccess(-1, 'x ' + that.energy * that.multip));
			that.haveGet = true;
			that.removeChild(that.getEnergy);
			that.doubleEnergy.x = (750 - that.doubleEnergy.width) / 2;
			that.doubleEnergy.addChild(that.createGot());
		}
	}
	public createGot() {
		let img = new eui.Image();
		img.texture = RES.getRes('gameover_got_png');
		return img;
	}
	public shareFun() {
		CallbackMaster.openShare(null, false);
	}
	public againFun() {
		let parent = this.closeSceneFun();
		parent.addChild(new runningScene());
	}
	public openBallFun() {
		let parent = this.closeSceneFun();
		let start = new startScene();
		parent.addChild(start);
		start.addChild(new myBalls(true));
	}
	public travelFun() {
		let parent = this.closeSceneFun();
		let start = new startScene();
		parent.addChild(start);
		start.addChild(new travelScene());
	}
	public closeSceneFun() {
		this.touchRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
		this.terval && clearInterval(this.terval);
		this.through && this.through.stop();
		egret.Tween.removeAllTweens();
		let parent = this.parent;
		parent.removeChild(this);
		return parent;
	}
}