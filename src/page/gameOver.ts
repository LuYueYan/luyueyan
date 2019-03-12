class gameOver extends eui.Component implements eui.UIComponent {
	public scoreText: eui.Label;
	public homeBtn: eui.Image;
	public leftMore: eui.Group;
	public again: eui.Button;
	public openBall: eui.Button;
	public energyNum: eui.Label;
	public getEnergy: eui.Image;
	public travel_0: eui.Group;
	public travel_img_0: eui.Image;
	public travel_name_0: eui.Label;
	public shareBtn_0: eui.Image;
	public travel_1: eui.Group;
	public travel_img_1: eui.Image;
	public travel_name_1: eui.Label;
	public shareBtn_1: eui.Image;
	public bgImg:eui.Image;


	public dataGroup: eui.DataGroup;
	public sourceArr: eui.ArrayCollection;
	public dataArr = [
		{ id: 1, name: '光之旅', image: 'resource/assets/Aimages/img_bg_imprinting_2.png', appid: '', path: '' },
		{ id: 2, name: '光之旅', image: 'resource/assets/Aimages/img_bg_imprinting_2.png', appid: '', path: '' },
		{ id: 3, name: '光之旅', image: 'resource/assets/Aimages/img_bg_imprinting_2.png', appid: '', path: '' },
		{ id: 4, name: '光之旅', image: 'resource/assets/Aimages/img_bg_imprinting_2.png', appid: '', path: '' },
		{ id: 1, name: '光之旅', image: 'resource/assets/Aimages/img_bg_imprinting_2.png', appid: '', path: '' },
		{ id: 2, name: '光之旅', image: 'resource/assets/Aimages/img_bg_imprinting_2.png', appid: '', path: '' },
		{ id: 3, name: '光之旅', image: 'resource/assets/Aimages/img_bg_imprinting_2.png', appid: '', path: '' },
		{ id: 4, name: '光之旅', image: 'resource/assets/Aimages/img_bg_imprinting_2.png', appid: '', path: '' },

	];
	public score = 0;
	public ballId = 1;//这局用的球类型
	public constructor(score = 0, ballId = 1) {
		super();
		this.score = score;
		this.ballId = ballId;
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
		soundMaster.stopSongMusic();
		this.bgImg.height=this.stage.stageHeight;
		this.scoreText.text = this.score + '';
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
		this.updateScore();
		this.again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.againFun, this);
		this.shareBtn_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
		this.shareBtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
		this.getEnergy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
		this.openBall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ballFun, this);
		this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.homeFun, this);
	}
	public updateScore() {
		let params = {
			score: this.score,
			uid: userDataMaster.getMyInfo.uid
		}
		ServiceMaster.post(
			ServiceMaster.getScore,
			params,
			function (suc) {
				if (parseInt(suc.code) === 1 && suc.data) {
					//分数提交成功
				}
			}
		);
	}
	public homeFun() {
		let parent = this.parent;
		parent.removeChild(this);
		parent.addChild(new startScene())
	}
	public getFun() {

	}
	public shareFun() {
		CallbackMaster.openShare(null, false);
	}
	public againFun() {
		let parent = this.parent;
		parent.removeChild(this);
		parent.addChild(new runningScene());
	}
	public ballFun() {
		this.addChild(new myBalls())
	}

}