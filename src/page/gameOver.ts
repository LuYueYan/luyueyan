class gameOver extends eui.Component implements eui.UIComponent {
	public again: eui.Button;
	public openBall: eui.Button;
	public leftMore: eui.Group;
	public energy: eui.Group;
	public energyNum: eui.Label;
	public getEnergy: eui.Image;
	public travel_1: eui.Group;
	public travel_1_img: eui.Image;
	public travel_1_name: eui.Label;
	public shareBtn_1: eui.Image;
	public energy1: eui.Group;
	public travel_2_img: eui.Image;
	public travel_2_name: eui.Label;
	public shareBtn_2: eui.Image;


	public dataGroup: eui.DataGroup;
	public sourceArr: eui.ArrayCollection;
	public dataArr = [
		{ id: 1, name: '光之旅', image: 'resource/assets/Aimages/bee.png',appid:'',path:'' },
		{ id: 2, name: '光之旅', image: 'resource/assets/Aimages/bee.png',appid:'',path:'' },
		{ id: 3, name: '光之旅', image: 'resource/assets/Aimages/bee.png',appid:'',path:'' },
		{ id: 4, name: '光之旅', image: 'resource/assets/Aimages/bee.png',appid:'',path:'' },
		{ id: 1, name: '光之旅', image: 'resource/assets/Aimages/bee.png',appid:'',path:'' },
		{ id: 2, name: '光之旅', image: 'resource/assets/Aimages/bee.png',appid:'',path:'' },
		{ id: 3, name: '光之旅', image: 'resource/assets/Aimages/bee.png',appid:'',path:'' },
		{ id: 4, name: '光之旅', image: 'resource/assets/Aimages/bee.png',appid:'',path:'' },

	]
	public constructor(score = 0) {
		super();
	
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		if (this.again) {
			this.init()
		} else {
			this.addEventListener(egret.Event.COMPLETE, this.init, this)
		}
	}
	public init() {
		this.sourceArr = new eui.ArrayCollection(this.dataArr);
		this.dataGroup = new eui.DataGroup();
		this.dataGroup.dataProvider = this.sourceArr;
		this.dataGroup.useVirtualLayout = true;
		let layout = new eui.TileLayout();
		layout.paddingTop = 15;
		layout.verticalGap = 20;
		layout.horizontalGap = 480;
		this.dataGroup.layout = layout;
		this.dataGroup.itemRenderer = travelItem;
		this.leftMore.addChild(this.dataGroup);

		this.again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.againFun, this);
		this.shareBtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
		this.shareBtn_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
		this.getEnergy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
	}
	public getFun(){

	}
	public shareFun(){
		CallbackMaster.openShare(null,false);
	}
	public againFun() {
		let parent = this.parent;
		parent.removeChild(this);
		parent.addChild(new runningScene())
	}

}