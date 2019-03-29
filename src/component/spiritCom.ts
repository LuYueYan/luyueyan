class spiritCom {
	public bee;
	public constructor() {
	}
	public init(currentBall,adaptation,callback:Function=null) {
		let that = this;
		var boxShape: p2.Shape = new p2.Box({ width: 3.2, height: 3.2 });
		this.bee = new p2.Body({ mass: 5000, position: [7.5, 26 + adaptation] });
		this.bee.collisionResponse = false;
		this.bee.addShape(boxShape);
		var display: egret.Bitmap = new egret.Bitmap();
		var texture: egret.Texture = RES.getRes('img_elf_' + currentBall + '2_png');
		display.texture = texture;
		display.width = 160;
		display.height = 160;
		display.anchorOffsetX = display.width / 2;
		display.anchorOffsetY = display.height / 2;
		this.bee.displays = [display];
		callback&&callback(this.bee);
		

	}
}
window['spiritCom']=spiritCom