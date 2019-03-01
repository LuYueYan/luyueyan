class travelScene extends eui.Component implements eui.UIComponent {
	public content: eui.Group;
	public closeBtn: eui.Image;

	public dataGroup: eui.DataGroup;
	public sourceArr: eui.ArrayCollection;

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
		this.sourceArr = new eui.ArrayCollection(userDataMaster.myTravels);
		this.dataGroup = new eui.DataGroup();
		this.dataGroup.dataProvider = this.sourceArr;
		this.dataGroup.useVirtualLayout = true;
		let layout = new eui.TileLayout();
		layout.paddingTop = 15;
		layout.verticalGap = 60;
		layout.horizontalGap = 60;
		this.dataGroup.layout = layout;
		this.dataGroup.itemRenderer = travelItem;
		this.content.addChild(this.dataGroup);

		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this)
	}
	public closeFun() {
		let parent = this.parent;
		parent.removeChild(this);
	}

}