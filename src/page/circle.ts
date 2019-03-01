class circle extends eui.Component implements eui.UIComponent {
	public img_6: eui.Image;
	public img_5: eui.Image;
	public img_7: eui.Image;
	public img_4: eui.Image;
	public img_8: eui.Image;
	public img_3: eui.Image;
	public img_9: eui.Image;
	public img_2: eui.Image;
	public img_10: eui.Image;
	public img_1: eui.Image;
	public img_11: eui.Image;
	public img_0: eui.Image;

	public positionArr = [
		{ index: 0, x: 300, y: 471, scaleX: 1, scaleY: 1 },
		{ index: 1, x: 138, y: 471, scaleX: 0.8, scaleY: 0.8 },
		{ index: 2, x: 44, y: 431, scaleX: 0.7, scaleY: 0.7 },
		{ index: 3, x: 28, y: 363, scaleX: 0.6, scaleY: 0.6 },
		{ index: 4, x: 94, y: 313, scaleX: 0.5, scaleY: 0.5 },
		{ index: 5, x: 190, y: 295, scaleX: 0.4, scaleY: 0.4 },
		{ index: 6, x: 306, y: 287, scaleX: 0.35, scaleY: 0.35 },
		{ index: 7, x: 406, y: 295, scaleX: 0.4, scaleY: 0.4 },
		{ index: 8, x: 506, y: 313, scaleX: 0.5, scaleY: 0.5 },
		{ index: 9, x: 576, y: 363, scaleX: 0.6, scaleY: 0.6 },
		{ index: 10, x: 562, y: 431, scaleX: 0.7, scaleY: 0.7 },
		{ index: 11, x: 464, y: 471, scaleX: 0.8, scaleY: 0.8 }

	];
	public canMove = true;
	public position = { x: 0, y: 0, time: 0 }
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
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.endFun, this)

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
		this.canMove = false;
		for (let i = 0, len = this.positionArr.length; i < len; i++) {
			let current = 0;
			if (this['img_' + i].name) {
				let old = this['img_' + i].name.slice(8);
				if (direction == 'left') {
					current = old > 0 ? parseInt(old) - 1 : 11;
				} else {
					current = old < 11 ? parseInt(old) + 1 : 0;
				}
			} else {
				if (direction == 'left') {
					current = i > 0 ? i - 1 : 11;
				} else {
					current = i < 11 ? i + 1 : 0;
				}
			}
			this['img_' + i].name = 'current_' + current;
			for (let n = 0; n < num; n++) {
				egret.Tween.get(this['img_' + i])
					.wait(1000 / num * n)
					.to({
						x: this.positionArr[current].x,
						y: this.positionArr[current].y,
						scaleX: this.positionArr[current].scaleX,
						scaleY: this.positionArr[current].scaleY
					}, 1000 / num)
					.call(() => {
						if (i == 11 && n == num - 1) {
							this.canMove = true;
						}
					})
			}
		}
	}
}