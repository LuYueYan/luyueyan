class ballItem extends eui.ItemRenderer implements eui.UIComponent {
	public image: eui.Image;
	public imgMask: eui.Rect;
	public title: eui.Label;

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
		this.image.mask = this.imgMask;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			
			
		}, this)
	}
	protected dataChanged(): void {
		this.title.text = this.data.name;
		this.image.source = this.data.image||'';
		this.image.mask = this.imgMask;
		// this.title.textColor = this.data.color || 0xFBF6E3;
	}

}
window['ballItem'] = ballItem