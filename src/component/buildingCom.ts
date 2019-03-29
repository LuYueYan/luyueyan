class buildingCom {
	//建筑对象
	public boxBody;
	public type: number = 0;//类型 0--中心 1--左边 2--右边
	public haveHit: boolean = false;//是否碰撞
	public factor: number = 50;
	public adaptation = 0;//适配差距
	public constructor(type, adaptation) {
		this.type = type;
		this.adaptation = adaptation;
	}
	public init(themeItem, y = 14) {
		let that = this;
		let width = themeItem.width / that.factor;
		var boxShape: p2.Shape = new p2.Box({ width, height: 11.1 });
		var boxBody: p2.Body = new p2.Body({ mass: 500, gravityScale: 0, type: p2.Body.KINEMATIC });
		var display = that.createBitmapByName(themeItem.name);
		display.name = themeItem.name;
		display.anchorOffsetX = display.width / 2;
		display.anchorOffsetY = display.height / 2;
		display.x = display.width / 2;
		display.y = display.height / 2;
		display.scaleX = 0.8;
		display.scaleY = 0.8;
		if (that.type == 0) {
			boxBody.position = [7.5, 6 + that.adaptation];
			display.texture = RES.getRes(themeItem.name + '1_png');
		} else if (that.type == 1) {
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
		this.boxBody = boxBody;
	}
	public unpdateBuilding(type, y = 14) {
		let that = this;
		that.type = type;
		that.haveHit = false;
		that.boxBody.displays[0].scaleX = 0.8;
		that.boxBody.displays[0].scaleY = 0.8;
		that.boxBody.displays[0].texture = RES.getRes(that.boxBody.displays[0].name + '2_png');
		if (that.type == 1) {
			let ran = Math.random() > 0.9 ? Math.random() * 2 : -Math.random() * 2;
			that.boxBody.position = [5 + ran, y + that.adaptation]
		} else {
			let ran = Math.random() > 0.9 ? -Math.random() * 2 : Math.random() * 2;
			that.boxBody.position = [10 + ran, y + that.adaptation];
		}
		that.boxBody.displays[1].height = 0;
	}
	public updateTexture(name) {
		this.boxBody.displays[0].texture = RES.getRes(name + '_png');
	}
	public afterHit(world, buildingLoop, removeArr, x) {
		let boxBody = this.boxBody;
		boxBody.displays[0].scaleX += 0.005;
		if (boxBody.position[1] < -4) {
			world.removeBody(boxBody);
			if (boxBody.displays[0] && boxBody.displays[0].parent) {
				boxBody.displays[0].parent.removeChild(boxBody.displays[0]);
			}
			if (boxBody.displays[1] && boxBody.displays[1].parent) {
				boxBody.displays[1].parent.removeChild(boxBody.displays[1]);
			}
			let r = removeArr.shift();
			buildingLoop[r.boxBody.displays[0].name].push(r);
			x > 0 && x--;
		}
	}
	public changeScale(speed, worldSpeed) {
		let boxBody = this.boxBody;
		if (boxBody.displays[0].scaleX < 1) {
			boxBody.displays[0].scaleX += 0.001 * speed / worldSpeed;
			boxBody.displays[0].scaleY += 0.001 * speed / worldSpeed;
			boxBody.velocity[1] = -2;
		}
	}
	public removeBuilding() {

	}
	private createBitmapByName(name: string): egret.Bitmap {
		let that = this;
		var result: egret.Bitmap = new egret.Bitmap();
		var texture: egret.Texture = RES.getRes(name + '2_png');
		result.texture = texture;
		return result;
	}
}
window['buildingCom'] = buildingCom