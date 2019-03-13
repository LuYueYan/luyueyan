class gameOver extends eui.Component implements eui.UIComponent {
	public bgImg: eui.Image;
	public scoreText: eui.Label;
	public homeBtn: eui.Image;
	public again: eui.Button;
	public openBall: eui.Button;
	public energyNum: eui.Label;
	public getEnergy: eui.Image;
	public travel_0: eui.Group;
	public travel_img_0: eui.Image;
	public travel_name_0: eui.Label;
	public shareBtn_0: eui.Image;
	public travel_new_0: eui.Image;
	public travel_1: eui.Group;
	public travel_img_1: eui.Image;
	public travel_name_1: eui.Label;
	public shareBtn_1: eui.Image;
	public travel_new_1: eui.Image;


	public score = 0;
	public ballId = 0;//这局用的球类型
	public energy = 0;//本局获得的能量果数量
	public constructor(score = 0, ballId = 0, energy = 0) {
		super();
		this.score = score;
		this.ballId = ballId;
		this.energy = energy;
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
		this.bgImg.height = this.stage.stageHeight;
		this.scoreText.text = this.score + '';
		userDataMaster.myGold += this.energy;
		this.energyNum.text = 'x ' + this.energy;
		let travel = userDataMaster.MyCats[this.ballId].belong;
		let ran = Math.floor(Math.random() * travel.length);
		let newArr=[];
		for(let i=0;i<travel.length;i++){
			if(i!=ran){
              newArr.push(travel[i]);
			}
		}
		let item_0 = userDataMaster.travels[newArr[0]];
		let item_1 = userDataMaster.travels[newArr[1]];
		this.travel_img_0.texture = RES.getRes('img_imprinting_a'+(item_0.id+1)+'_png');
		this.travel_name_0.text = item_0.name;
		this.travel_img_1.texture = RES.getRes('img_imprinting_a'+(item_1.id+1)+'_png');
		this.travel_name_1.text = item_1.name;
		if (item_0.state == 0) {
			//初次获得
			item_0.state = 1;
			this.travel_new_0.visible=true;
			userDataMaster.setTravel(newArr[0], item_0);
			userDataMaster.travelList.push(newArr[0]);
		}
		if (item_1.state == 0) {
			//初次获得
			item_1.state = 1;
			this.travel_new_1.visible=true;
			userDataMaster.travelList.push(newArr[1]);
			userDataMaster.setTravel(newArr[1], item_1);
		}


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
		let that = this;
		AdMaster.useVideo(() => {
			suc();
		}, () => {
			CallbackMaster.openShare(() => {
				suc();
			})
		});
		function suc() {
			userDataMaster.myGold += that.energy;
			that.getEnergy.texture=RES.getRes('btn_receive_04_png');
			that.getEnergy.removeEventListener(egret.TouchEvent.TOUCH_TAP, that.getFun, that);
			that.addChild(new getSuccess(-1, 'x ' + that.energy));
			
		}

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