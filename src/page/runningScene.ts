
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


	public world: p2.World;
	public factor: number = 50;
	public bee: p2.Body;
	public timer: egret.Timer;
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
		{ index: 1, num: 15, score: 52, energy: 2, width: 340, tw: 340,th:0, left: 175, top: 60, name: 'img_castle_a', begin: 0x7a3fc3, end: 0x30368d },
		{ index: 5, num: 30, score: 101, energy: 5, width: 340, tw: 340, left: 170, top: 72, name: 'img_castle_e', begin: 0xca5b49, end: 0x8f3234 },
		{ index: 8, num: 25, score: 101, energy: 5, width: 340, tw: 340, left: 175, top: 55, name: 'img_castle_h', begin: 0xf8a5fd, end: 0xb295ff },
		{ index: 9, num: 20, score: 101, energy: 5, width: 340, tw: 340, left: 170, top: 45, name: 'img_castle_i', begin: 0x4ddcae, end: 0x4dd4dc },
		{ index: 10, num: 15, score: 101, energy: 5, width: 340, tw: 340, left: 175, top: 30, name: 'img_castle_j', begin: 0xd0faff, end: 0xc4d3ea },
		{ index: 2, num: 20, score: 64, energy: 3, width: 250, tw: 250, left: 130, top: 55, name: 'img_castle_b', begin: 0x4a3fac, end: 0x192c6f },
		{ index: 3, num: 30, score: 76, energy: 4, width: 250, tw: 205, left: 130, top: 45, name: 'img_castle_c', begin: 0xabdf85, end: 0x3ccd84 },
		{ index: 6, num: 25, score: 101, energy: 5, width: 250, tw: 250, left: 130, top: 65, name: 'img_castle_f', begin: 0xf3d781, end: 0xdf7252 },
		{ index: 4, num: 25, score: 88, energy: 5, width: 250, tw: 110, left: 118, top: 33, name: 'img_castle_d', begin: 0x9f3c70, end: 0x5f1c5a },
		{ index: 7, num: 30, score: 101, energy: 5, width: 250, tw: 160, left: 132, top: 35, name: 'img_castle_g', begin: 0xffa7a0, end: 0xf4746c },

	];
	//num--该主题的数量 score--单次击中分数 energy--单次击中能量 width--建筑总宽度 tw--接触面宽度 
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
	public currentBall = userDataMaster.runCat;//本局使用的球index
	public energy = 0;//本局获得的能量果数量
	public trying = false;//是否试玩
	public energyAdd = 0;//本局能量加成百分比
	public perfectGif;
	public constructor(theme = 1, score = 0, hitNum = 0, currentBall = -1, rebornNum = 0, energy = 0, energyAdd = 0) {
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
		this.worldSpeed = 1000000;
		that.randomTheme();
		this.scoreText.text = this.score + '';
		this.adaptation = (this.stage.stageHeight - 1334) / this.factor;
		let ball = userDataMaster.cats[this.currentBall];
		this.ballText.text = ball.name;
		//创建world
		this.world = new p2.World();
		this.world.sleepMode = p2.World.BODY_SLEEPING;//睡眠策略，提高性能
		this.world.gravity = [0, -60];
		this.createBee();
		this.createFlower('center');
		this.createFlower('right', 8);
		this.createFlower('left', 10);
		this.createFlower('right', 12);
		this.createFlower('left', 14);
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
			// this.worldSpeed = 1000000;
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
	public randomTheme() {
		let that = this;
		let arr = [];
		let sourceArr = this.themeArr;
		let len = 5;
		for (let i = 0; i < len; i++) {
			let ran = Math.floor(Math.random() * len);
			arr.push(sourceArr[ran]);
			sourceArr.splice(ran, 1);
			len--;
		}
		this.themeArr = arr.concat(sourceArr);
		this.createBg(that.themeArr[that.currentTheme - 1].begin, that.themeArr[that.currentTheme - 1].end);
	}
	public createBg(begin: number, end: number) {
		if (!this.bgLinear) {
			this.bgLinear = new egret.Sprite();
			this.addChildAt(this.bgLinear, 0);
		} else {
			this.bgLinear.graphics.clear();
		}

		let matix: egret.Matrix = this.bgLinear.matrix;
		matix.createGradientBox(750 / 2, this.stage.stageHeight / 2, Math.PI / 2, 750 / 4, this.stage.stageHeight / 4);
		this.bgLinear.graphics.beginGradientFill(egret.GradientType.LINEAR, [begin, end], [1, 1], [0, 255], matix);
		this.bgLinear.graphics.drawRect(0, 0, 750, this.stage.stageHeight);
		this.bgLinear.graphics.endFill();
	}
	public startFun() {
		soundMaster.playSongMusic(this.currentBall);
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
			this.worldSpeed = 1500;
		} else {
			this.removeChild(this.startBtn);
			this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
			this.worldSpeed = 2000;//第一步减速
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
		let marginTop = that.themeArr[that.currentTheme - 1].top + 10;
		let marginLeft = that.themeArr[that.currentTheme - 1].left;
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
		if (this.guide && this.guideProcess == 1 && that.flowerArr[0].params.type == "right" && Math.abs(this.bee.position[0] - this.flowerArr[0].body.position[0]) < 1) {
			//第二次引导
			this.addChild(this.guide);
			this.guide.process_2.visible = true;
			this.guide.alpha = 0;
			egret.Tween.get(this.guide).to({ alpha: 1 }, 1000).call(() => {
				that.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchFun, that);
			})
			this.worldSpeed = 1000000;
			this.guideProcess = 2;//第二步引导结束
		}
		if (this.guide && this.guideProcess == 2 && that.flowerArr[0].params.type == "left" && Math.abs(this.bee.position[0] - this.flowerArr[0].body.position[0]) < 1) {
			//第三次引导
			this.addChild(this.guide);
			this.guide.process_3.visible = true;
			this.guide.alpha = 0;
			egret.Tween.get(this.guide).to({ alpha: 1 }, 1000).call(() => {
				that.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchFun, that);
			})
			this.worldSpeed = 1000000;
			this.guideProcess = 3;//第三步引导结束
		}
		if (this.guide && this.guideProcess == 3 && that.hitNum == 5) {
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
		let hitright = that.ceilArr[0].overlaps(that.bee);
		if (hitright) {
			that.bee.velocity = [-25, -8];
			that.bee.angle = -0.2;
			that.bee.mass = 8000;
		}
		let hitleft = that.ceilArr[1].overlaps(that.bee);
		if (hitleft) {
			that.bee.velocity = [25, -8];
			that.bee.angle = 0.2;
			that.bee.mass = 8000;
		}
		// let hit = that.flowerArr[0].body.overlaps(that.bee);

		// let top = (that.bee.position[1] - that.bee.displays[0].height / 2 / that.factor) - (that.flowerArr[0].body.position[1] + that.flowerArr[0].body.displays[0].height / 2 / that.factor);
		let dh = (that.bee.position[1] - that.flowerArr[0].body.position[1]) * that.factor;
		// let dw = Math.abs(that.bee.position[0] - that.flowerArr[0].body.position[0]) - that.flowerArr[0].body.displays[0].width / 2/that.factor;
		let dw = Math.abs(that.bee.position[0] - that.flowerArr[0].body.position[0]) - that.themeArr[that.currentTheme - 1].tw / 2 / that.factor;
		if (!that.flowerArr[0].params.haveHit && that.bee.velocity[1] <= 0 && dw <= 0 && ((that.flowerArr[0].params.type != 'center' && dh <= 357.5 - 30 && dh >= 150) || (dh <= 357.5 - 60 && dh >= 200))) {
			if (that.flowerArr[0].body.displays[0].x + 30 >= that.bee.displays[0].x && that.flowerArr[0].body.displays[0].x - 30 <= that.bee.displays[0].x) {
				// console.log('center')
				if (that.flowerArr[0].body.displays[1].parent) {
					that.buildingLoop.lightning.push(that.flowerArr[0].body.displays[1]);
					that.flowerGroup.removeChild(that.flowerArr[0].body.displays[1]);
				}
				that.perfectNum++;
				if (that.perfectNum >= 3) {
					egret.Tween.removeTweens(that.perfectGroup);
					that.perfectGroup.visible = true;

					// that.perfectGroup.scaleX = 0, that.perfectGroup.scaleY = 0;
					that.perfectGroup.alpha = 1;
					that.perfectGif.gotoAndPlay(0, 1)
					that.perfectText.text = 'Combo x' + that.perfectNum;
					that.addChildAt(that.perfectGroup, 2);
					egret.Tween.get(that.perfectGroup).to({ scaleX: 1, scaleY: 1 }, 500).to({ alpha: 0 }, 2000).call(() => {
						that.perfectGroup.parent && that.perfectGroup.parent.removeChild(that.perfectGroup);
					});
				}
			} else {
				that.perfectNum = 0;
			}
			that.score += that.themeArr[that.currentTheme - 1].score;
			that.energy += that.themeArr[that.currentTheme - 1].energy;
			platform.vibrateShort({ success(res) { } })
			that.bee.mass = 3000;
			this.scoreText.text = this.score + '';
			that.flowerArr[0].params.haveHit = true;
			let r = that.flowerArr.shift();
			r.body.velocity = [0, -10];
			that.removeArr.push(r);
			let sx = 12;
			if (r.params.type == 'left') {
				sx = 20;
				sx += Math.random() * 3;
				that.bee.angle = -0.2;
			} else if (r.params.type == 'right') {
				sx = -20;
				sx -= Math.random() * 3;
				that.bee.angle = 0.2;
			} else {
				//这是是第一步结束，回复正常速度
				that.worldSpeed = 1000;
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
			let judgeHitNum = that.hitNum == that.themeArr[that.currentTheme - 1].num;
			if (judgeHitNum) {
				// if(that.trying){
				// 	//是试玩
				// 	that.removeEventListener(egret.Event.ENTER_FRAME, that.onEnterFrame, that);
				// 	that.addChild(new tryModal(that.currentBall));
				// 	that.worldSpeed=100000;
				// 	return;
				// }

				that.hitNum = 0;
				that.currentTheme < that.themeArr.length ? that.currentTheme++ : that.currentTheme = 1;
				//难度增大
				if (that.currentTheme < 6) {
					that.worldSpeed = 1000 - that.currentTheme * 80;
				} else {
					that.worldSpeed = 1000 - (that.currentTheme - 5) * 80;
				}


				this.createBg(that.themeArr[that.currentTheme - 1].begin, that.themeArr[that.currentTheme - 1].end)
				let current = that.themeArr[that.currentTheme - 1].name;
				for (let i = 0; i < that.flowerArr.length; i++) {
					that.flowerArr[i].body.shapes[0].width = this.themeArr[this.currentTheme - 1].width / this.factor;
					if (i == 0) {
						that.flowerArr[i].body.displays[0].texture = RES.getRes(current + '1_png');

					} else {
						that.flowerArr[i].body.displays[0].texture = RES.getRes(current + '2_png');
					}

					let mt = that.themeArr[that.currentTheme - 1].top + 10;
					let ml = that.themeArr[that.currentTheme - 1].left;
					that.flowerArr[i].body.displays[1].y = stageHeight - that.flowerArr[i].body.position[1] * this.factor - (that.flowerArr[i].body.displays[0].height / 2 - mt) * that.flowerArr[i].body.displays[0].scaleY;
					that.flowerArr[i].body.displays[1].x = that.flowerArr[i].body.position[0] * this.factor - (that.flowerArr[i].body.displays[0].width / 2 - ml) * that.flowerArr[i].body.displays[0].scaleX;
				}
				// that.throughFun();
			}
			let cur = that.themeArr[that.currentTheme - 1].name;

			that.flowerArr[0].body.displays[0].texture = RES.getRes(cur + '1_png');
			egret.Tween.get(that.flowerArr[0].body.displays[1]).to({ height: 313 }, 500);
			let type = r.params.type == 'right' ? 'left' : 'right';
			that.createFlower(type);
		}
		if (that.bee.velocity[1] <= 0) {
			that.bee.damping = 0;
		}
		for (let x = 0, len = that.removeArr.length; x < len; x++) {
			if (that.removeArr[x] && that.removeArr[x].body && (!that.guide || !that.guide.parent)) {
				that.removeArr[x].body.displays[0].scaleX += 0.005;
				if (that.removeArr[x].body.position[1] < -4) {
					that.world.removeBody(that.removeArr[x].body);
					if (that.removeArr[x].body.displays[0] && that.removeArr[x].body.displays[0].parent) {
						that.buildingLoop[that.removeArr[x].body.displays[0].name].push(that.removeArr[x].body.displays[0]);
						that.flowerGroup.removeChild(that.removeArr[x].body.displays[0]);
					}
					if (that.removeArr[x].body.displays[1] && that.removeArr[x].body.displays[1].parent) {
						that.buildingLoop.lightning.push(that.removeArr[x].body.displays[1]);
						that.flowerGroup.removeChild(that.removeArr[x].body.displays[1]);
					}



					that.removeArr.shift();
					x > 0 && x--;
				}
			}
		}
		if (that.flowerArr[0].params.type !== "center") {
			let cur = that.themeArr[that.currentTheme - 1].name;
			for (let i = 0; i < 5; i++) {
				if (that.flowerArr[i].body.displays[0].scaleX < 1) {
					that.flowerArr[i].body.displays[0].scaleX += 0.001 * 1000 / that.worldSpeed;
					that.flowerArr[i].body.displays[0].scaleY += 0.001 * 1000 / that.worldSpeed;
					that.flowerArr[i].body.displays[1].scaleX += 0.001 * 1000 / that.worldSpeed;
					that.flowerArr[i].body.displays[1].scaleY += 0.001 * 1000 / that.worldSpeed;
					that.flowerArr[i].body.velocity[1] = -2;

				}
			}
		}
	}
	public gameOver() {
		//died
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
		if (this.rebornNum == 0) {
			//可复活
			this.rebornNum++;
			let born = new reborn(this.score, this.currentBall, this.energy, this.energyAdd);
			this.addChild(born);
			born.rebornBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.judgeReborn, this)
		} else {
			let parent = this.parent;
			let energy = parseInt(this.energy * (1 + this.energyAdd) + '');
			parent.addChild(new gameOver(this.score, this.currentBall, energy));
			parent.removeChild(this);
		}
	}
	public judgeReborn() {
		//video or share
		let that = this;
		AdMaster.useVideo(() => {
			suc();
		}, () => {
			console.log('share')
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
			parent.removeChild(that);
			parent.addChild(new runningScene(theme, score, hitNum, currentBall, rebornNum, energy, energyAdd));
		}
	}
	public createBee() {
		let that = this;
		var boxShape: p2.Shape = new p2.Box({ width: 3.2, height: 3.2, material: new p2.Material(1) });
		this.bee = new p2.Body({ mass: 5000, position: [7.5, 26 + this.adaptation] });
		// this.bee.gravityScale = 0;
		this.bee.collisionResponse = false;
		this.bee.addShape(boxShape);
		this.world.addBody(this.bee);
		var display: egret.Bitmap = new egret.Bitmap();
		var texture: egret.Texture = RES.getRes('img_elf_' + this.currentBall + '2_png');
		display.texture = texture;
		display.width = 160;
		display.height = 160;
		display.anchorOffsetX = display.width / 2;
		display.anchorOffsetY = display.height / 2;
		this.bee.displays = [display];
		this.addChild(display);
		this.worldSpeed = 4000;
		setTimeout(function () {
			that.ballText.visible = true;
			egret.Tween.get(that.startTips).to({ alpha: 1 }, 500);
		}, 1000);
		setTimeout(function () {
			that.worldSpeed = 1000000;
			if (that.guide) {
				that.guide.visible = true;
			}
			that.startBtn.visible = true;
		}, 2000);

	}
	public createFlower(type = 'left', y = 14) {
		let that = this;
		let width = that.themeArr[that.currentTheme - 1].width / that.factor;
		var boxShape: p2.Shape = new p2.Box({ width, height: 11.1, material: new p2.Material(2) });
		var boxBody: p2.Body = new p2.Body({ mass: 500, gravityScale: 0, type: p2.Body.KINEMATIC });
		var display = that.createBitmapByName(that.themeArr[that.currentTheme - 1].name);
		display.name = that.themeArr[that.currentTheme - 1].name;
		display.anchorOffsetX = display.width / 2;
		display.anchorOffsetY = display.height / 2;
		display.x = display.width / 2;
		display.y = display.height / 2;
		display.scaleX = 0.8;
		display.scaleY = 0.8;
		if (type == 'center') {
			boxBody.position = [7.5, 6 + that.adaptation];
			display.texture = RES.getRes(that.themeArr[that.currentTheme - 1].name + '1_png');
		} else if (type == 'left') {
			let ran = Math.random() > 0.9 ? Math.random() * 2 : -Math.random() * 2;
			boxBody.position = [5 + ran, y + that.adaptation]
		} else {
			let ran = Math.random() > 0.9 ? -Math.random() * 2 : Math.random() * 2;
			boxBody.position = [10 + ran, y + that.adaptation];
		}

		var lightningShape: p2.Shape = new p2.Box({ width: 0.92, height: 6.26, material: new p2.Material(2) });
		let lightning = that.createBitmapByName('lightning');

		lightning.x = lightning.width / 2;
		lightning.y = - (<p2.Box>boxShape).height * that.factor / 2;
		lightning.anchorOffsetX = lightning.width / 2;
		lightning.height = 0;
		lightning.rotation = 180;
		boxBody.displays = [display, lightning];
		boxBody.addShape(boxShape);

		boxBody.addShape(lightningShape);
		that.world.addBody(boxBody);
		setTimeout(() => {
			that.flowerGroup.addChildAt(display, 0);

			that.flowerGroup.addChildAt(lightning, 1);
		}, 100)
		that.flowerArr.push({ body: boxBody, params: { type, haveHit: false } });
	}
	public touchFun(e: egret.TouchEvent) {
		// console.log('touch')
		this.bee.velocity = [0, -80];

		this.bee.angle = 0;
		this.bee.angularVelocity = 0;
		if (this.guide && this.guide.parent) {
			this.guide['process_' + this.guideProcess].visible = false;
			this.guide.parent.removeChild(this.guide);
			this.worldSpeed = 5000;
			if (this.guideProcess < 3) {
				this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
			}
		}
	}
	public throughFun() {
		let that = this;
		this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
		that.through = new throughModal();
		this.addChild(that.through);
		that.worldSpeed = 10000;
		let t = 500;
		if (this.guide && this.guideProcess == 3) {
			//引导
			that.through.addChild(this.guide);
			this.guide.addChild(that.through.tap_1);
			this.guide.addChild(that.through.tap_2);
			this.guide.process_4.visible = true;
			that.list = [1, 2, 1];
			t = 1000;
		}
		for (let i = 0; i < 3; i++) {
			if (that.list.length == i) {
				let ran = Math.random() > 0.5 ? 2 : 1;
				that.list.push(ran);
			}
			that.through['item_' + i].texture = RES.getRes('img_click_0' + that.list[i] + '_png');
		}
		that.terval = setInterval(() => {
			if (that.through.processMask.width > 0) {
				that.through.processMask.width -= 20;
				that.through.process.mask = that.through.processMask;
			} else {
				clearInterval(that.terval);
				that.throughEndFun(false)
			}
		}, t)
		that.through.tap_1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { that.chooseFun(1) }, this);
		that.through.tap_2.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { that.chooseFun(2) }, this);

	}
	public throughEndFun(type) {
		let that = this;
		if (type) {
			that.removeChild(that.through);
			if (this.guide && this.guide.parent && this.guideProcess == 6) {
				this.addChild(this.guide);
				this.guide.process_6.visible = false;
				this.guide.removeChild(this.through.tap_1);
				this.guide.removeChild(this.through.tap_2);
				this.guide.process_7.visible = true;
				userDataMaster.createLoginBtn(250, 808, 440, 204);
				userDataMaster.loginCallback = function () {
					userDataMaster.myGold += 200;
					userDataMaster.myInfo.is_new_user = false;
					let parent = that.parent;
					parent.removeChild(that);
					parent.addChild(new startScene());
				}
				this.guide.knowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
					userDataMaster.myGold += 200;
					userDataMaster.myInfo.is_new_user = false;
					let parent = that.parent;
					parent.removeChild(that);
					parent.addChild(new startScene());

				}, that);
			} else {

				let speed = Math.random() > 0.7 ? 800 : 1000;
				this.worldSpeed = speed;
				that.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchFun, that);
			}
		} else {
			that.removeChild(that.through);
			that.gameOver();
		}
	}
	public chooseFun(type) {
		let len = this.chooseList.length;
		if (this.list[len] == type) {
			this.through['item_' + len].alpha = 1;
			this.chooseList.push(type);
			if (this.guide && this.guide.parent && this.guideProcess >= 3 && this.guideProcess < 6) {
				this.guideProcess++;
				this.guide['process_' + (this.guideProcess + 1)].visible = true;
			}
			if (this.chooseList.length == 3) {
				//通过
				this.chooseList = [];
				this.list = [];
				clearInterval(this.terval);
				this.throughEndFun(true);
			}
		} else if (this.guide && this.guide.parent) {
			return;
		} else {
			clearInterval(this.terval);
			this.throughEndFun(false);
		}
	}
	private createBitmapByName(name: string): egret.Bitmap {
		let that = this;
		if ((name !== 'lightning' && that.buildingLoop[name].length > 0) || that.buildingLoop[name].length > 5) {
			let item = that.buildingLoop[name].shift();
			item.texture = RES.getRes(name + '2_png');
			item.scaleX = 1, item.scaleY = 1;
			return item;
		} else {
			var result: egret.Bitmap = new egret.Bitmap();
			var texture: egret.Texture = RES.getRes(name + '2_png');
			result.texture = texture;
			return result;
		}
	}
}