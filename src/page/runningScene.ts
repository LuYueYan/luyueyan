
class runningScene extends eui.Component implements eui.UIComponent {
	public scoreText: eui.Label;
	public flowerGroup: eui.Group;
	public startBg: grayBg;
	public startBtn: eui.Button;
	public startImg: eui.Image;
	public ballText: eui.Label;
	public perfectGroup: eui.Group;
	public perfectText: eui.Label;
	public startTips: eui.Group;
	public degreeText: eui.Label;


	public world: p2.World;
	public factor: number = 50;
	public bee: p2.Body;
	public currentTimer = egret.getTimer();
	public flowerArr = [];
	public ceilArr = [];
	public removeArr = [];
	public score = 0;//分数
	public currentTheme = 1;//当前第几个主题（从1开始算）
	public moveSpeed = 1;
	public hitNum = 0;//当前主题的建筑出现次数
	public perfectNum = 0;//连续击中中心光束的次数
	public themeArr = [
	];
	//num--该主题的数量 score--单次击中分数 energy--单次击中能量 width--建筑总宽度 tw--接触面宽度  th--接触面顶部距离图片顶部距离
	// left--发光点距离左侧距离  top--发光点距离顶部距离 name--建筑图片名字 begin主题渐变起色 end--主题渐变结束色
	public buildingLoop = {
		img_castle_a: [],
		img_castle_b: [],
		img_castle_c: [],
		img_castle_d: [],
		img_castle_e: [],
		img_castle_f: [],
		img_castle_g: [],
		img_castle_h: [],
		img_castle_i: [],
		img_castle_j: [],
		lightning: []
	};//建筑回收数组

	//throughModal
	public through: throughModal;
	public list = [];
	public chooseList = [];
	public terval = null;

