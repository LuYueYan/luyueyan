class travelScene extends eui.Component implements eui.UIComponent {
	public scroller: eui.Scroller;
	public content: eui.Group;
	public closeBtn: eui.Image;

	public dataArr = [
		{ index: 0, x: 102, y: 399, state: 0, type: 0 },
		{ index: 1, x: 244, y: 371, state: 0, type: 0 },
		{ index: 2, x: 384, y: 371, state: 0, type: 0 },
		{ index: 3, x: 524, y: 401, state: 0, type: 0 },
		{ index: -1, x: 540, y: 562, state: 0, type: 1 },

		{ index: 4, x: 384, y: 551, state: 0, type: 0 },
		{ index: 5, x: 234, y: 571, state: 0, type: 0 },
		{ index: 6, x: 104, y: 621, state: 0, type: 0 },
		{ index: 7, x: 104, y: 771, state: 0, type: 0 },
		{ index: -1, x: 238, y: 798, state: 0, type: 1 },

		{ index: 8, x: 384, y: 793, state: 0, type: 0 },
		{ index: 9, x: 524, y: 836, state: 0, type: 0 },
		{ index: 10, x: 544, y: 986, state: 0, type: 0 },
		{ index: 11, x: 384, y: 993, state: 0, type: 0 },
		{ index: -1, x: 239, y: 1018, state: 0, type: 1 },

		{ index: 12, x: 104, y: 1048, state: 0, type: 0 },
		{ index: 13, x: 104, y: 1198, state: 0, type: 0 },
		{ index: 14, x: 244, y: 1198, state: 0, type: 0 },
		{ index: 15, x: 384, y: 1220, state: 0, type: 0 },
		{ index: -1, x: 539, y: 1272, state: 0, type: 1 },

		{ index: 16, x: 544, y: 1403, state: 0, type: 0 },
		{ index: 17, x: 384, y: 1420, state: 0, type: 0 },
		{ index: 18, x: 234, y: 1438, state: 0, type: 0 },
		{ index: 19, x: 104, y: 1475, state: 0, type: 0 },
		{ index: -1, x: 101, y: 1631, state: 0, type: 1 },

		{ index: 20, x: 244, y: 1635, state: 0, type: 0 },
		{ index: 21, x: 384, y: 1657, state: 0, type: 0 },
		{ index: 22, x: 524, y: 1700, state: 0, type: 0 },
		{ index: 23, x: 544, y: 1850, state: 0, type: 0 },
		{ index: -1, x: 385, y: 1860, state: 0, type: 1 },

		{ index: 24, x: 234, y: 1877, state: 0, type: 0 },
		{ index: 25, x: 104, y: 1914, state: 0, type: 0 },
		{ index: 26, x: 104, y: 2064, state: 0, type: 0 },
		{ index: -1, x: 305, y: 2100, state: 0, type: 1 }
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
		this.scroller.height = this.stage.stageHeight;
		this.createFun();
		AdMaster.closeBannerAd();
	}
	public createFun() {
		let that = this;
		let data = that.dataArr;
		let travels = userDataMaster.travels;
		let travelList = userDataMaster.travelList;
		for (let i = 0; i < data.length; i++) {
			let name, travel, text;
			if (data[i].type == 1 && i > 0 && travels[i].state == 1) {
				//已领取的礼包
				name = 'img_gift_a3_png';
			}
			if (data[i].type == 1 && i > 0 && travels[i].state == 0 && data[i - 1].index < travelList.length) {
				//可领取的礼包
				name = 'img_gift_a2_png';
			}
			if (data[i].type == 1 && i > 0 && data[i - 1].index >= travelList.length) {
				//不能领取的礼包
				name = 'img_gift_a1_png';
			}
			if (data[i].type == 0 && data[i].index >= travelList.length) {
				//未解锁
				name = 'img_bg_imprinting_2_png';
			}
			if (data[i].type == 0 && data[i].index < travelList.length) {
				//已解锁
				name = 'img_bg_imprinting_1_png';
				let index = travelList[data[i].index];
				travel = that.createBitmapByName('img_imprinting_b' + (travels[index].id+1) + '_png', data[i].x - 15, data[i].y - 15, 156, 135);
				let txt = travels[index].name;
				text = new eui.Label(txt);
				text.size = 20;
				text.textColor = 0x473678;
				text.x = data[i].x - 15 + (156 - text.width) / 2;
				text.y = data[i].y + 130;
				if (travels[index].state == 2) {
					//是新的
					travels[index].state = 1;
					let is_new=that.createBitmapByName('img_label_02_png',data[i].x + 80, data[i].y - 20);
                    this.content.addChild(is_new);
					userDataMaster.setTravel(index, travels[index]);
				}
			}
			let img = that.createBitmapByName(name, data[i].x - 15, data[i].y - 15);
			this.content.addChild(img);
			if (name == 'img_gift_a2_png') {
				let tip = that.createBitmapByName('img_label_05_png', data[i].x + 30, data[i].y - 20);
				this.content.addChild(tip);

				img.touchEnabled = true;
				img.name = 'img_' + i;
				img.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { that.getFun(img, tip, i) }, this);
			}
			if (travel) {
				this.content.addChild(travel);
				this.content.addChild(text);
			}
		}
	}
	public getFun(img, tip, index) {
		let travel = userDataMaster.myTravels[index];
		if (travel.state == 0) {
			travel.state = 1;
			userDataMaster.setTravel(index, travel);
			userDataMaster.myGold += 50;
			img.texture = RES.getRes('img_gift_a3_png');
			tip.parent && this.content.removeChild(tip);
			this.addChild(new getSuccess(-1, 'x50'));
		}
	}
	public closeFun() {
		let parent = this.parent;
		parent.removeChild(this);
		if (AdMaster.cacheBannerAd) {
			AdMaster.openBannerAd({ width: 700, height: 300 });
		}
	}
	public createBitmapByName(name: string, x: number = 0, y: number = 0, center: number = 0, vertical: number = 0): egret.Bitmap {
		//center 是否水平居中  vertical 垂直居中
		let result = new egret.Bitmap();
		let texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		result.x = x;
		result.y = y;
		if (center > 0) {
			result.x = x + (center - result.width) / 2;
		}
		if (vertical > 0) {
			result.y = y + (vertical - result.height) / 2;

		}
		return result;
	}

}