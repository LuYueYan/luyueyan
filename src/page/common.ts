class common extends eui.Component implements eui.UIComponent {
	public bee: eui.Image;
	public buildingGroup: eui.Group;
	public beeSpeed = {
		speedX: 0,//右为正
		speedY: 0,//下为正
		acceleration: 0,
		outSpeed: 0,
		oldAcceleration: 0,
		dragPosition: 0,
		oldSpeedX: 0.6
	}
	public buildingSpeed = 10;
	public buildingArr = [];
	public currentTimer = egret.getTimer();
	public removeArr = [];
	public constructor() {
		super();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		if (this.bee) {
			this.init()
		} else {
			this.addEventListener(egret.Event.COMPLETE, this.init, this)
		}
	}
	public init() {
		this.createBuilding('center', 800);
		this.createBuilding('left', 750);
		this.createBuilding('right', 700);
		this.createBuilding('left', 650);
		this.createBuilding('right', 600);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moveBee, this);
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
	}
	public createBuilding(type = 'left', y = 800) {
		let building = this.createBitmapByName('img_castle_1_2_png');
		building.anchorOffsetX = building.width / 2;
		building.anchorOffsetY = building.height / 2;
		if (type == 'left') {
			building.x = 100;
		} else if (type == 'right') {
			building.x = 500;
		} else {
			building.x = 375;
			building.texture = RES.getRes('img_castle_1_1_png');
		}
		building.y = y+building.anchorOffsetY;
		this.buildingGroup.addChildAt(building, 0);
		egret.Tween.get(building).to({ y: 800+building.anchorOffsetY }, 5000);
		this.buildingArr.push({ content: building, hit: false, type });
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
		this.bee.x += dt * this.beeSpeed.speedX;
		this.bee.y += this.beeSpeed.speedY * dt + 0.5 * this.beeSpeed.acceleration * dt * dt + this.beeSpeed.outSpeed;
		this.beeSpeed.speedY += dt * this.beeSpeed.acceleration;
	
		this.collisionFun()
		this.currentTimer = egret.getTimer();

		if (this.bee.x + this.bee.width >= this.stage.stageWidth) {
			this.beeSpeed.speedY = -this.beeSpeed.speedY;
			this.beeSpeed.speedX = -this.beeSpeed.speedX;
		}
	}
	public moveBee(e: egret.TouchEvent) {
		if (this.bee.x == 323 && this.bee.y == 200) {
			//开始游戏
			this.beeSpeed.acceleration = 0.005;
		} else {
			//下落
			if (this.buildingArr[0].content.y - (this.bee.y + this.bee.height) > 50) {
				console.log(66)
				this.beeSpeed.outSpeed = 30;
				this.beeSpeed.speedX = 0;
			}
		}
	}
	public collisionFun() {
		if (this.buildingArr.length == 0) {
			return;
		}
	
		let x1=this.buildingArr[0].content.x-this.buildingArr[0].content.anchorOffsetX;
		let x2=this.buildingArr[0].content.x+this.buildingArr[0].content.anchorOffsetX;
		let y=this.buildingArr[0].content.y-this.buildingArr[0].content.anchorOffsetY;
	
		let hit=(this.bee.x + this.bee.width/2)>=x1&&(this.bee.x + this.bee.width/2)<=x2&&(y<=this.bee.y+this.bee.height)&&(y>=this.bee.y+this.bee.height/2);
		if (hit&& !this.buildingArr[0].hit&& this.beeSpeed.speedY>=0) {
			this.buildingArr[0].hit = true;
			this.beeSpeed.speedY = - 2;
			this.beeSpeed.outSpeed = 0;
			let remove = this.buildingArr.shift();
			console.log(777)
			egret.Tween.removeTweens(remove.content);
			egret.Tween.get(remove.content).to({ y: 1500 }, 1000).call(() => {
				this.buildingGroup.removeChild(remove.content);
			})

			// this.removeArr.push(remove);
			let type = this.buildingArr[0].type == 'left' ? 'right' : 'left';
			this.createBuilding(type, 600)
			if (this.buildingArr.length > 0) {
				this.buildingArr[0].content.texture = RES.getRes('img_castle_1_1_png');
				if (this.bee.x > this.buildingArr[0].content.x + this.buildingArr[0].content.width / 2) {
					//向左
					this.beeSpeed.speedX = -this.beeSpeed.oldSpeedX;
				} else {
					this.beeSpeed.speedX = this.beeSpeed.oldSpeedX;
				}
			}
		}
	}
	private createBitmapByName(name: string): egret.Bitmap {
		var result: egret.Bitmap = new egret.Bitmap();
		var texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}
}