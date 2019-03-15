
class runningScene extends eui.Component implements eui.UIComponent {
	public scoreText: eui.Label;
	public flowerGroup: eui.Group;
	public startBtn: eui.Button;
	public startImg: eui.Image;
	public ballText: eui.Label;

	public world: p2.World;
	public factor: number = 50;
	public bee: p2.Body;
	public timer: egret.Timer;
	public currentTimer = egret.getTimer();
	public flowerArr = [];
	public ceilArr = [];
	public removeArr = [];
	public score = 0;//分数
	public currentTheme = 1;
	public moveSpeed = 1;
	public hitNum = 0;
	public themeArr = [
		{ index: 1, num: 15, score: 52, energy: 3, width: 340, top: 60, name: 'img_castle_a', begin: 0x7a3fc3, end: 0x30368d },
		{ index: 2, num: 20, score: 64, energy: 4, width: 340, top: 45, name: 'img_castle_b', begin: 0x4a3fac, end: 0x192c6f },
		{ index: 3, num: 30, score: 76, energy: 5, width: 340, top: 34, name: 'img_castle_c', begin: 0x00b2c2, end: 0x174899 },
		{ index: 4, num: 25, score: 88, energy: 6, width: 200, top: 30, name: 'img_castle_d', begin: 0x9f3c70, end: 0x5f1c5a },
		{ index: 5, num: 30, score: 101, energy: 8, width: 310, top: 70, name: 'img_castle_e', begin: 0xca5b49, end: 0x8f3234 },
		{ index: 6, num: 25, score: 101, energy: 8, width: 340, top: 80, name: 'img_castle_f', begin: 0xf3d781, end: 0xdf7252 },
		{ index: 7, num: 30, score: 101, energy: 8, width: 200, top: 48, name: 'img_castle_g', begin: 0xffa7a0, end: 0xf4746c },
		{ index: 8, num: 25, score: 101, energy: 8, width: 340, top: 62, name: 'img_castle_h', begin: 0xf2a1f7, end: 0x6fbaf7 },
		{ index: 9, num: 20, score: 101, energy: 8, width: 340, top: 45, name: 'img_castle_i', begin: 0x4ddc98, end: 0x50c8ef },
		{ index: 10, num: 15, score: 101, energy: 8, width: 330, top: 30, name: 'img_castle_j', begin: 0xd0faff, end: 0xc4d3ea }
	];

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
		this.worldSpeed = 1000000;
		that.randomTheme();
		this.scoreText.text = this.score + '';
		this.adaptation = (this.stage.stageHeight - 1334) / this.factor;
		let ball = userDataMaster.cats[this.currentBall];
		this.ballText.text = ball.name;
		//创建world
		this.world = new p2.World();
		this.world.sleepMode = p2.World.BODY_SLEEPING;//睡眠策略，提高性能
		this.world.gravity = [0, -30];
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
			// this.themeArr[0].num = 3;
		}

		egret.Tween.get(that.startBtn, { loop: true }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000)
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startFun, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	public randomTheme() {
		let that = this;
		let arr = [];
		let sourceArr = this.themeArr;
		for (let i = 0, len = sourceArr.length; i < len; i++) {
			let ran = Math.floor(Math.random() * sourceArr.length);
			arr.push(sourceArr[ran]);
			sourceArr.splice(ran, 1);
		}
		this.themeArr = arr;
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
		this.removeChild(this.ballText);
		if (this.guide) {
			this.guide.process_1.visible = false;
			this.guide.removeChild(this.startBtn)
			this.removeChild(this.guide);
			this.guideProcess = 1;//第一步引导完成
		} else {
			this.removeChild(this.startBtn);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
		}
		this.worldSpeed = 1000;

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
		let margin = that.themeArr[that.currentTheme - 1].top;
		for (var i: number = 0; i < l; i++) {
			var boxBody: p2.Body = this.world.bodies[i];
			var len = boxBody.displays.length;
			for (let j = 0; j < len; j++) {
				var box: egret.DisplayObject = boxBody.displays[j];
				if (box) {
					box.x = boxBody.position[0] * this.factor;
					box.y = stageHeight - boxBody.position[1] * this.factor;//坐标系不一样，所以要转换
					box.rotation = 360 - (boxBody.angle + boxBody.shapes[j].angle) * 180 / Math.PI;//旋转

					if (j == 1) {
						box.y -= (boxBody.displays[0].height / 2 - margin) * boxBody.displays[0].scaleY;
						box.rotation = 180;
					}
				}
			}
		}

		if (that.bee.position[1] < 0) {
			console.log('gameover');
			this.gameOver();
			return;
		}
		if (this.guide && this.guideProcess == 1 && that.flowerArr[0].params.type == "right" && Math.abs(this.bee.position[0] - this.flowerArr[0].body.position[0]) < 1) {
			//第二次引导
			this.addChild(this.guide);
			this.guide.process_2.visible = true;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
			this.worldSpeed = 1000000;
			this.guideProcess = 2;//第二步引导结束
		}
		if (this.guide && this.guideProcess == 2 && that.flowerArr[0].params.type == "left" && Math.abs(this.bee.position[0] - this.flowerArr[0].body.position[0]) < 1) {
			//第三次引导
			this.addChild(this.guide);
			this.guide.process_3.visible = true;
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
			this.worldSpeed = 1000000;
			this.guideProcess = 3;//第三步引导结束
		}
		if (this.guide && this.guideProcess == 3&&that.hitNum==10) {
			//引导结束
			this.addChild(this.guide);
			this.guide.process_7.visible = true;
			this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
				this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
			userDataMaster.createLoginBtn(250, 808, 250, 90);
			this.guide.knowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
				userDataMaster.myGold += 200;
				userDataMaster.myInfo.is_new_user = false;
				let parent = that.parent;
				parent.removeChild(that);
				parent.addChild(new startScene());
			}, that);

		}
		let hitright = that.ceilArr[0].overlaps(that.bee);
		if (hitright) {
			that.bee.velocity = [-25, -8];
			// that.bee.angle = -0.2;
			that.bee.mass = 8000;
		}
		let hitleft = that.ceilArr[1].overlaps(that.bee);
		if (hitleft) {
			that.bee.velocity = [25, -8];
			// that.bee.angle = 0.2;
			that.bee.mass = 8000;
		}
		let hit = that.flowerArr[0].body.overlaps(that.bee);
		let top = (that.bee.position[1] + that.bee.displays[0].height / 2 / that.factor) - (that.flowerArr[0].body.position[1] + that.flowerArr[0].body.displays[0].height / 2 / that.factor);
		if (hit && !that.flowerArr[0].params.haveHit && that.bee.velocity[1] <= 0 && Math.abs(top) <= 2) {
			if (that.flowerArr[0].body.displays[0].x + 30 >= that.bee.displays[0].x && that.flowerArr[0].body.displays[0].x - 30 <= that.bee.displays[0].x) {
				// console.log('center')
				// that.score += 10;
				that.flowerArr[0].body.displays[1].parent && that.flowerGroup.removeChild(that.flowerArr[0].body.displays[1]);
			}
			that.score += that.themeArr[that.currentTheme - 1].score;
			that.energy += that.themeArr[that.currentTheme - 1].energy;
			platform.vibrateShort({ success(res) { } })
			that.bee.mass = 5000;
			this.scoreText.text = this.score + '';
			that.flowerArr[0].params.haveHit = true;
			let r = that.flowerArr.shift();
			r.body.velocity = [0, -10];
			that.removeArr.push(r);
			let sx = 15;
			if (r.params.type == 'left') {
				sx = 20;
				sx += Math.random() * 3;
				// that.bee.angle = -0.2;
			} else if (r.params.type == 'right') {
				sx = -20;
				sx -= Math.random() * 3;
				// that.bee.angle = 0.2;
			}
			that.bee.velocity = [sx, 38];
			that.bee.damping = 0.85;
			if (that.bee.velocity[0] > 0) {
				// that.bee.angle = 0.2;
				that.bee.angularVelocity = 0
			} else if (that.bee.velocity[0] < 0) {
				// that.bee.angle = -0.2;
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
				this.createBg(that.themeArr[that.currentTheme - 1].begin, that.themeArr[that.currentTheme - 1].end)
				let current = that.themeArr[that.currentTheme - 1].name;
				for (let i = 0; i < that.flowerArr.length; i++) {
					that.flowerArr[i].body.shapes[0].width = this.themeArr[this.currentTheme - 1].width / this.factor;
					if (i == 0) {
						that.flowerArr[i].body.displays[0].texture = RES.getRes(current + '1_png')
					} else {
						that.flowerArr[i].body.displays[0].texture = RES.getRes(current + '2_png');
					}
				}
				// that.throughFun();
			}
			let cur = that.themeArr[that.currentTheme - 1].name;
			that.flowerArr[0].body.displays[0].texture = RES.getRes(cur + '1_png')
			egret.Tween.get(that.flowerArr[0].body.displays[1]).to({ height: 200 }, 500);
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
					that.removeArr[x].body.displays[0] && that.removeArr[x].body.displays[0].parent && that.flowerGroup.removeChild(that.removeArr[x].body.displays[0]);
					that.removeArr[x].body.displays[1] && that.removeArr[x].body.displays[1].parent && that.flowerGroup.removeChild(that.removeArr[x].body.displays[1]);
					that.removeArr.shift();
					x > 0 && x--;
				}
			}
		}
		if (that.flowerArr[0].params.type !== "center") {
			let cur = that.themeArr[that.currentTheme - 1].name;
			for (let i = 0; i < 5; i++) {
				if (that.flowerArr[i].body.displays[0].scaleX < 1) {
					that.flowerArr[i].body.displays[0].scaleX += 0.001 * that.moveSpeed;
					that.flowerArr[i].body.displays[0].scaleY += 0.001 * that.moveSpeed;
					that.flowerArr[i].body.displays[1].scaleX += 0.001 * that.moveSpeed;
					that.flowerArr[i].body.displays[1].scaleY += 0.001 * that.moveSpeed;
					that.flowerArr[i].body.velocity[1] = -2 * that.moveSpeed;

				}
			}
		}
	}
	public gameOver() {
		//died
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
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
		var boxShape: p2.Shape = new p2.Box({ width: 0.5, height: 3.2, material: new p2.Material(1) });
		this.bee = new p2.Body({ mass: 5000, position: [7.5, 20 + this.adaptation] });
		// this.bee.gravityScale = 0;
		this.bee.collisionResponse = false;
		this.bee.addShape(boxShape);
		this.world.addBody(this.bee);
		var display = this.createBitmapByName('img_elf_' + this.currentBall + '2_png');
		display.width = 160;
		display.height = 160;
		display.anchorOffsetX = display.width / 2;
		display.anchorOffsetY = display.height / 2;
		this.bee.displays = [display];
		this.addChild(display);
	}
	public createFlower(type = 'left', y = 14) {
		let that = this;
		let width = that.themeArr[that.currentTheme - 1].width / that.factor;
		var boxShape: p2.Shape = new p2.Box({ width, height: 11.1, material: new p2.Material(2) });
		var boxBody: p2.Body = new p2.Body({ mass: 500, gravityScale: 0, type: p2.Body.KINEMATIC });
		var display = that.createBitmapByName(that.themeArr[that.currentTheme - 1].name + '2_png');
		display.anchorOffsetX = display.width / 2;
		display.anchorOffsetY = display.height / 2;
		display.x = display.width / 2;
		display.y = display.height / 2;
		display.scaleX = 0.8;
		display.scaleY = 0.8;
		let ran = Math.random() > 0.5 ? -Math.random() * 1 : Math.random() * 1;
		if (type == 'center') {
			boxBody.position = [7.5, 6 + that.adaptation];
			display.texture = RES.getRes(that.themeArr[that.currentTheme - 1].name + '1_png');
		} else if (type == 'left') {
			boxBody.position = [5 + ran, y + that.adaptation]
		} else {
			boxBody.position = [12 + ran, y + that.adaptation]
		}

		var lightningShape: p2.Shape = new p2.Box({ width: 0.36, height: 4, material: new p2.Material(2) });
		let lightning = that.createBitmapByName('linear_light_png');

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
		this.bee.velocity = [0, -100];
		// this.bee.gravityScale = 1;
		this.bee.angle = 0;
		this.bee.angularVelocity = 0;
		if (this.guide && this.guide.parent) {
			this.guide['process_' + this.guideProcess].visible = false;
			this.guide.parent.removeChild(this.guide);
			this.worldSpeed = 1000;
			if (this.guideProcess < 3) {
				this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
			}
		}
	}
	public throughFun() {
		let that = this;
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
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
				this.guide.knowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
					userDataMaster.myGold += 200;
					userDataMaster.myInfo.is_new_user = false;
					let parent = that.parent;
					parent.removeChild(that);
					parent.addChild(new startScene());
					// that.worldSpeed = 1000;
					// that.addEventListener(egret.TouchEvent.TOUCH_TAP, that.touchFun, that);
				}, that);
			} else {

				let speed = Math.random() > 0.7 ? 800 : 1000;
				this.worldSpeed = speed;
				that.addEventListener(egret.TouchEvent.TOUCH_TAP, that.touchFun, that);
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
		var result: egret.Bitmap = new egret.Bitmap();
		var texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}
}