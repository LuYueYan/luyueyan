class grayBg extends eui.Component implements eui.UIComponent {
	public bg: eui.Rect;
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
		this.bg.width = this.stage.stageWidth;
		this.bg.height = this.stage.stageHeight;
	}
}
window['grayBg']=grayBg;