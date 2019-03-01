class rank extends eui.Component implements eui.UIComponent {
	public friendGroup: eui.Group;
	public friend: eui.Image;
	public world: eui.Image;
	public worldGroup: eui.Group;
	public lastPage: eui.Image;
	public nextPage: eui.Image;
	public pageText: eui.Label;
	public goHome: eui.Button;

	public dataGroup: eui.DataGroup = new eui.DataGroup();
	public sourceArr: eui.ArrayCollection = new eui.ArrayCollection([]);
	public currentType = 'friend';
	public worldPage = 1;
	public endPage = 1;
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
		let that = this;
		platform.openDataContext.postMessage({
			type: "rank",
			width: 600,
			height: 700
		});
		let rank = platform.openDataContext.createDisplayObject()
		this.friendGroup.addChild(rank);
		this.dataGroup.dataProvider = this.sourceArr;
		this.dataGroup.itemRenderer = rankItem;
		let layout = new eui.VerticalLayout();
		layout.gap = 14;
		this.dataGroup.layout = layout;
		this.worldGroup.addChild(this.dataGroup);
		this.getWorld();
		this.lastPage.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.changePage('-1') }, this);
		this.nextPage.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { this.changePage('+1') }, this);
		this.goHome.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goHomeFun, this);
		this.friend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.friendFun, this);
		this.world.addEventListener(egret.TouchEvent.TOUCH_TAP, this.worldFun, this);
		// if (!userData.getInstance().haveNickName) {
		// 	userData.getInstance().createLoginBtn(381, 124, 258, 112);
		// }
	}
	public changePage(type) {
		if (this.currentType == 'friend') {
			this.getMore(type);
		} else {
			if (type == '-1') {
				this.worldPage > 1 ? this.worldPage-- : 1;
			} else {
				this.worldPage < this.endPage ? this.worldPage++ : '';
			}
			this.getWorld();
		}
	}
	public getWorld() {
		let that = this;
		let params = {
			p: that.worldPage
		}
		// ServiceMaster.post(ServiceMaster.getList, params, (res) => {
		// 	if (res.code == 1 && res.data) {
		// 		let data = res.data.data;
		// 		that.endPage = res.data.last_page;
		// 		that.sourceArr.removeAll();
		// 		for (let i = 0; i < data.length; i++) {
		// 			data[i].index = (that.worldPage - 1) * res.data.per_page + i + 1;
		// 			that.sourceArr.addItem(data[i]);
		// 		}
		// 	}
		// })
	}
	public friendFun() {
		this.friend.texture = RES.getRes('img_tittle_a1_png');
		this.world.texture = RES.getRes('img_tittle_b2_png');
		this.friendGroup.visible = true;
		this.worldGroup.visible = false;
		this.currentType = 'friend';
	}
	public worldFun() {
		this.friend.texture = RES.getRes('img_tittle_a2_png');
		this.world.texture = RES.getRes('img_tittle_b1_png');
		this.friendGroup.visible = false;
		this.worldGroup.visible = true;
		this.currentType = 'world';
	}
	public getMore(type) {
		platform.openDataContext.postMessage({
			type: "rank",
			page: type,
			width:600,
			height: 700
		});
	}
	public goHomeFun() {
		let parent = this.parent;
		parent.removeChild(this);
		parent.addChild(new startScene());
		// userData.getInstance().userInfoBtn&&userData.getInstance().userInfoBtn.destroy();
	}
}