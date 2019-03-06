class runningScene extends eui.Component implements eui.UIComponent {
	public bg_rect: eui.Rect;
	public scoreText: eui.Label;
	public startBtn: eui.Button;

	public world: p2.World;
	public factor: number = 50;
	public bee: p2.Body;
	public timer: egret.Timer;
	public currentTimer = egret.getTimer();
	public flowerArr = [];
	public ceilArr = [];
	public removeArr = [];
	public flowerGroup: eui.Group;
	public score = 0;//分数
	public currentTheme = 1;
	public moveSpeed = 1;
	public hitNum = 0;
	public themeArr = [
		{ index: 1, num: 15, width: 340,top:60, name: 'img_castle_a', begin: 0x7a3fc3, end: 0x30368d },
		{ index: 2, num: 15, width: 340,top:45, name: 'img_castle_b', begin: 0x4a3fac, end: 0x192c6f },
		{ index: 3, num: 15, width: 340,top:34, name: 'img_castle_c', begin: 0x00b2c2, end: 0x174899 },
		{ index: 4, num: 15, width: 200,top:30, name: 'img_castle_d', begin: 0x9f3c70, end: 0x5f1c5a },
		{ index: 5, num: 15, width: 310,top:70, name: 'img_castle_e', begin: 0xca5b49, end: 0x8f3234 },
		{ index: 6, num: 15, width: 340,top:80, name: 'img_castle_f', begin: 0xf3d781, end: 0xdf7252 },
		{ index: 7, num: 15, width: 200,top:48, name: 'img_castle_g', begin: 0xffa7a0, end: 0xf4746c },
		{ index: 8, num: 15, width: 340,top:62, name: 'img_castle_h', begin: 0xf2a1f7, end: 0x6fbaf7 },
		{ index: 9, num: 15, width: 340,top:45, name: 'img_castle_i', begin: 0x4ddc98, end: 0x50c8ef },
		{ index: 10, num: 15, width: 330,top:30, name: 'img_castle_j', begin: 0xd0faff, end: 0xc4d3ea }
	];

	//throughModal
	public through: throughModal;
	public list = [];
	public chooseList = [];
	public terval = null;

	public adaptation = 0;//适配长度
	public bgLinear;//渐变背景
	public constructor(theme = 1, score = 0, hitNum = 0) {
		super();
		this.currentTheme = theme;
		this.score = score;
		this.hitNum = hitNum;
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
		this.adaptation = (this.stage.stageHeight - 1334) / this.factor;
		this.createBg(0x7a3fc3, 0x30368d);
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
		egret.Tween.get(that.startBtn, { loop: true }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000)
		this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startFun, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	public createBg(begin: number, end: number) {
		if (!this.bgLinear) {
			this.bgLinear = new egret.Sprite();
			this.addChildAt(this.bgLinear, 0);
		}
		this.bgLinear.graphics.clear();
		let matix: egret.Matrix = this.bgLinear.matrix;
		matix.createGradientBox(750 / 2, this.stage.stageHeight / 2, Math.PI / 2, 750 / 4, this.stage.stageHeight / 4);
		this.bgLinear.graphics.beginGradientFill(egret.GradientType.LINEAR, [begin, end], [1, 1], [0, 255], matix);
		this.bgLinear.graphics.drawRect(0, 0, 750, this.stage.stageHeight);
		this.bgLinear.graphics.endFill();

	}
	public startFun() {
		this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startFun, this)
		this.removeChild(this.startBtn);
		this.bee.gravityScale = 1;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
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
		this.world.step(dt / 1000);//使物理系统向前经过一定时间，也就是使世界运行
		this.currentTimer = egret.getTimer();
		var stageHeight: number = egret.MainContext.instance.stage.stageHeight;//获取舞台高度？？？？
		var l = this.world.bodies.length;//所有body的长度
		let margin=that.themeArr[that.currentTheme-1].top;
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
						box.y -= (boxBody.displays[0].height / 2-margin)*boxBody.displays[0].scaleY;
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
		let hit = that.flowerArr[0].body.overlaps(that.bee);
		let top = (that.bee.position[1] + that.bee.displays[0].height / 2 / that.factor) - (that.flowerArr[0].body.position[1] + that.flowerArr[0].body.displays[0].height / 2 / that.factor);
		if (hit && !that.flowerArr[0].params.haveHit && that.bee.velocity[1] <= 0 && top >= 0 && top <= 2) {
			//    if(that.flowerArr[0].body.position[1]>6){
			// 	   that.moveSpeed=2;
			//    }else{
			// 	   that.moveSpeed=1;
			//    }
			if (that.flowerArr[0].body.displays[0].x + 30 >= that.bee.displays[0].x && that.flowerArr[0].body.displays[0].x - 30 <= that.bee.displays[0].x) {
				// console.log('center')
				that.flowerArr[0].body.displays[1].parent && that.flowerGroup.removeChild(that.flowerArr[0].body.displays[1]);
			}

			that.bee.mass = 5000;
			this.score += 10;
			this.scoreText.text = this.score + '';
			that.flowerArr[0].params.haveHit = true;
			let r = that.flowerArr.shift();
			r.body.velocity = [0, -10];
			that.removeArr.push(r);
			let sx = 10;
			if (r.params.type == 'left') {
				sx = 15;
				sx += Math.random() * 3;
				that.bee.angle = -0.2;
			} else if (r.params.type == 'right') {
				sx = -15;
				sx -= Math.random() * 3;
				that.bee.angle = 0.2;
			}
			that.bee.velocity = [sx, 30 + Math.random() * 2];
			that.bee.damping = 0.6;
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
				that.hitNum = 0;
				that.currentTheme < that.themeArr.length ? that.currentTheme++ : that.currentTheme = 1;
				this.createBg(that.themeArr[that.currentTheme - 1].begin, that.themeArr[that.currentTheme - 1].end)
				// that.throughFun()
               let current = that.themeArr[that.currentTheme - 1].name;
				for (let i = 0; i < that.flowerArr.length; i++) {
					that.flowerArr[i].body.shapes[0].width = this.themeArr[this.currentTheme - 1].width / this.factor;
					if (i == 0) {
						that.flowerArr[i].body.displays[0].texture = RES.getRes(current + '1_png')
					} else {
						that.flowerArr[i].body.displays[0].texture = RES.getRes(current + '2_png');
					}
				}
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
			if (that.removeArr[x] && that.removeArr[x].body) {
				that.removeArr[x].body.displays[0].scaleX += 0.01;
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
					// if (i == 0) {
					// 	that.flowerArr[i].body.displays[0].texture = RES.getRes(cur + '1_png')
					// }
				}
			}
		}
	}
	public gameOver() {
		//died
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
		if (1) {
			//可复活
			let born = new reborn(this.score);
			this.addChild(born);
			born.rebornBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.judgeReborn, this)
		} else {
			let parent = this.parent;
			parent.addChild(new gameOver(this.score));
			parent.removeChild(this);
		}
	}
	public judgeReborn() {
		//video or share
		if (1) {
			let parent = this.parent;
			let theme = this.currentTheme;
			let score = this.score;
			let hitNum = this.hitNum;
			parent.removeChild(this);
			parent.addChild(new runningScene(theme, score, hitNum));
		}
	}
	public createBee() {
		var boxShape: p2.Shape = new p2.Box({ width: 0.5, height: 2.36, material: new p2.Material(1) });
		this.bee = new p2.Body({ mass: 5000, position: [7.5, 20 + this.adaptation] });
		this.bee.gravityScale = 0;
		this.bee.collisionResponse = false;
		this.bee.addShape(boxShape);
		this.world.addBody(this.bee);
		var display = this.createBitmapByName("img_spirit_01_png");
		display.width = 144;
		display.height = (<p2.Box>boxShape).height * this.factor;
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
		this.bee.velocity = [0, -50];
		this.bee.gravityScale = 1;
		this.bee.angle = 0;
		this.bee.angularVelocity = 0
	}
	public throughFun() {
		let that = this;
		this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
		that.through = new throughModal()
		this.addChild(that.through);
		for (let i = 0; i < 3; i++) {
			let ran = Math.random() > 0.5 ? 2 : 1;
			that.list.push(ran);

			that.through['item_' + i].texture = RES.getRes('img_spirit_0' + ran + '_png');
		}
		that.terval = setInterval(() => {
			if (that.through.processMask.width > 0) {
				that.through.processMask.width -= 20;
				that.through.process.mask = that.through.processMask;
			} else {
				clearInterval(that.terval);
				that.throughEndFun(false)
			}
		}, 200)
		that.through.tap_1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { that.chooseFun(1) }, this);
		that.through.tap_2.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { that.chooseFun(2) }, this);

	}
	public throughEndFun(type) {
		let that = this;
		that.currentTheme < that.themeArr.length ? that.currentTheme++ : that.currentTheme = 1;
		if (type) {
			let parent = this.parent;
			let theme = this.currentTheme;
			let score = this.score;
			let hitNum = this.hitNum;
			parent.removeChild(this);
			parent.addChild(new runningScene(theme, score, hitNum));
		} else {
			that.removeChild(that.through);
			that.gameOver();
		}
	}
	public chooseFun(type) {
		let len = this.chooseList.length;
		if (this.list[len] == type) {
			this.chooseList.push(type);
			if (this.chooseList.length == 3) {
				//通过
				clearInterval(this.terval);
				this.throughEndFun(true);
			}
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