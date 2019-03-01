class rankItem extends eui.ItemRenderer implements eui.UIComponent {
	public index: eui.Label;
	public bestHat: eui.Image;
	public headimgMask: eui.Rect;
	public headimg: eui.Image;
	public nickName: eui.Label;
	public score: eui.Label;



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
	init() {

	}
	protected dataChanged(): void {
		if (this.data.index.length > 4) {
			this.data.index = this.data.index.slice(0, 4) + "…";
		}
		this.index.text = this.data.index + '';
		this.headimg.source = this.data.avatarUrl;
		this.score.text = this.data.score;
		if (this.data.nickName.length > 5) {
			this.data.nickName = this.data.nickName.slice(0, 5) + "…";
		}
		this.nickName.text = this.data.nickName;
		this.headimg.mask = this.headimgMask;
		if (this.data.index < 4) {
			this.bestHat.visible = true;
			this.bestHat.texture = RES.getRes('icn_medal_0' + this.data.index + '_png')
		} else {
			this.bestHat.visible = false;
		}
		// if (this.data.uid != userData.getInstance().getMyInfo.uid) {
		// 	this.bgImg.texture = RES.getRes('bg_friend_png');
		// 	this.score.textColor = 0x5A5BE9;
		// 	this.index.textColor = 0x5A5BE9;
		// 	this.nickName.textColor = 0x5A5BE9;
		// } else {
		// 	this.bgImg.texture = RES.getRes('bg_me_png');
		// 	this.score.textColor = 0xffffff;
		// 	this.index.textColor = 0xffffff;
		// 	this.nickName.textColor = 0xffffff;
		// }
	}

}