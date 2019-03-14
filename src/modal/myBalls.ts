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
	public addGold: eui.Group;
	public goldText: eui.Label;
	public nameImg: eui.Image;
	public natureText: eui.Label;
	public musicText: eui.Label;
	public travelImg_0: eui.Image;
	public travelImg_1: eui.Image;
	public travelImg_2: eui.Image;
	public popularGroup: eui.Group;
	public fruitText: eui.Label;
	public processBar: eui.Rect;
	public progressGroup: eui.Group;
	public progressText: eui.Label;
	public raiseBtn: eui.Image;
	public fireGroup: eui.Group;
	public fireText: eui.Label;
	public fireBtn: eui.Image;


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
	public fireList = [];//火火球邀请情况

	public guideFeed = false;//是否从结束页进来的
	public constructor(guideFeed = false) {
		super();
		this.guideFeed = guideFeed;
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.init()
	}
	public init() {
		let cats = userDataMaster.cats;
		for (let i = 0, len = this.positionArr.length; i < len; i++) {
			this['img_' + i].texture = RES.getRes('img_elf_' + i + '2_png');
			if (cats[i].state) {
				//已获得
			} else {
				if (this.guideFeed&&this.currentBall == 0) {
					this.currentBall = i;
				}
				this.filterFun(this['img_' + i]);
			}
		}
		if (this.currentBall != 0) {
			let dx = this.currentBall;
			for (let i = 0, len = this.positionArr.length; i < len; i++) {
				let current = i - dx >= 0 ? i - dx : i - dx + 9;
				this['item_' + i].name = 'current_' + current;
				this.bodyGroup.setChildIndex(this['item_' + i], this.getIndex(current));
				this['item_' + i].x = this.positionArr[current].x;
				this['item_' + i].y = this.positionArr[current].y;
				this['item_' + i].scaleX = this.positionArr[current].scaleX;
				this['item_' + i].scaleY = this.positionArr[current].scaleY;
			}
		}
		this.changeInfo(this.currentBall);
		var blurFliter = new egret.BlurFilter(4, 4);
		this.processBar.filters = [blurFliter];
		this.goldText.text = userDataMaster.myGold + '';
		this.getFireList();
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginFun, this);
		this.addEventListener(egret.TouchEvent.TOUCH_END, this.endFun, this);
		this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.homeFun, this);
		this.raiseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.raiseFun, this);
		this.fireBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fireFun, this);
		this.addGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addGoldFun, this);
		userDataMaster.myCollection.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.updateData, this)
	}
	public updateData(evt: eui.CollectionEvent): void {
		this.goldText.text = '' + userDataMaster.gold;
	}
	public addGoldFun() {
		AdMaster.useVideo(() => {
			suc();
		}, () => {
			console.log('share')
			CallbackMaster.openShare(() => {
				suc();
			})
		});
		function suc() {
			userDataMaster.myGold += 20;
		}
	}
	public getFireList() {
		let that = this;
		let params = {
			uid: userDataMaster.getMyInfo.uid || 0
		}
		ServiceMaster.post(ServiceMaster.getAssistanceList, params, (res) => {
			if (res.code == 1 && res.data) {
				that.fireList = res.data.list;
			}
		})
	}
	public filterFun(obj, type = 0) {
		// type ==0 添加滤镜，type==1去除滤镜
		if (type == 0) {
			var colorMatrix = [
				0.3, 0.6, 0, 0, -300,
				0.3, 0.6, 0, 0, -300,
				0.3, 0.6, 0, 0, -300,
				0, 0, 0, 1, 0
			];
			var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
			obj.filters = [colorFlilter];
		} else {
			obj.filters = [];
		}

	}
	public fireFun() {
		let that = this;
		let i = 4;
		if (userDataMaster.cats[i].state && userDataMaster.runCat == i) {
			//旅行中
		} else if (!userDataMaster.cats[i].state && that.fireList.length >= 6) {
			//可解锁
			let cat = userDataMaster.cats[i];
			cat.state = true;
			userDataMaster.setCat(i, cat);
			that.filterFun(that['img_' + i], 1);
			that.fireBtn.texture = RES.getRes('btn_receive_10_png');
			that.addChild(new getSuccess(4, '火火球'))
		} else if (userDataMaster.cats[i].state && that.fireList.length >= 6) {
			//带他出发
			that.fireBtn.texture = RES.getRes('btn_receive_09_png');
			userDataMaster.myRunCat = i;
		} else {
			CallbackMaster.openShare(null, false);
		}
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
		// if (t < 150) {
		// 	num = 4;
		// } else if (t < 200) {
		// 	num = 3;
		// } else if (t < 300) {
		// 	num = 2;
		// } else {
		// 	num = 1;
		// }
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
		let that = this;
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
			if (current == 0) {
				that.changeInfo(i);
			}
			this['item_' + i].name = 'current_' + current;
			for (let n = 0; n < num; n++) {
				let index = i < 5 ? i : 9 - i;
				this.bodyGroup.setChildIndex(this['item_' + i], this.getIndex(current));
				egret.Tween.get(this['item_' + i])
					.wait(500 / num * n)
					.to({
						x: this.positionArr[current].x,
						y: this.positionArr[current].y,
						scaleX: this.positionArr[current].scaleX,
						scaleY: this.positionArr[current].scaleY
					}, 500 / num)
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
	public changeInfo(i, feed = false) {
		let that = this;
		let cat = userDataMaster.cats[i];
		if (!feed) {
			that.currentBall = i;
			that.nameImg.texture = RES.getRes('img_name_0' + (i + 1) + '_png');

			that.natureText.text = "球球属性：" + cat.des;
			that.musicText.text = "音乐主题：" + cat.music;
			let travel = cat.belong;
			let travels = userDataMaster.travels;
			for (let n = 0; n < 3; n++) {
				let name = 'img_imprinting_a' + (travels[travel[n]].id + 1) + '_png';
				that["travelImg_" + n].texture = RES.getRes(name);
			}
		}
		if (i == 4) {
			//火火球
			that.fireGroup.visible = true;
			that.popularGroup.visible = false;
			that.fireText.text = '成功邀请6位好友即可解锁火火球哦（' + that.fireList.length + '/6）';
			if (userDataMaster.cats[i].state && userDataMaster.runCat == i) {
				//旅行中
				that.fireBtn.texture = RES.getRes('btn_receive_09_png');
			} else if (!userDataMaster.cats[i].state && that.fireList.length >= 6) {
				//可解锁
				that.fireBtn.texture = RES.getRes('btn_unlocking_2_png');
			} else if (userDataMaster.cats[i].state && that.fireList.length >= 6) {
				//已解锁
				that.fireBtn.texture = RES.getRes('btn_receive_10_png');
			}
			return;
		}

		that.fireGroup.visible = false;
		that.popularGroup.visible = true;
		that.fruitText.text = "能量果喂养中（" + cat.process + " / " + cat.target + "）";
		let pro = cat.process / cat.target;
		that.processBar.width = 650 * pro;
		that.progressText.text = parseInt(pro * 100 + '') + "%";
		that.progressGroup.x = pro * 650;

		if (pro < 1) {
			that.raiseBtn.texture = RES.getRes('btn_receive_11_png');
		} else if (userDataMaster.runCat == i) {
			//正在出行
			that.raiseBtn.texture = RES.getRes('btn_receive_09_png');
		} else {
			//带它出发
			that.raiseBtn.texture = RES.getRes('btn_receive_10_png');
		}
	}
	public raiseFun() {
		let cat = userDataMaster.cats[this.currentBall];
		let pro = cat.process / cat.target;
		if (!cat.state && cat.process < cat.target) {
			//喂养
			if (userDataMaster.myGold >= 100) {
				userDataMaster.myGold -= 100;
				cat.process += 100;
				if (cat.process == cat.target) {
					//
					cat.state = true;
					this.filterFun(this['img_' + this.currentBall], 1);
					this.addChild(new getSuccess(this.currentBall, cat.name));
				}
				userDataMaster.setCat(this.currentBall, cat);
				this.changeInfo(this.currentBall, true);
			}
		} else if (cat.state && this.currentBall != userDataMaster.runCat) {
			//带他出发
			userDataMaster.myRunCat = this.currentBall;
			this.raiseBtn.texture = RES.getRes('btn_receive_09_png');
		}
	}

}