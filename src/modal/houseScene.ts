class houseScene extends eui.Component implements eui.UIComponent {
	public content: eui.Group;
	public closeBtn: eui.Image;

	public dataGroup: eui.DataGroup;
	public sourceArr: eui.ArrayCollection;
	public dataArr=[
		{id:1,name:'白白球',image:'resource/assets/Aimages/bee.png'},
		{id:2,name:'白白球',image:'resource/assets/Aimages/bee.png'},
		{id:3,name:'白白球',image:'resource/assets/Aimages/bee.png'},
		{id:4,name:'白白球',image:'resource/assets/Aimages/bee.png'},
		{id:5,name:'白白球',image:'resource/assets/Aimages/bee.png'},
		{id:6,name:'白白球',image:'resource/assets/Aimages/bee.png'},
		{id:7,name:'白白球',image:'resource/assets/Aimages/bee.png'},
		{id:8,name:'白白球',image:'resource/assets/Aimages/bee.png'},
		{id:9,name:'白白球',image:'resource/assets/Aimages/bee.png'}
	]
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
		this.sourceArr = new eui.ArrayCollection(this.dataArr);
		this.dataGroup = new eui.DataGroup();
		this.dataGroup.dataProvider = this.sourceArr;
		this.dataGroup.useVirtualLayout = true;
		let layout = new eui.TileLayout();
		layout.paddingTop = 15;
		layout.verticalGap = 60;
		layout.horizontalGap = 60;
		this.dataGroup.layout = layout;
		this.dataGroup.itemRenderer = ballItem;
		this.content.addChild(this.dataGroup);

		this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.closeFun,this)
	}
	public closeFun(){
		let parent=this.parent;
		parent.removeChild(this);
	}
}