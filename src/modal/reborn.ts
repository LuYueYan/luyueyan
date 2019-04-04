class reborn extends eui.Component implements eui.UIComponent {
	public bgImg: eui.Image;
	public titleText: eui.Label;
	public tips: eui.Group;
	public degreeText: eui.Label;
	public infoGroup: eui.Group;
	public proBar: eui.Rect;
	public centerImg: eui.Image;
	public rightImg: eui.Image;
	public degree_0: eui.Label;
	public degree_1: eui.Label;
	public degree_2: eui.Label;
	public proGroup: eui.Group;
	public percentText: eui.Label;
	public timing: eui.Image;
	public rebornBtn: eui.Image;
	public ignoreBtn: eui.Label;


	public score = 0;
	public energy = 0;//本局能量果
	public ballId = 0;//本局使用的球
	public terval = null;
	public current_time = 5;
	public energyAdd = 0;//能量加成百分比
	public pro = 0;//进度百分比0-1
	public constructor(score = 0, ballId = 0, energy = 0, energyAdd = 0, pro) {
		super();
		this.score = score;
		this.energy = energy;
		this.ballId = ballId;
		this.energyAdd = energyAdd;
		this.pro = pro;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init()
	}
	public init() {
		let that = this;
		this.bgImg.height = this.stage.stageHeight;
		this.titleText.text = userDataMaster.degree + '阶试炼';
		this.degreeText.text = (userDataMaster.degree + 1) + '阶';

		let degree = userDataMaster.degree + 1;
		let w = 280 * that.pro;
		if (degree >= 10) {
			that.rightImg.visible = false;
			that.degree_2.visible = false;
		}
		if (degree == 11) {
			that.removeChild(that.infoGroup);
			that.removeChild(that.tips);
			let text=new eui.Label(this.score+'分');
			text.size=80;
			text.width=750;
			text.bold=true;
			text.textAlign='center';
			text.y=250;
			this.addChild(text);
		}
		that.degree_0.text = (degree - 1) + '阶';
		that.degree_1.text = degree + '阶';
		that.degree_2.text = (degree + 1) + '阶';

		that.proGroup.x = w;
		that.proBar.width = w;
		that.percentText.text = Math.floor(that.pro * 100) + '%';
		this.terval = setInterval(() => {
			that.current_time > 0 && that.current_time--;
			that.timing.texture = RES.getRes('img_time_0' + that.current_time + '_png');
			if (that.current_time <= 0) {
				clearInterval(that.terval);
			}
		}, 1000)
		setTimeout(function () {
			that.ignoreBtn.visible = true;
		}, 5000);
		that.ignoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ignoreFun, this);
	}
	public ignoreFun() {
		let parent = this.parent.parent;
		parent.removeChild(this.parent);
		// let energy=parseInt(this.energy*(1+this.energyAdd)+'');
		parent.addChild(new gameOver(this.score, this.ballId, this.energy, this.energyAdd, this.pro));
	}

}