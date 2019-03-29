class colorBgCom extends eui.Component implements eui.UIComponent {
	public currentTheme = 1;//当前主题 从1开始
	public static bgLinear = new egret.Sprite();//背景对象
	public static stageHeight = 1334;
	public constructor(currentTheme = 1) {
		super();
		this.currentTheme = currentTheme;
	}
	public static shared: colorBgCom;
	public static getInstance(currentTheme = 1) {
		if (!colorBgCom.shared) {
			colorBgCom.shared = new colorBgCom(currentTheme);
		}
		return colorBgCom.shared;
	}
	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.init()
	}
	public init() {
		colorBgCom.stageHeight = this.stage.stageHeight;
		this.addChild(colorBgCom.bgLinear);
		this.changeTheme(this.currentTheme);
	}

	public changeTheme(currentTheme) {
		let stageHeight = colorBgCom.stageHeight;
		let theme = randomTheme.getInstance().degreeThemeArr[currentTheme - 1];
		colorBgCom.bgLinear.graphics.clear();
		let matix: egret.Matrix = colorBgCom.bgLinear.matrix;
		matix.createGradientBox(750 / 2, stageHeight / 2, Math.PI / 2, 750 / 4, stageHeight / 4);
		colorBgCom.bgLinear.graphics.beginGradientFill(egret.GradientType.LINEAR, [theme.begin, theme.end], [1, 1], [0, 255], matix);
		colorBgCom.bgLinear.graphics.drawRect(0, 0, 750, stageHeight);
		colorBgCom.bgLinear.graphics.endFill();
	}
}
window['colorBgCom'] = colorBgCom;