	public adaptation = 0;//适配长度
	public bgLinear;//渐变背景
	public rebornNum = 0;//是否已经复活
	public guide;//新手引导图片
	public guideProcess = 0;//引导进度
	public worldSpeed = 1000;//世界运行速度
	public speed = {
		before: 4000,//出现开始按钮前
		guide: 2000,//新手引导时
		start: 1500,//开始掉落中间时
		common: 1000,//正常初始速度
		still: 1000000//静态时

	};//各种速度
	public currentBall = userDataMaster.runCat;//本局使用的球index
	public energy = 0;//本局获得的能量果数量
	public trying = false;//是否试玩
	public energyAdd = 0;//本局能量加成百分比
	public perfectGif;
	public degree = 0;//当前阶段
	public spirit: spiritCom;
	public constructor(theme = 1, score = 0, hitNum = 0, currentBall = -1, rebornNum = 0, energy = 0, energyAdd = 0, themeArr = []) {
		super();
		this.currentTheme = theme;
		this.score = score;
		this.hitNum = hitNum;
		if (currentBall != -1) {
			if (currentBall > 50) {
				currentBall -= 100;
				this.trying = true;
			}
			this.currentBall = currentBall;
		}
		this.energyAdd = energyAdd;
		this.rebornNum = rebornNum;
		this.energy = energy;
		if (themeArr.length > 0) {
			this.themeArr = themeArr;
		}
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}
	protected childrenCreated(): void {
		super.childrenCreated();
		if (this.scoreText) {
			this.init()
		} else {
			this.addEventListener(egret.Event.COMPLETE, this.init, this)
		}
	}
	public init() {
		let that = this;
		AdMaster.closeBannerAd();
		this.worldSpeed = this.speed.still;
		that.degree = userDataMaster.degree;
		if (that.rebornNum == 0) {
			new randomTheme().init(() => {
				that.addChildAt(new colorBgCom(that.currentTheme), 0);
				that.themeArr = randomTheme.getInstance().degreeThemeArr;
				that.speed.common = randomTheme.getInstance().degreeItem.speed;

			});
		} else {
			that.addChildAt(new colorBgCom(that.currentTheme), 0);
			that.themeArr = randomTheme.getInstance().degreeThemeArr;
			that.speed.common = randomTheme.getInstance().degreeItem.speed;
		}
		// console.log(that.degree, randomTheme.getInstance().degreeItem);
		// console.log(that.themeArr)
		this.degreeText.text = '当前难度为' + that.degree + '阶';
		this.scoreText.text = this.score + '';
		this.adaptation = (this.stage.stageHeight - 1334) / this.factor;
		let ball = userDataMaster.cats[this.currentBall];
		this.ballText.text = ball.name;
		//创建world
		this.world = new p2.World();
		this.world.sleepMode = p2.World.BODY_SLEEPING;//睡眠策略，提高性能
		this.world.gravity = [0, -60];
		this.spirit = new spiritCom();
		this.spirit.init(that.currentBall, that.adaptation, (bee) => {
			that.addChild(bee.displays[0]);
			that.world.addBody(bee);
			that.worldSpeed = that.speed.before;
			that.bee = bee;
			setTimeout(function () {
				that.ballText.visible = true;
				egret.Tween.get(that.startTips).to({ alpha: 1 }, 500);
			}, 1000);
			setTimeout(function () {
				that.worldSpeed = that.speed.still;
				if (that.guide) {
					that.guide.visible = true;
				}
				that.startBtn.visible = true;
			}, 2000);
		});

		let themeItem = that.themeArr[that.currentTheme - 1];
		let initList = [{ type: 0, y: 6 }, { type: 2, y: 8 }, { type: 1, y: 10 }, { type: 2, y: 12 }, { type: 1, y: 14 }];
		for (let i = 0; i < 5; i++) {
			let item = initList[i];
			let building = new buildingCom(item.type, that.adaptation);
			building.init(themeItem, item.y);
			that.world.addBody(building.boxBody);
			setTimeout(function () {
				that.flowerGroup.addChildAt(building.boxBody.displays[0], 0);
				that.flowerGroup.addChildAt(building.boxBody.displays[1], 1);
			}, 10);
			that.flowerArr.push(building);
		}

		//右边墙壁
		var planeBody: p2.Body = new p2.Body({ mass: 1, position: [16, 0], type: p2.Body.STATIC, material: new p2.Material(3) });//创建墙壁
		var shape: p2.Shape = new p2.Box({ width: 1, height: 60 });
		planeBody.addShape(shape);//给这个刚体添加形状
		planeBody.displays = [];//与每个形状对应的显示对象
		this.world.addBody(planeBody);
		this.ceilArr.push(planeBody)
		//左边墙壁
		var planeBody: p2.Body = new p2.Body({ mass: 1, position: [-1, 0], type: p2.Body.STATIC, material: new p2.Material(3) });//创建墙壁
		var shape: p2.Shape = new p2.Box({ width: 1, height: 60 });
		planeBody.addShape(shape);//给这个刚体添加形状
		planeBody.displays = [];//与每个形状对应的显示对象
		this.world.addBody(planeBody);
		this.ceilArr.push(planeBody);
		if (userDataMaster.getMyInfo.is_new_user && !this.trying) {
			this.guide = new guideModal();
			this.addChild(this.guide);
			this.guide.addChild(this.startBtn);
			this.guide.visible = false;
		}

		egret.Tween.get(that.startBtn, { loop: true }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000)
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startFun, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.perfectGif = movieMaster.getGif('continue');
		this.perfectGif.x = 30;
		this.perfectGroup.addChild(this.perfectGif);
		platform.onShow(() => {
			//当页面隐藏后重新打开时恢复时间节点
			if (that.currentTimer) {
				that.currentTimer = egret.getTimer();
			}
		})
	}
	public startFun() {
		soundMaster.playSongMusic(this.degree, this.rebornNum);
		this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startFun, this);
		this.removeChild(this.startImg);
		this.removeChild(this.startTips);
		this.removeChild(this.ballText);
		this.removeChild(this.startBg);
		egret.Tween.removeTweens(this.startBtn);
		if (this.guide) {
			this.guide.process_1.visible = false;
			this.guide.removeChild(this.startBtn)
			this.removeChild(this.guide);
			this.guideProcess = 1;//第一步引导完成
			this.worldSpeed = this.speed.guide;
		} else {
			this.removeChild(this.startBtn);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
			this.worldSpeed = this.speed.start;//第一步减速
		}
		this.currentTimer = egret.getTimer();
	}
	private onEnterFrame() {
		let that = this;
		let dt = egret.getTimer() - this.currentTimer;
		if (dt < 10) {
			return;
		}
		if (dt > 1000) {
			return;
		}
		this.world.step(dt / this.worldSpeed);//使物理系统向前经过一定时间，也就是使世界运行
		this.currentTimer = egret.getTimer();
		var stageHeight: number = egret.MainContext.instance.stage.stageHeight;//获取舞台高度？？？？
		var l = this.world.bodies.length;//所有body的长度
		var currentTheme = that.themeArr[that.currentTheme - 1];
		let marginTop = currentTheme.top + 10;
		let marginLeft = currentTheme.left;
		for (var i: number = 0; i < l; i++) {
			var boxBody: p2.Body = this.world.bodies[i];
			var len = boxBody.displays.length;
			for (let j = 0; j < len; j++) {
				var box: egret.DisplayObject = boxBody.displays[j];
				if (box) {
					if (j == 0) {
						box.anchorOffsetX = boxBody.displays[0].width / 2;
					}
					box.x = boxBody.position[0] * this.factor;
					box.y = stageHeight - boxBody.position[1] * this.factor;//坐标系不一样，所以要转换
					box.rotation = 360 - (boxBody.angle + boxBody.shapes[j].angle) * 180 / Math.PI;//旋转
					if (j == 1) {
						box.y -= (boxBody.displays[0].height / 2 - marginTop) * boxBody.displays[0].scaleY;
						box.x -= (boxBody.displays[0].width / 2 - marginLeft) * boxBody.displays[0].scaleX;
						box.rotation = 180;
					}
				}
			}
		}
		if (that.bee.position[1] < 0) {

			this.gameOver();
			return;
		}
		let c=that.flowerArr[0].boxBody.displays[0].x + 30 >= that.bee.displays[0].x && that.flowerArr[0].boxBody.displays[0].x - 30 <= that.bee.displays[0].x;
		if (this.guide && (this.guideProcess % 2 == 1) && that.flowerArr[0].type == 2 && c) {
			//第二次引导
			this.addChild(this.guide);
			this.guide.process_3.visible = false;
			this.guide.process_2.visible = true;
			this.guide.alpha = 0;
			egret.Tween.get(this.guide).to({ alpha: 1 }, 1000).call(() => {
				that.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchFun, that);
			})
			this.worldSpeed = this.speed.still;
			this.guideProcess++;//第二/四步引导结束
		}
		if (this.guide && (this.guideProcess % 2 == 0) && that.flowerArr[0].type == 1 &&c) {
			//第三次引导
			this.addChild(this.guide);
			this.guide.process_2.visible = false;
			this.guide.process_3.visible = true;
			this.guide.alpha = 0;
			egret.Tween.get(this.guide).to({ alpha: 1 }, 1000).call(() => {
				that.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchFun, that);
			})
			this.worldSpeed = this.speed.still;
			this.guideProcess++;//第三/五步引导结束
		}
		if (this.guide && this.guideProcess == 7 && that.hitNum == 7) {
			//引导结束
			this.addChild(this.guide);
			this.guide.process_7.visible = true;
			this.guide.alpha = 0;
			egret.Tween.get(this.guide).to({ alpha: 1 }, 1000);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
			userDataMaster.createLoginBtn(250, 808, 250, 90);
			userDataMaster.loginCallback = function () {
				userDataMaster.myGold += 200;
				userDataMaster.myInfo.is_new_user = false;
				let parent = that.parent;
				parent.removeChild(that);
				soundMaster.stopSongMusic();
				parent.addChild(new startScene());
			};
			this.guide.knowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				userDataMaster.myGold += 200;
				userDataMaster.myInfo.is_new_user = false;
				let parent = that.parent;
				parent.removeChild(that);
				soundMaster.stopSongMusic();
				parent.addChild(new startScene());
			}, that);
		}
		let dh = (that.bee.position[1] - that.flowerArr[0].boxBody.position[1]) * that.factor;
		let dw = Math.abs(that.bee.position[0] - that.flowerArr[0].boxBody.position[0]) - currentTheme.tw / 2 / that.factor;
		if (!that.flowerArr[0].haveHit && that.bee.velocity[1] <= 0 && dw <= 0 && (dh <= 357.5 - currentTheme.th - 10 && dh >= 150)) {
			let degreeInfo = randomTheme.getInstance().degreeItem;
			that.score += randomTheme.getInstance().getScore(that.currentTheme);
			that.energy += degreeInfo.energy;
			if (that.flowerArr[0].boxBody.displays[0].x + 30 >= that.bee.displays[0].x && that.flowerArr[0].boxBody.displays[0].x - 30 <= that.bee.displays[0].x) {
				// console.log('center')
				if (that.flowerArr[0].boxBody.displays[1].parent) {
					that.flowerGroup.removeChild(that.flowerArr[0].boxBody.displays[1]);
				}
				that.perfectNum++;
				if (that.perfectNum >= 3) {
					egret.Tween.removeTweens(that.perfectGroup);
					that.perfectGroup.visible = true;

					that.perfectGroup.scaleX = 2.5, that.perfectGroup.scaleY = 2.5;
					that.perfectGroup.alpha = 1;
					that.perfectGif.gotoAndPlay(0, 1);
					that.perfectText.text = 'Combo x' + that.perfectNum;
					that.score += 100;
					that.addChildAt(that.perfectGroup, 2);
					egret.Tween.get(that.perfectGroup).to({ scaleX: 1, scaleY: 1 }, 500).to({ alpha: 0 }, 2000).call(() => {
						that.perfectGroup.parent && that.perfectGroup.parent.removeChild(that.perfectGroup);
					});
				}
			} else {
				that.perfectNum = 0;
			}
			platform.vibrateShort({ success(res) { } })
			that.bee.mass = 3000;
			this.scoreText.text = this.score + '';
			that.flowerArr[0].haveHit = true;
			let r = that.flowerArr.shift();
			r.boxBody.velocity = [0, -10];
			that.removeArr.push(r);
			let sx = 12;
			if (r.type == 1) {
				sx = 20;
				sx += Math.random() * 3;
				that.bee.angle = -0.2;
			} else if (r.type == 2) {
				sx = -20;
				sx -= Math.random() * 3;
				that.bee.angle = 0.2;
			} else {
				//这是是第一步结束，回复正常速度
				that.worldSpeed = this.speed.common;
			}
			that.bee.velocity = [sx, 36];
			that.bee.damping = 0.8;
			if (that.bee.velocity[0] > 0) {
				that.bee.angle = 0.2;
				that.bee.angularVelocity = 0
			} else if (that.bee.velocity[0] < 0) {
				that.bee.angle = -0.2;
				that.bee.angularVelocity = 0;
			} else {
				that.bee.angularVelocity = 0.01;
			}
			that.hitNum++;
			let judgeHitNum = that.hitNum == degreeInfo.num;
			if (judgeHitNum) {
				that.hitNum = 0;
				if (that.degree < 10) {
					if (that.currentTheme < that.themeArr.length) {
						that.currentTheme++;
					} else {
						//通关成功
						that.successOver();
						return;
					}
					that.showProcess();
				} else {
					if (that.currentTheme < that.themeArr.length) {
						that.currentTheme++;
					} else {
						that.currentTheme = 1;
					}
				}

				currentTheme = that.themeArr[that.currentTheme - 1];

				//场景切换
				colorBgCom.getInstance().changeTheme(that.currentTheme);
				let current = currentTheme.name;
				for (let i = 0; i < that.flowerArr.length; i++) {
					that.flowerArr[i].boxBody.shapes[0].width = currentTheme.width / this.factor;
					that.flowerArr[i].boxBody.displays[0].name = current;
					if (i == 0) {
						that.flowerArr[i].boxBody.displays[0].texture = RES.getRes(current + '1_png');

					} else {
						that.flowerArr[i].boxBody.displays[0].texture = RES.getRes(current + '2_png');
					}

					let mt = currentTheme.top + 10;
					let ml = currentTheme.left;
					that.flowerArr[i].boxBody.displays[1].y = stageHeight - that.flowerArr[i].boxBody.position[1] * this.factor - (that.flowerArr[i].boxBody.displays[0].height / 2 - mt) * that.flowerArr[i].boxBody.displays[0].scaleY;
					that.flowerArr[i].boxBody.displays[1].x = that.flowerArr[i].boxBody.position[0] * this.factor - (that.flowerArr[i].boxBody.displays[0].width / 2 - ml) * that.flowerArr[i].boxBody.displays[0].scaleX;
				}
			}

			that.flowerArr[0].boxBody.displays[0].texture = RES.getRes(currentTheme.name + '1_png');
			egret.Tween.get(that.flowerArr[0].boxBody.displays[1]).to({ height: 313 }, 500);
			if (!(that.currentTheme == that.themeArr.length && that.hitNum >= degreeInfo.num - 4)) {
				setTimeout(function () {
					let type = r.type == 2 ? 1 : 2;
					let building;
					if (that.buildingLoop[currentTheme.name].length > 2) {
						building = that.buildingLoop[currentTheme.name].shift();
						building.unpdateBuilding(type);
					} else {
						building = new buildingCom(type, that.adaptation);
						building.init(currentTheme);
					}
					that.world.addBody(building.boxBody);
					setTimeout(function () {
						that.flowerGroup.addChildAt(building.boxBody.displays[0], 0);
						that.flowerGroup.addChildAt(building.boxBody.displays[1], 1);
					}, 100);
					that.flowerArr.push(building);
				}, 50);
			}

		} else {
			//是否撞墙
			let hitright = that.ceilArr[0].overlaps(that.bee);
			if (hitright && !(that.bee.velocity[0] < 0 && that.bee.velocity[1] > 0)) {
				that.bee.velocity = [-25, -8];
				that.bee.angle = -0.2;
				that.bee.mass = 8000;
			}
			let hitleft = that.ceilArr[1].overlaps(that.bee);
			if (hitleft && !(that.bee.velocity[0] > 0 && that.bee.velocity[1] > 0)) {
				that.bee.velocity = [25, -8];
				that.bee.angle = 0.2;
				that.bee.mass = 8000;
			}
		}
		if (that.bee.velocity[1] <= 0) {
			that.bee.damping = 0;
		}
		for (let x = 0, len = that.removeArr.length; x < len; x++) {
			if (that.removeArr[x] && that.removeArr[x].boxBody && (!that.guide || !that.guide.parent)) {
				that.removeArr[x].afterHit(that.world, that.buildingLoop, that.removeArr, x);
			}
		}
		if (that.flowerArr[0].type !== 0) {
			for (let i = 0, len = that.flowerArr.length; i < len; i++) {
				that.flowerArr[i].changeScale(that.speed.common, that.worldSpeed)
			}
		}
	}
	public showProcess() {
		//显示当前进度
		let that = this;
		let text = Math.floor((that.currentTheme - 1) / that.themeArr.length * 100) + '%';
		let pro = new eui.Label(text);
		pro.x = 375;
		pro.y = 1150;
		pro.bold = true;
		pro.size = 80;
		pro.anchorOffsetX = pro.width / 2;
		pro.anchorOffsetY = pro.height / 2;
		pro.scaleX = 2;
		pro.scaleY = 2;
		that.addChild(pro);
		egret.Tween.get(pro).to({ scaleX: 1, scaleY: 1 }, 500).wait(2000).to({ alpha: 0 }, 2000).call(() => {
			that.removeChild(pro);
		})

	}
	public successOver() {
		let that = this;
		console.log(this.degree, egret.getTimer())
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);

		let parent = this.parent;
		// parent.addChild(new gameOver(this.score, this.currentBall, this.energy, this.energyAdd, 1));
		// parent.removeChild(this);
		this.bee.gravityScale = 0;
		this.bee.velocity = [0, 0];
		this.bee.angle = 0;
		for (let x = 0, len = this.removeArr.length; x < len; x++) {
			if (this.removeArr[x] && this.removeArr[x].boxBody.displays) {
				let y = this.removeArr[x].boxBody.displays[0].y;
				egret.Tween.get(this.removeArr[x].boxBody.displays[0]).to({ y: y + 1500 }, 1000);
				let y1 = this.removeArr[x].boxBody.displays[1].y;
				egret.Tween.get(this.removeArr[x].boxBody.displays[1]).to({ y: y1 + 1500 }, 1000);

			}
		}
		egret.Tween.get(this.bee.displays[0])
			.to({ scaleX: 2, scaleY: 2, x: 375, y: 350 }, 2000)
			.call(() => {
				that.addChild(new grayBg());
				that.addChild(that.bee.displays[0]);
				let through = movieMaster.getGif('through');
				through.y = 100;
				that.addChild(through);
				through.gotoAndPlay(0, -1);

				let text = new eui.Label(' 恭喜通过 第' + this.degree + '阶');
				text.size = 60;
				text.bold = true;
				text.width = 280;
				text.lineSpacing = 10;
				text.textAlign = 'center';
				text.x = (750 - text.width) / 2;
				text.y = 538;
				that.addChild(text);
				setTimeout(function () {
					soundMaster.stopSongMusic();
					let texture = RES.getRes('btn_know_png');
					let btn = new eui.Image(texture);
					btn.y = 744;
					btn.x = (750 - 250) / 2;
					btn.touchEnabled = true;
					that.addChild(btn);
					that.addEventListener(egret.TouchEvent.TOUCH_TAP, callback, this);
					function callback() {
						that.removeEventListener(egret.TouchEvent.TOUCH_TAP, callback, this);
						through.stop();
						parent.addChild(new gameOver(that.score, that.currentBall, that.energy, that.energyAdd, 1));
						parent.removeChild(that);
					}
				}, 1000);
			});
	}
	public gameOver() {
		//died
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
		let pro = randomTheme.getInstance().getProccess(this.currentTheme, this.hitNum);
		if (this.rebornNum == 0) {
			//可复活
			soundMaster.stopSongMusic(true);
			this.rebornNum++;
			let born = new reborn(this.score, this.currentBall, this.energy, this.energyAdd, pro);
			this.addChild(born);
			born.rebornBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.judgeReborn, this)
		} else {
			let parent = this.parent;
			soundMaster.stopSongMusic();

			parent.addChild(new gameOver(this.score, this.currentBall, this.energy, this.energyAdd, pro));
			parent.removeChild(this);
		}
	}
	public judgeReborn() {
		//video or share
		let that = this;
		AdMaster.useVideo(() => {
			suc();
		}, () => {
			// console.log('share')
			CallbackMaster.openShare(() => {
				suc();
			})
		});
		let suc = function () {
			let parent = that.parent;
			let theme = that.currentTheme;
			let score = that.score;
			let hitNum = that.hitNum;
			let currentBall = that.currentBall;
			let rebornNum = that.rebornNum;
			let energy = that.energy;
			let energyAdd = that.energyAdd;
			let themeArr = that.themeArr;
			parent.removeChild(that);
			parent.addChild(new runningScene(theme, score, hitNum, currentBall, rebornNum, energy, energyAdd, themeArr));
		}
	}

	public touchFun(e: egret.TouchEvent) {
		// console.log('touch')
		this.bee.velocity = [0, -80];

		this.bee.angle = 0;
		this.bee.angularVelocity = 0;
		if (this.guide && this.guide.parent) {
			
			this.guide.process_3.visible = false;
			this.guide['process_' + this.guideProcess].visible = false;
			this.guide.parent.removeChild(this.guide);
			this.worldSpeed = this.speed.guide;
			if (this.guideProcess < 7) {
				this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
			}
		}
	}

}