class travelScene extends eui.Component implements eui.UIComponent {
	public scroller: eui.Scroller;
	public content: eui.Group;
	public closeBtn: eui.Image;


	public dataArr = [
		{ index: 0, x: 80, y: 274, state: 0 },
		{ index: 1, x: 220, y: 224, state: 0 },
		{ index: 2, x: 360, y: 244, state: 0 },
		{ index: 3, x: 500, y: 274, state: 0 },
		{ index: 4, x: 520, y: 404, state: 0 },
		{ index: 5, x: 360, y: 424, state: 0 },
		{ index: 6, x: 210, y: 444, state: 0 },
		{ index: 7, x: 80, y: 494, state: 0 },
		{ index: 8, x: 80, y: 624, state: 0 },
		{ index: 9, x: 220, y: 644, state: 0 },
		{ index: 10, x: 360, y: 666, state: 0 },
		{ index: 11, x: 500, y: 709, state: 0 },
		{ index: 12, x: 520, y: 839, state: 0 },
		{ index: 13, x: 358, y: 864, state: 0 },
		{ index: 14, x: 208, y: 882, state: 0 },
		{ index: 15, x: 80, y: 921, state: 0 },
		{ index: 16, x: 80, y: 1051, state: 0 },
		{ index: 17, x: 218, y: 1069, state: 0 },
		{ index: 18, x: 360, y: 1093, state: 0 },
		{ index: 19, x: 500, y: 1136, state: 0 },
		{ index: 20, x: 520, y: 1266, state: 0 },
		{ index: 21, x: 360, y: 1293, state: 0 },
		{ index: 22, x: 210, y: 1311, state: 0 },
		{ index: 23, x: 80, y: 1368, state: 0 },
		{ index: 24, x: 80, y: 1488, state: 0 },
		{ index: 25, x: 220, y: 1508, state: 0 },
		{ index: 26, x: 360, y: 1530, state: 0 }
	];
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
		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
		this.scroller.height=this.stage.stageHeight;
		this.createFun();
	}
	public createFun() {
		let that = this;
		let data = that.dataArr;
		for (let i = 0; i < data.length; i++) {
			let name=data[i].state==1?'img_bg_imprinting_1_png':'img_bg_imprinting_2_png';
           let img=that.createBitmapByName(name,data[i].x,data[i].y);
		   this.content.addChild(img);
		}
	}
	public closeFun() {
		let parent = this.parent;
		parent.removeChild(this);
	}
	public createBitmapByName(name: string,x:number=0,y:number=0): egret.Bitmap {
		let result = new egret.Bitmap();
		let texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		result.x=x;
		result.y=y;
		return result;
	}

}