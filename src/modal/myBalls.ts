class myBalls extends eui.Component implements eui.UIComponent {
	public bgImg: eui.Image;
	public bodyGroup: eui.Group;
	public item_5: eui.Group;
	public img_5: eui.Image;
	public item_4: eui.Group;
	public img_4: eui.Image;
	public item_3: eui.Group;
	public img_3: eui.Image;
	public item_6: eui.Group;
	public img_6: eui.Image;
	public item_2: eui.Group;
	public img_2: eui.Image;
	public item_7: eui.Group;
	public img_7: eui.Image;
	public item_1: eui.Group;
	public img_1: eui.Image;
	public item_8: eui.Group;
	public img_8: eui.Image;
	public item_0: eui.Group;
	public img_0: eui.Image;
	public homeBtn: eui.Image;
	public nameImg: eui.Image;
	public natureText: eui.Label;
	public musicText: eui.Label;
	public fruitText: eui.Label;
	public progressGroup: eui.Group;
	public progressText: eui.Label;
	public raiseBtn: eui.Image;

	public positionArr = [
		{ index: 0, x: 375, y: 303, scaleX: 1, scaleY: 1 },
		{ index: 1, x: 142, y: 288, scaleX: 0.6, scaleY: 0.6 },
		{ index: 2, x: 90, y: 235, scaleX: 0.5, scaleY: 0.5 },
		{ index: 3, x: 192, y: 198, scaleX: 0.4, scaleY: 0.4 },
		{ index: 4, x: 305, y: 180, scaleX: 0.3, scaleY: 0.3 },
		{ index: 5, x: 448, y: 180, scaleX: 0.3, scaleY: 0.3 },
		{ index: 6, x: 557, y: 198, scaleX: 0.4, scaleY: 0.4 },
		{ index: 7, x: 670, y: 235, scaleX: 0.5, scaleY: 0.5 },
		{ index: 8, x: 612, y: 288, scaleX: 0.6, scaleY: 0.6 }
	];
	public canMove = true;
	public position = { x: 0, y: 0, time: 0 };
	public currentBall = 0;//当前的球是哪个
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init()
	}
	public init() {
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginFun, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.endFun, this);
		this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.homeFun, this)
	}
	public homeFun() {
		let parent = this.parent;
		parent.removeChild(this);
	}
	public beginFun(e: egret.TouchEvent) {
		this.position = { x: e.stageX, y: e.stageY, time: egret.getTimer() };
	}
	public endFun(e: egret.TouchEvent) {
		let t = egret.getTimer() - this.position.time;

		let num = 1;
		if (t < 150) {
			num = 4;
		} else if (t < 200) {
			num = 3;
		} else if (t < 300) {
			num = 2;
		} else {
			num = 1;
		}
		if (this.position.x - e.stageX > 50) {
			this.moveFun('right', num)
		} else if (e.stageX - this.position.x > 50) {
			this.moveFun('left', num)
		}
		this.position.x = 0;
		this.position.time = 0;
	}

	public moveFun(direction = 'left', num = 1) {
		if (!this.canMove) {
			return;
		}
		let that=this;
		this.canMove = false;
		for (let i = 0, len = this.positionArr.length; i < len; i++) {
			let current = 0;

			if (this['item_' + i].name) {
				let old = this['item_' + i].name.slice(8);
				if (direction == 'left') {
					current = old > 0 ? parseInt(old) - 1 : 8;
				} else {
					current = old < 8 ? parseInt(old) + 1 : 0;
				}
			} else {
				if (direction == 'left') {
					current = i > 0 ? i - 1 : 8;
				} else {
					current = i < 8 ? i + 1 : 0;
				}
			}

			this['item_' + i].name = 'current_' + current;
			for (let n = 0; n < num; n++) {
				let index = i < 5 ? i : 9 - i;
				this.bodyGroup.setChildIndex(this['item_' + i], this.getIndex(current));
				egret.Tween.get(this['item_' + i])
					.wait(1000 / num * n)
					.to({
						x: this.positionArr[current].x,
						y: this.positionArr[current].y,
						scaleX: this.positionArr[current].scaleX,
						scaleY: this.positionArr[current].scaleY
					}, 1000 / num)
					.call(() => {
						if (i == 8 && n == num - 1) {
							this.canMove = true;
						}
						
					})
			}
		}
	}
	public getIndex(i) {
		let index = 0;
		switch (i) {
			case 0: index = 8; break;
			case 1: index = 7; break;
			case 2: index = 5; break;
			case 3: index = 3; break;
			case 4: index = 1; break;
			case 5: index = 0; break;
			case 6: index = 2; break;
			case 7: index = 4; break;
			case 8: index = 6; break;
			default: break;
		}
		return index;
	}
	public set factor(obj) {
		//二次方贝塞尔公式 (1 - t)^2 *P0 + 2 *t* (1 - t)* P1 + t^2* P2
		if (obj && obj.value && obj.target) {


		}
	}
}