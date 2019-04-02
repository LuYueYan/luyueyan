window.skins={};
                function __extends(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                        function __() {
                            this.constructor = d;
                        }
                    __.prototype = b.prototype;
                    d.prototype = new __();
                };
                window.generateEUI = {};
                generateEUI.paths = {};
                generateEUI.styles = undefined;
                generateEUI.skins = {"eui.Button":"resource/eui_skins/ButtonSkin.exml","eui.CheckBox":"resource/eui_skins/CheckBoxSkin.exml","eui.HScrollBar":"resource/eui_skins/HScrollBarSkin.exml","eui.HSlider":"resource/eui_skins/HSliderSkin.exml","eui.Panel":"resource/eui_skins/PanelSkin.exml","eui.TextInput":"resource/eui_skins/TextInputSkin.exml","eui.ProgressBar":"resource/eui_skins/ProgressBarSkin.exml","eui.RadioButton":"resource/eui_skins/RadioButtonSkin.exml","eui.Scroller":"resource/eui_skins/ScrollerSkin.exml","eui.ToggleSwitch":"resource/eui_skins/ToggleSwitchSkin.exml","eui.VScrollBar":"resource/eui_skins/VScrollBarSkin.exml","eui.VSlider":"resource/eui_skins/VSliderSkin.exml","eui.ItemRenderer":"resource/eui_skins/ItemRendererSkin.exml","runningScene":"resource/page/runningScene.exml","gameOver":"resource/page/gameOver.exml","common":"resource/page/common.exml","startScene":"resource/page/startScene.exml","moreItem":"resource/modal/moreItem.exml","ballItem":"resource/modal/ballItem.exml","houseScene":"resource/modal/houseScene.exml","travelItem":"resource/modal/travelItem.exml","travelScene":"resource/modal/travelScene.exml","reborn":"resource/page/reborn.exml","grayBg":"resource/modal/grayBg.exml","rank":"resource/page/rank.exml","rankItem":"resource/modal/rankItem.exml","friendHelp":"resource/modal/friendHelp.exml","dayEnergy":"resource/modal/dayEnergy.exml","circle":"resource/page/circle.exml","throughModal":"resource/modal/throughModal.exml","getEnergyModal":"resource/modal/getEnergyModal.exml","getSuccess":"resource/modal/getSuccess.exml","myBalls":"resource/modal/myBalls.exml","guideModal":"resource/modal/guideModal.exml","tryModal":"resource/modal/tryModal.exml","component":"resource/component/component.exml","colorBgCom":"resource/component/colorBgCom.exml","moreScroller":"resource/modal/moreScroller.exml"};generateEUI.paths['resource/component/colorBgCom.exml'] = window.colorBgComSkin = (function (_super) {
	__extends(colorBgComSkin, _super);
	function colorBgComSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.height = 300;
		this.width = 400;
	}
	var _proto = colorBgComSkin.prototype;

	return colorBgComSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ButtonSkin.exml'] = window.skins.ButtonSkin = (function (_super) {
	__extends(ButtonSkin, _super);
	function ButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay","iconDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i(),this.iconDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
	}
	var _proto = ButtonSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	_proto.iconDisplay_i = function () {
		var t = new eui.Image();
		this.iconDisplay = t;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		return t;
	};
	return ButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/CheckBoxSkin.exml'] = window.skins.CheckBoxSkin = (function (_super) {
	__extends(CheckBoxSkin, _super);
	function CheckBoxSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","checkbox_select_disabled_png")
				])
		];
	}
	var _proto = CheckBoxSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "checkbox_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return CheckBoxSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HScrollBarSkin.exml'] = window.skins.HScrollBarSkin = (function (_super) {
	__extends(HScrollBarSkin, _super);
	function HScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = HScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 8;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.verticalCenter = 0;
		t.width = 30;
		return t;
	};
	return HScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/HSliderSkin.exml'] = window.skins.HSliderSkin = (function (_super) {
	__extends(HSliderSkin, _super);
	function HSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 8;
		this.minWidth = 20;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = HSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.height = 6;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_sb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.source = "thumb_png";
		t.verticalCenter = 0;
		return t;
	};
	return HSliderSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ItemRendererSkin.exml'] = window.skins.ItemRendererSkin = (function (_super) {
	__extends(ItemRendererSkin, _super);
	function ItemRendererSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.minHeight = 50;
		this.minWidth = 100;
		this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","button_down_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
		];
		
		eui.Binding.$bindProperties(this, ["hostComponent.data"],[0],this.labelDisplay,"text");
	}
	var _proto = ItemRendererSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.bottom = 8;
		t.fontFamily = "Tahoma";
		t.left = 8;
		t.right = 8;
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0xFFFFFF;
		t.top = 8;
		t.verticalAlign = "middle";
		return t;
	};
	return ItemRendererSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/PanelSkin.exml'] = window.skins.PanelSkin = (function (_super) {
	__extends(PanelSkin, _super);
	function PanelSkin() {
		_super.call(this);
		this.skinParts = ["titleDisplay","moveArea","closeButton"];
		
		this.minHeight = 230;
		this.minWidth = 450;
		this.elementsContent = [this._Image1_i(),this.moveArea_i(),this.closeButton_i()];
	}
	var _proto = PanelSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.scale9Grid = new egret.Rectangle(2,2,12,12);
		t.source = "border_png";
		t.top = 0;
		return t;
	};
	_proto.moveArea_i = function () {
		var t = new eui.Group();
		this.moveArea = t;
		t.height = 45;
		t.left = 0;
		t.right = 0;
		t.top = 0;
		t.elementsContent = [this._Image2_i(),this.titleDisplay_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.bottom = 0;
		t.left = 0;
		t.right = 0;
		t.source = "header_png";
		t.top = 0;
		return t;
	};
	_proto.titleDisplay_i = function () {
		var t = new eui.Label();
		this.titleDisplay = t;
		t.fontFamily = "Tahoma";
		t.left = 15;
		t.right = 5;
		t.size = 20;
		t.textColor = 0xFFFFFF;
		t.verticalCenter = 0;
		t.wordWrap = false;
		return t;
	};
	_proto.closeButton_i = function () {
		var t = new eui.Button();
		this.closeButton = t;
		t.bottom = 5;
		t.horizontalCenter = 0;
		t.label = "close";
		return t;
	};
	return PanelSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ProgressBarSkin.exml'] = window.skins.ProgressBarSkin = (function (_super) {
	__extends(ProgressBarSkin, _super);
	function ProgressBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb","labelDisplay"];
		
		this.minHeight = 18;
		this.minWidth = 30;
		this.elementsContent = [this._Image1_i(),this.thumb_i(),this.labelDisplay_i()];
	}
	var _proto = ProgressBarSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_pb_png";
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.percentHeight = 100;
		t.source = "thumb_pb_png";
		t.percentWidth = 100;
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.horizontalCenter = 0;
		t.size = 15;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		t.verticalCenter = 0;
		return t;
	};
	return ProgressBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/RadioButtonSkin.exml'] = window.skins.RadioButtonSkin = (function (_super) {
	__extends(RadioButtonSkin, _super);
	function RadioButtonSkin() {
		_super.call(this);
		this.skinParts = ["labelDisplay"];
		
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","alpha",0.7)
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","alpha",0.5)
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_up_png")
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_down_png")
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image1","source","radiobutton_select_disabled_png")
				])
		];
	}
	var _proto = RadioButtonSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.layout = this._HorizontalLayout1_i();
		t.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
		return t;
	};
	_proto._HorizontalLayout1_i = function () {
		var t = new eui.HorizontalLayout();
		t.verticalAlign = "middle";
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.alpha = 1;
		t.fillMode = "scale";
		t.source = "radiobutton_unselect_png";
		return t;
	};
	_proto.labelDisplay_i = function () {
		var t = new eui.Label();
		this.labelDisplay = t;
		t.fontFamily = "Tahoma";
		t.size = 20;
		t.textAlign = "center";
		t.textColor = 0x707070;
		t.verticalAlign = "middle";
		return t;
	};
	return RadioButtonSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ScrollerSkin.exml'] = window.skins.ScrollerSkin = (function (_super) {
	__extends(ScrollerSkin, _super);
	function ScrollerSkin() {
		_super.call(this);
		this.skinParts = ["horizontalScrollBar","verticalScrollBar"];
		
		this.minHeight = 20;
		this.minWidth = 20;
		this.elementsContent = [this.horizontalScrollBar_i(),this.verticalScrollBar_i()];
	}
	var _proto = ScrollerSkin.prototype;

	_proto.horizontalScrollBar_i = function () {
		var t = new eui.HScrollBar();
		this.horizontalScrollBar = t;
		t.bottom = 0;
		t.percentWidth = 100;
		return t;
	};
	_proto.verticalScrollBar_i = function () {
		var t = new eui.VScrollBar();
		this.verticalScrollBar = t;
		t.percentHeight = 100;
		t.right = 0;
		return t;
	};
	return ScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/TextInputSkin.exml'] = window.skins.TextInputSkin = (function (_super) {
	__extends(TextInputSkin, _super);
	function TextInputSkin() {
		_super.call(this);
		this.skinParts = ["textDisplay","promptDisplay"];
		
		this.minHeight = 40;
		this.minWidth = 300;
		this.elementsContent = [this._Image1_i(),this._Rect1_i(),this.textDisplay_i()];
		this.promptDisplay_i();
		
		this.states = [
			new eui.State ("normal",
				[
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("textDisplay","textColor",0xff0000)
				])
			,
			new eui.State ("normalWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
			,
			new eui.State ("disabledWithPrompt",
				[
					new eui.AddItems("promptDisplay","",1,"")
				])
		];
	}
	var _proto = TextInputSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.percentHeight = 100;
		t.scale9Grid = new egret.Rectangle(1,3,8,8);
		t.source = "button_up_png";
		t.percentWidth = 100;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillColor = 0xffffff;
		t.percentHeight = 100;
		t.percentWidth = 100;
		return t;
	};
	_proto.textDisplay_i = function () {
		var t = new eui.EditableText();
		this.textDisplay = t;
		t.height = 24;
		t.left = "10";
		t.right = "10";
		t.size = 20;
		t.textColor = 0x000000;
		t.verticalCenter = "0";
		t.percentWidth = 100;
		return t;
	};
	_proto.promptDisplay_i = function () {
		var t = new eui.Label();
		this.promptDisplay = t;
		t.height = 24;
		t.left = 10;
		t.right = 10;
		t.size = 20;
		t.textColor = 0xa9a9a9;
		t.touchEnabled = false;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		return t;
	};
	return TextInputSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/ToggleSwitchSkin.exml'] = window.skins.ToggleSwitchSkin = (function (_super) {
	__extends(ToggleSwitchSkin, _super);
	function ToggleSwitchSkin() {
		_super.call(this);
		this.skinParts = [];
		
		this.elementsContent = [this._Image1_i(),this._Image2_i()];
		this.states = [
			new eui.State ("up",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("down",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("disabled",
				[
					new eui.SetProperty("_Image1","source","off_png")
				])
			,
			new eui.State ("upAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("downAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
			,
			new eui.State ("disabledAndSelected",
				[
					new eui.SetProperty("_Image2","horizontalCenter",18)
				])
		];
	}
	var _proto = ToggleSwitchSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		this._Image1 = t;
		t.source = "on_png";
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		this._Image2 = t;
		t.horizontalCenter = -18;
		t.source = "handle_png";
		t.verticalCenter = 0;
		return t;
	};
	return ToggleSwitchSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VScrollBarSkin.exml'] = window.skins.VScrollBarSkin = (function (_super) {
	__extends(VScrollBarSkin, _super);
	function VScrollBarSkin() {
		_super.call(this);
		this.skinParts = ["thumb"];
		
		this.minHeight = 20;
		this.minWidth = 8;
		this.elementsContent = [this.thumb_i()];
	}
	var _proto = VScrollBarSkin.prototype;

	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.height = 30;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(3,3,2,2);
		t.source = "roundthumb_png";
		t.width = 8;
		return t;
	};
	return VScrollBarSkin;
})(eui.Skin);generateEUI.paths['resource/eui_skins/VSliderSkin.exml'] = window.skins.VSliderSkin = (function (_super) {
	__extends(VSliderSkin, _super);
	function VSliderSkin() {
		_super.call(this);
		this.skinParts = ["track","thumb"];
		
		this.minHeight = 30;
		this.minWidth = 25;
		this.elementsContent = [this.track_i(),this.thumb_i()];
	}
	var _proto = VSliderSkin.prototype;

	_proto.track_i = function () {
		var t = new eui.Image();
		this.track = t;
		t.percentHeight = 100;
		t.horizontalCenter = 0;
		t.scale9Grid = new egret.Rectangle(1,1,4,4);
		t.source = "track_png";
		t.width = 7;
		return t;
	};
	_proto.thumb_i = function () {
		var t = new eui.Image();
		this.thumb = t;
		t.horizontalCenter = 0;
		t.source = "thumb_png";
		return t;
	};
	return VSliderSkin;
})(eui.Skin);generateEUI.paths['resource/modal/ballItem.exml'] = window.ballItemSkin = (function (_super) {
	__extends(ballItemSkin, _super);
	function ballItemSkin() {
		_super.call(this);
		this.skinParts = ["image","imgMask","title"];
		
		this.height = 160;
		this.width = 130;
		this.elementsContent = [this.image_i(),this.imgMask_i(),this.title_i()];
	}
	var _proto = ballItemSkin.prototype;

	_proto.image_i = function () {
		var t = new eui.Image();
		this.image = t;
		t.height = 120;
		t.horizontalCenter = 0;
		t.width = 120;
		t.y = 0;
		return t;
	};
	_proto.imgMask_i = function () {
		var t = new eui.Rect();
		this.imgMask = t;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.height = 120;
		t.horizontalCenter = 0;
		t.width = 120;
		t.y = 0;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Label();
		this.title = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 25;
		t.horizontalCenter = 0;
		t.size = 22;
		t.text = "名字哇";
		t.textAlign = "center";
		t.textColor = 0xfbf6e3;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.y = 130.5;
		return t;
	};
	return ballItemSkin;
})(eui.Skin);generateEUI.paths['resource/modal/dayEnergy.exml'] = window.dayEnergySkin = (function (_super) {
	__extends(dayEnergySkin, _super);
	var dayEnergySkin$Skin1 = 	(function (_super) {
		__extends(dayEnergySkin$Skin1, _super);
		function dayEnergySkin$Skin1() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = dayEnergySkin$Skin1.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_close_01_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return dayEnergySkin$Skin1;
	})(eui.Skin);

	var dayEnergySkin$Skin2 = 	(function (_super) {
		__extends(dayEnergySkin$Skin2, _super);
		function dayEnergySkin$Skin2() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = dayEnergySkin$Skin2.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_present_01_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return dayEnergySkin$Skin2;
	})(eui.Skin);

	function dayEnergySkin() {
		_super.call(this);
		this.skinParts = ["closeBtn","shareBtn","img","getBtn","body"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._grayBg1_i(),this.body_i()];
	}
	var _proto = dayEnergySkin.prototype;

	_proto._grayBg1_i = function () {
		var t = new grayBg();
		return t;
	};
	_proto.body_i = function () {
		var t = new eui.Group();
		this.body = t;
		t.anchorOffsetX = 320;
		t.anchorOffsetY = 421;
		t.horizontalCenter = 0;
		t.scaleX = 0;
		t.scaleY = 0;
		t.y = 612;
		t.elementsContent = [this._Image1_i(),this.closeBtn_i(),this.shareBtn_i(),this._Image2_i(),this.img_i(),this._Group1_i(),this._Image3_i(),this._Label1_i(),this._Image4_i(),this._Image5_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "img_bullet_frame_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Button();
		this.closeBtn = t;
		t.label = "";
		t.x = 579;
		t.y = 54;
		t.skinName = dayEnergySkin$Skin1;
		return t;
	};
	_proto.shareBtn_i = function () {
		var t = new eui.Button();
		this.shareBtn = t;
		t.label = "";
		t.x = 428;
		t.y = 689;
		t.skinName = dayEnergySkin$Skin2;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_base_01_png";
		t.y = 161.16;
		return t;
	};
	_proto.img_i = function () {
		var t = new eui.Image();
		this.img = t;
		t.anchorOffsetX = 88;
		t.anchorOffsetY = 114.5;
		t.source = "img_fruit_big_png";
		t.x = 324;
		t.y = 312;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 120;
		t.horizontalCenter = 0;
		t.width = 300;
		t.y = 495;
		t.elementsContent = [this.getBtn_i()];
		return t;
	};
	_proto.getBtn_i = function () {
		var t = new eui.Image();
		this.getBtn = t;
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_receive_01_png";
		t.touchEnabled = true;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "img_gift_small_png";
		t.x = 22;
		t.y = 639.19;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.lineSpacing = 10;
		t.size = 24;
		t.text = "赠送能量果礼包给好友 自己也可以领取一份哦";
		t.textColor = 0xb5a9ff;
		t.width = 240;
		t.x = 167;
		t.y = 691;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_tittle_02_png";
		t.y = 45;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "img_label_06_png";
		t.x = 113;
		t.y = 653;
		return t;
	};
	return dayEnergySkin;
})(eui.Skin);generateEUI.paths['resource/modal/friendHelp.exml'] = window.friendHelpSkin = (function (_super) {
	__extends(friendHelpSkin, _super);
	var friendHelpSkin$Skin3 = 	(function (_super) {
		__extends(friendHelpSkin$Skin3, _super);
		function friendHelpSkin$Skin3() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = friendHelpSkin$Skin3.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_receive_12_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return friendHelpSkin$Skin3;
	})(eui.Skin);

	var friendHelpSkin$Skin4 = 	(function (_super) {
		__extends(friendHelpSkin$Skin4, _super);
		function friendHelpSkin$Skin4() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = friendHelpSkin$Skin4.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_receive_12_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return friendHelpSkin$Skin4;
	})(eui.Skin);

	var friendHelpSkin$Skin5 = 	(function (_super) {
		__extends(friendHelpSkin$Skin5, _super);
		function friendHelpSkin$Skin5() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = friendHelpSkin$Skin5.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_receive_12_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return friendHelpSkin$Skin5;
	})(eui.Skin);

	var friendHelpSkin$Skin6 = 	(function (_super) {
		__extends(friendHelpSkin$Skin6, _super);
		function friendHelpSkin$Skin6() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = friendHelpSkin$Skin6.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_receive_12_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return friendHelpSkin$Skin6;
	})(eui.Skin);

	var friendHelpSkin$Skin7 = 	(function (_super) {
		__extends(friendHelpSkin$Skin7, _super);
		function friendHelpSkin$Skin7() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = friendHelpSkin$Skin7.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_receive_12_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return friendHelpSkin$Skin7;
	})(eui.Skin);

	var friendHelpSkin$Skin8 = 	(function (_super) {
		__extends(friendHelpSkin$Skin8, _super);
		function friendHelpSkin$Skin8() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = friendHelpSkin$Skin8.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_receive_12_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return friendHelpSkin$Skin8;
	})(eui.Skin);

	var friendHelpSkin$Skin9 = 	(function (_super) {
		__extends(friendHelpSkin$Skin9, _super);
		function friendHelpSkin$Skin9() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = friendHelpSkin$Skin9.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_close_01_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return friendHelpSkin$Skin9;
	})(eui.Skin);

	function friendHelpSkin() {
		_super.call(this);
		this.skinParts = ["mask_0","friend_0","icon_0","text_0","get_0","mask_1","friend_1","icon_1","text_1","get_1","mask_2","friend_2","icon_2","text_2","get_2","mask_3","friend_3","icon_3","text_3","get_3","mask_4","friend_4","icon_4","text_4","get_4","mask_5","friend_5","icon_5","text_5","get_5","closeBtn","getBtn","body"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._grayBg1_i(),this.body_i()];
	}
	var _proto = friendHelpSkin.prototype;

	_proto._grayBg1_i = function () {
		var t = new grayBg();
		t.left = 0;
		t.top = 0;
		return t;
	};
	_proto.body_i = function () {
		var t = new eui.Group();
		this.body = t;
		t.anchorOffsetX = 320;
		t.anchorOffsetY = 421;
		t.horizontalCenter = 0;
		t.scaleX = 0;
		t.scaleY = 0;
		t.y = 612;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Image3_i(),this._Group7_i(),this.closeBtn_i(),this._Label2_i(),this.getBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bullet_frame_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_tittle_01_png";
		t.y = 45;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 1;
		t.source = "img_base_01_png";
		t.y = 200;
		return t;
	};
	_proto._Group7_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.percentWidth = 100;
		t.x = 0;
		t.elementsContent = [this._Group1_i(),this._Group2_i(),this._Group3_i(),this._Group4_i(),this._Group5_i(),this._Group6_i(),this._Label1_i()];
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.height = 150;
		t.x = 160;
		t.y = 150;
		t.elementsContent = [this.mask_0_i(),this._Image4_i(),this.friend_0_i(),this.icon_0_i(),this.text_0_i(),this.get_0_i()];
		return t;
	};
	_proto.mask_0_i = function () {
		var t = new eui.Rect();
		this.mask_0 = t;
		t.ellipseWidth = 76;
		t.height = 76;
		t.width = 76;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "img_head_png";
		t.touchEnabled = true;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.friend_0_i = function () {
		var t = new eui.Image();
		this.friend_0 = t;
		t.height = 76;
		t.source = "img_head_png";
		t.touchEnabled = true;
		t.width = 76;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto.icon_0_i = function () {
		var t = new eui.Image();
		this.icon_0 = t;
		t.source = "img_fruit_small_png";
		t.x = 6.96;
		t.y = 87;
		return t;
	};
	_proto.text_0_i = function () {
		var t = new eui.Label();
		this.text_0 = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 12.5;
		t.size = 18;
		t.text = "x 150";
		t.textAlign = "center";
		t.textColor = 0xAB9DFF;
		t.y = 92;
		return t;
	};
	_proto.get_0_i = function () {
		var t = new eui.Button();
		this.get_0 = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.visible = false;
		t.y = 120;
		t.skinName = friendHelpSkin$Skin3;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.x = 400;
		t.y = 150;
		t.elementsContent = [this.mask_1_i(),this._Image5_i(),this.friend_1_i(),this.icon_1_i(),this.text_1_i(),this.get_1_i()];
		return t;
	};
	_proto.mask_1_i = function () {
		var t = new eui.Rect();
		this.mask_1 = t;
		t.ellipseWidth = 76;
		t.height = 76;
		t.width = 76;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "img_head_png";
		t.touchEnabled = true;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.friend_1_i = function () {
		var t = new eui.Image();
		this.friend_1 = t;
		t.height = 76;
		t.source = "img_head_png";
		t.touchEnabled = true;
		t.width = 76;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto.icon_1_i = function () {
		var t = new eui.Image();
		this.icon_1 = t;
		t.source = "img_fruit_small_png";
		t.x = 6.96;
		t.y = 87;
		return t;
	};
	_proto.text_1_i = function () {
		var t = new eui.Label();
		this.text_1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 12.5;
		t.size = 18;
		t.text = "x 150";
		t.textAlign = "center";
		t.textColor = 0xAB9DFF;
		t.y = 92;
		return t;
	};
	_proto.get_1_i = function () {
		var t = new eui.Button();
		this.get_1 = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.visible = false;
		t.y = 120;
		t.skinName = friendHelpSkin$Skin4;
		return t;
	};
	_proto._Group3_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.x = 500;
		t.y = 310;
		t.elementsContent = [this.mask_2_i(),this._Image6_i(),this.friend_2_i(),this.icon_2_i(),this.text_2_i(),this.get_2_i()];
		return t;
	};
	_proto.mask_2_i = function () {
		var t = new eui.Rect();
		this.mask_2 = t;
		t.ellipseWidth = 76;
		t.height = 76;
		t.width = 76;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "img_head_png";
		t.touchEnabled = true;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.friend_2_i = function () {
		var t = new eui.Image();
		this.friend_2 = t;
		t.height = 76;
		t.source = "img_head_png";
		t.touchEnabled = true;
		t.width = 76;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto.icon_2_i = function () {
		var t = new eui.Image();
		this.icon_2 = t;
		t.source = "img_fruit_small_png";
		t.x = 6.96;
		t.y = 87;
		return t;
	};
	_proto.text_2_i = function () {
		var t = new eui.Label();
		this.text_2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 12.5;
		t.size = 18;
		t.text = "x 150";
		t.textAlign = "center";
		t.textColor = 0xAB9DFF;
		t.y = 92;
		return t;
	};
	_proto.get_2_i = function () {
		var t = new eui.Button();
		this.get_2 = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.visible = false;
		t.y = 120;
		t.skinName = friendHelpSkin$Skin5;
		return t;
	};
	_proto._Group4_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.x = 400;
		t.y = 490;
		t.elementsContent = [this.mask_3_i(),this._Image7_i(),this.friend_3_i(),this.icon_3_i(),this.text_3_i(),this.get_3_i()];
		return t;
	};
	_proto.mask_3_i = function () {
		var t = new eui.Rect();
		this.mask_3 = t;
		t.ellipseWidth = 76;
		t.height = 76;
		t.width = 76;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "img_head_png";
		t.touchEnabled = true;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.friend_3_i = function () {
		var t = new eui.Image();
		this.friend_3 = t;
		t.height = 76;
		t.source = "img_head_png";
		t.touchEnabled = true;
		t.width = 76;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto.icon_3_i = function () {
		var t = new eui.Image();
		this.icon_3 = t;
		t.source = "img_fruit_small_png";
		t.x = 6.96;
		t.y = 87;
		return t;
	};
	_proto.text_3_i = function () {
		var t = new eui.Label();
		this.text_3 = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 12.5;
		t.size = 18;
		t.text = "x 150";
		t.textAlign = "center";
		t.textColor = 0xAB9DFF;
		t.y = 92;
		return t;
	};
	_proto.get_3_i = function () {
		var t = new eui.Button();
		this.get_3 = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.visible = false;
		t.y = 120;
		t.skinName = friendHelpSkin$Skin6;
		return t;
	};
	_proto._Group5_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.x = 160;
		t.y = 490;
		t.elementsContent = [this.mask_4_i(),this._Image8_i(),this.friend_4_i(),this.icon_4_i(),this.text_4_i(),this.get_4_i()];
		return t;
	};
	_proto.mask_4_i = function () {
		var t = new eui.Rect();
		this.mask_4 = t;
		t.ellipseWidth = 76;
		t.height = 76;
		t.width = 76;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.source = "img_head_png";
		t.touchEnabled = true;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.friend_4_i = function () {
		var t = new eui.Image();
		this.friend_4 = t;
		t.height = 76;
		t.source = "img_head_png";
		t.touchEnabled = true;
		t.width = 76;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto.icon_4_i = function () {
		var t = new eui.Image();
		this.icon_4 = t;
		t.source = "img_fruit_small_png";
		t.x = 6.96;
		t.y = 87;
		return t;
	};
	_proto.text_4_i = function () {
		var t = new eui.Label();
		this.text_4 = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 12.5;
		t.size = 18;
		t.text = "x 150";
		t.textAlign = "center";
		t.textColor = 0xAB9DFF;
		t.y = 92;
		return t;
	};
	_proto.get_4_i = function () {
		var t = new eui.Button();
		this.get_4 = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.visible = false;
		t.y = 120;
		t.skinName = friendHelpSkin$Skin7;
		return t;
	};
	_proto._Group6_i = function () {
		var t = new eui.Group();
		t.anchorOffsetY = 0;
		t.x = 60;
		t.y = 310;
		t.elementsContent = [this.mask_5_i(),this._Image9_i(),this.friend_5_i(),this.icon_5_i(),this.text_5_i(),this.get_5_i()];
		return t;
	};
	_proto.mask_5_i = function () {
		var t = new eui.Rect();
		this.mask_5 = t;
		t.ellipseWidth = 76;
		t.height = 76;
		t.width = 76;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "img_head_png";
		t.touchEnabled = true;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.friend_5_i = function () {
		var t = new eui.Image();
		this.friend_5 = t;
		t.height = 76;
		t.source = "img_head_png";
		t.touchEnabled = true;
		t.width = 76;
		t.x = 2;
		t.y = 2;
		return t;
	};
	_proto.icon_5_i = function () {
		var t = new eui.Image();
		this.icon_5 = t;
		t.source = "img_fruit_small_png";
		t.x = 6.96;
		t.y = 87;
		return t;
	};
	_proto.text_5_i = function () {
		var t = new eui.Label();
		this.text_5 = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 12.5;
		t.size = 18;
		t.text = "x 150";
		t.textAlign = "center";
		t.textColor = 0xAB9DFF;
		t.y = 92;
		return t;
	};
	_proto.get_5_i = function () {
		var t = new eui.Button();
		this.get_5 = t;
		t.horizontalCenter = 0;
		t.label = "";
		t.visible = false;
		t.y = 120;
		t.skinName = friendHelpSkin$Skin8;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.text = "火火球";
		t.y = 260.92;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Button();
		this.closeBtn = t;
		t.label = "";
		t.x = 579;
		t.y = 53;
		t.skinName = friendHelpSkin$Skin9;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 22;
		t.text = "成功邀请6位好友，即可召唤小精灵“火火球”";
		t.textColor = 0x9382ff;
		t.y = 766;
		return t;
	};
	_proto.getBtn_i = function () {
		var t = new eui.Image();
		this.getBtn = t;
		t.horizontalCenter = 0;
		t.source = "btn_invite_png";
		t.touchEnabled = true;
		t.y = 662;
		return t;
	};
	return friendHelpSkin;
})(eui.Skin);generateEUI.paths['resource/modal/getEnergyModal.exml'] = window.getEnergyModalSkin = (function (_super) {
	__extends(getEnergyModalSkin, _super);
	var getEnergyModalSkin$Skin10 = 	(function (_super) {
		__extends(getEnergyModalSkin$Skin10, _super);
		function getEnergyModalSkin$Skin10() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = getEnergyModalSkin$Skin10.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_close_01_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return getEnergyModalSkin$Skin10;
	})(eui.Skin);

	function getEnergyModalSkin() {
		_super.call(this);
		this.skinParts = ["title","getBtn","getText","closeBtn","numText","state","numTip","body"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._grayBg1_i(),this.body_i()];
	}
	var _proto = getEnergyModalSkin.prototype;

	_proto._grayBg1_i = function () {
		var t = new grayBg();
		t.left = 0;
		t.top = 0;
		return t;
	};
	_proto.body_i = function () {
		var t = new eui.Group();
		this.body = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.horizontalCenter = -0.5;
		t.y = 191;
		t.elementsContent = [this._Image1_i(),this.title_i(),this._Image2_i(),this.getBtn_i(),this.getText_i(),this.closeBtn_i(),this.numText_i(),this.state_i(),this.numTip_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "img_bullet_frame_png";
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0;
		t.source = "img_tittle_03_png";
		t.y = 46;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_gift_big_png";
		t.y = 193.7;
		return t;
	};
	_proto.getBtn_i = function () {
		var t = new eui.Image();
		this.getBtn = t;
		t.horizontalCenter = 0;
		t.source = "btn_receive_02_png";
		t.touchEnabled = true;
		t.y = 651;
		return t;
	};
	_proto.getText_i = function () {
		var t = new eui.Label();
		this.getText = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 22;
		t.text = "已领取（0/5）";
		t.textColor = 0x9382ff;
		t.y = 753;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Button();
		this.closeBtn = t;
		t.label = "";
		t.x = 579;
		t.y = 54;
		t.skinName = getEnergyModalSkin$Skin10;
		return t;
	};
	_proto.numText_i = function () {
		var t = new eui.Label();
		this.numText = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 32;
		t.text = "x 100";
		t.visible = false;
		t.y = 548;
		return t;
	};
	_proto.state_i = function () {
		var t = new eui.Image();
		this.state = t;
		t.source = "img_received_png";
		t.visible = false;
		t.x = 430;
		t.y = 199;
		return t;
	};
	_proto.numTip_i = function () {
		var t = new eui.Image();
		this.numTip = t;
		t.source = "img_label_07_png";
		t.visible = false;
		t.x = 457;
		t.y = 193;
		return t;
	};
	return getEnergyModalSkin;
})(eui.Skin);generateEUI.paths['resource/modal/getSuccess.exml'] = window.getSuccessSkin = (function (_super) {
	__extends(getSuccessSkin, _super);
	function getSuccessSkin() {
		_super.call(this);
		this.skinParts = ["ignoreBtn","title","type_2","type_1","word","shareBtn","body"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._grayBg1_i(),this.body_i()];
	}
	var _proto = getSuccessSkin.prototype;

	_proto._grayBg1_i = function () {
		var t = new grayBg();
		t.y = 1.52;
		return t;
	};
	_proto.body_i = function () {
		var t = new eui.Group();
		this.body = t;
		t.anchorOffsetX = 357;
		t.anchorOffsetY = 445;
		t.height = 890;
		t.horizontalCenter = 1;
		t.scaleX = 0;
		t.scaleY = 0;
		t.width = 714;
		t.y = 565;
		t.elementsContent = [this._Image1_i(),this.ignoreBtn_i(),this.title_i(),this.type_2_i(),this.type_1_i(),this.word_i(),this.shareBtn_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_gift_png";
		t.top = 0;
		return t;
	};
	_proto.ignoreBtn_i = function () {
		var t = new eui.Label();
		this.ignoreBtn = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "不了>";
		t.textColor = 0xab9dff;
		t.touchEnabled = true;
		t.visible = false;
		t.y = 836;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Image();
		this.title = t;
		t.horizontalCenter = 0.5;
		t.source = "img_tittle_04_png";
		t.top = 28;
		return t;
	};
	_proto.type_2_i = function () {
		var t = new eui.Image();
		this.type_2 = t;
		t.horizontalCenter = 0.5;
		t.source = "img_elf_22_png";
		t.visible = false;
		t.y = 219.5;
		return t;
	};
	_proto.type_1_i = function () {
		var t = new eui.Group();
		this.type_1 = t;
		t.visible = false;
		t.x = 215;
		t.y = 179.5;
		t.elementsContent = [this._Image2_i(),this._Image3_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "img_fruit_big_png";
		t.x = 66;
		t.y = 47.5;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.source = "img_base_01_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.word_i = function () {
		var t = new eui.Label();
		this.word = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0.5;
		t.size = 28;
		t.text = "火火球";
		t.textColor = 0x9382ff;
		t.y = 514;
		return t;
	};
	_proto.shareBtn_i = function () {
		var t = new eui.Image();
		this.shareBtn = t;
		t.horizontalCenter = 0;
		t.source = "btn_show_png";
		t.touchEnabled = true;
		t.y = 717;
		return t;
	};
	return getSuccessSkin;
})(eui.Skin);generateEUI.paths['resource/modal/grayBg.exml'] = window.grayBgSkin = (function (_super) {
	__extends(grayBgSkin, _super);
	function grayBgSkin() {
		_super.call(this);
		this.skinParts = ["bg"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.bg_i()];
	}
	var _proto = grayBgSkin.prototype;

	_proto.bg_i = function () {
		var t = new eui.Rect();
		this.bg = t;
		t.fillAlpha = 0.7;
		t.fillColor = 0x000000;
		t.height = 1334;
		t.left = 0;
		t.top = 0;
		t.width = 750;
		return t;
	};
	return grayBgSkin;
})(eui.Skin);generateEUI.paths['resource/modal/guideModal.exml'] = window.guideModalSkin = (function (_super) {
	__extends(guideModalSkin, _super);
	function guideModalSkin() {
		_super.call(this);
		this.skinParts = ["process_1","process_2","process_3","process_4","process_5","process_6","knowBtn","process_7"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._grayBg1_i(),this.process_1_i(),this.process_2_i(),this.process_3_i(),this.process_4_i(),this.process_5_i(),this.process_6_i(),this.process_7_i()];
	}
	var _proto = guideModalSkin.prototype;

	_proto._grayBg1_i = function () {
		var t = new grayBg();
		return t;
	};
	_proto.process_1_i = function () {
		var t = new eui.Group();
		this.process_1 = t;
		t.touchThrough = true;
		t.x = 175;
		t.y = 714;
		t.elementsContent = [this._Image1_i(),this._Image2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "img_text_01_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "img_finger_png";
		t.x = 323.5;
		t.y = 251;
		return t;
	};
	_proto.process_2_i = function () {
		var t = new eui.Group();
		this.process_2 = t;
		t.anchorOffsetX = 0;
		t.touchThrough = true;
		t.visible = false;
		t.width = 675.12;
		t.x = 50.15;
		t.y = 196.09;
		t.elementsContent = [this._Image3_i(),this._Image4_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.source = "img_text_02_png";
		t.y = 36.36;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "img_finger_png";
		t.x = 531.06;
		t.y = 166.91;
		return t;
	};
	_proto.process_3_i = function () {
		var t = new eui.Group();
		this.process_3 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 264.6;
		t.touchThrough = true;
		t.visible = false;
		t.width = 670.33;
		t.x = 30.55;
		t.y = 207.18;
		t.elementsContent = [this._Image5_i(),this._Image6_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "img_text_03_png";
		t.x = 77.28;
		t.y = -1.51;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "img_finger_png";
		t.x = 343.2;
		t.y = 134.34;
		return t;
	};
	_proto.process_4_i = function () {
		var t = new eui.Group();
		this.process_4 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 303.54;
		t.touchThrough = true;
		t.visible = false;
		t.width = 404.55;
		t.x = 57.12;
		t.y = 863.67;
		t.elementsContent = [this._Image7_i(),this._Image8_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "img_text_04_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.right = 55.55000000000001;
		t.source = "img_finger_png";
		t.top = 212;
		return t;
	};
	_proto.process_5_i = function () {
		var t = new eui.Group();
		this.process_5 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 255.06;
		t.touchThrough = true;
		t.visible = false;
		t.width = 404.55;
		t.x = 306.21;
		t.y = 853.67;
		t.elementsContent = [this._Image9_i(),this._Image10_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.source = "img_text_05_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.right = 2.5500000000000114;
		t.source = "img_finger_png";
		t.top = 167;
		return t;
	};
	_proto.process_6_i = function () {
		var t = new eui.Group();
		this.process_6 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 303.54;
		t.touchThrough = true;
		t.visible = false;
		t.width = 404.55;
		t.x = 57.12;
		t.y = 863.67;
		t.elementsContent = [this._Image11_i(),this._Image12_i()];
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.source = "img_text_06_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.right = 55.55000000000001;
		t.source = "img_finger_png";
		t.top = 212;
		return t;
	};
	_proto.process_7_i = function () {
		var t = new eui.Group();
		this.process_7 = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 598;
		t.horizontalCenter = 0;
		t.visible = false;
		t.width = 508;
		t.y = 304;
		t.elementsContent = [this.knowBtn_i(),this._Image13_i(),this._Image14_i()];
		return t;
	};
	_proto.knowBtn_i = function () {
		var t = new eui.Image();
		this.knowBtn = t;
		t.horizontalCenter = 0;
		t.source = "btn_know_png";
		t.touchEnabled = true;
		t.y = 504;
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_text_07_png";
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_elf_02_png";
		t.y = 220;
		return t;
	};
	return guideModalSkin;
})(eui.Skin);generateEUI.paths['resource/modal/moreItem.exml'] = window.moreItemSkin = (function (_super) {
	__extends(moreItemSkin, _super);
	function moreItemSkin() {
		_super.call(this);
		this.skinParts = ["image","imgMask","title"];
		
		this.height = 130;
		this.width = 140;
		this.elementsContent = [this.image_i(),this.imgMask_i(),this.title_i()];
	}
	var _proto = moreItemSkin.prototype;

	_proto.image_i = function () {
		var t = new eui.Image();
		this.image = t;
		t.height = 100;
		t.horizontalCenter = 0;
		t.width = 100;
		t.y = 0;
		return t;
	};
	_proto.imgMask_i = function () {
		var t = new eui.Rect();
		this.imgMask = t;
		t.ellipseHeight = 30;
		t.ellipseWidth = 30;
		t.height = 100;
		t.horizontalCenter = 0;
		t.visible = false;
		t.width = 100;
		t.y = 0;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Label();
		this.title = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 25;
		t.horizontalCenter = 0;
		t.size = 18;
		t.text = "名字哇";
		t.textAlign = "center";
		t.textColor = 0xfbf6e3;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.y = 105.5;
		return t;
	};
	return moreItemSkin;
})(eui.Skin);generateEUI.paths['resource/modal/moreScroller.exml'] = window.moreScrollerSkin = (function (_super) {
	__extends(moreScrollerSkin, _super);
	function moreScrollerSkin() {
		_super.call(this);
		this.skinParts = ["moreGroup","moreGroup2","moreScroller"];
		
		this.height = 450;
		this.width = 140;
		this.elementsContent = [this.moreScroller_i()];
	}
	var _proto = moreScrollerSkin.prototype;

	_proto.moreScroller_i = function () {
		var t = new eui.Scroller();
		this.moreScroller = t;
		t.anchorOffsetY = 0;
		t.height = 450;
		t.width = 140;
		t.x = 0;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.moreGroup_i(),this.moreGroup2_i()];
		return t;
	};
	_proto.moreGroup_i = function () {
		var t = new eui.Group();
		this.moreGroup = t;
		t.height = 450;
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		return t;
	};
	_proto.moreGroup2_i = function () {
		var t = new eui.Group();
		this.moreGroup2 = t;
		t.height = 450;
		t.scaleX = 1;
		t.scaleY = 1;
		t.percentWidth = 100;
		return t;
	};
	return moreScrollerSkin;
})(eui.Skin);generateEUI.paths['resource/modal/myBalls.exml'] = window.myBallsSkin = (function (_super) {
	__extends(myBallsSkin, _super);
	function myBallsSkin() {
		_super.call(this);
		this.skinParts = ["bgImg","img_5","item_5","img_4","item_4","img_3","item_3","img_6","item_6","img_2","item_2","img_7","item_7","img_1","item_1","img_8","item_8","img_0","item_0","bodyGroup","homeBtn","goldText","addGold","nameImg","natureText","travelImg_0","travelImg_1","travelImg_2","fruitText","processBar","progressText","progressGroup","raiseBtn","popularGroup","fireText","fireBtn","fireGroup"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.bgImg_i(),this._Image1_i(),this.bodyGroup_i(),this.homeBtn_i(),this.addGold_i(),this._Image12_i(),this.nameImg_i(),this.natureText_i(),this._Label1_i(),this.travelImg_0_i(),this.travelImg_1_i(),this.travelImg_2_i(),this.popularGroup_i(),this.fireGroup_i()];
	}
	var _proto = myBallsSkin.prototype;

	_proto.bgImg_i = function () {
		var t = new eui.Image();
		this.bgImg = t;
		t.anchorOffsetY = 0;
		t.height = 1334;
		t.horizontalCenter = 0;
		t.source = "img_bg_revival_jpg";
		t.top = 0;
		t.width = 750;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_light_png";
		t.top = 0;
		return t;
	};
	_proto.bodyGroup_i = function () {
		var t = new eui.Group();
		this.bodyGroup = t;
		t.anchorOffsetY = 0;
		t.height = 410;
		t.horizontalCenter = 0;
		t.width = 750;
		t.y = 92.12;
		t.elementsContent = [this.item_5_i(),this.item_4_i(),this.item_3_i(),this.item_6_i(),this.item_2_i(),this.item_7_i(),this.item_1_i(),this.item_8_i(),this.item_0_i()];
		return t;
	};
	_proto.item_5_i = function () {
		var t = new eui.Group();
		this.item_5 = t;
		t.anchorOffsetX = 141;
		t.anchorOffsetY = 103;
		t.height = 206;
		t.scaleX = 0.3;
		t.scaleY = 0.3;
		t.x = 448;
		t.y = 180;
		t.elementsContent = [this._Image2_i(),this.img_5_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.alpha = 0.7;
		t.horizontalCenter = 0;
		t.source = "img_base_02_png";
		t.y = 135;
		return t;
	};
	_proto.img_5_i = function () {
		var t = new eui.Image();
		this.img_5 = t;
		t.height = 160;
		t.horizontalCenter = 0;
		t.rotation = 0;
		t.source = "";
		t.top = 0;
		t.width = 160;
		return t;
	};
	_proto.item_4_i = function () {
		var t = new eui.Group();
		this.item_4 = t;
		t.anchorOffsetX = 141;
		t.anchorOffsetY = 103;
		t.height = 206;
		t.scaleX = 0.3;
		t.scaleY = 0.3;
		t.x = 305;
		t.y = 180;
		t.elementsContent = [this._Image3_i(),this.img_4_i()];
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.alpha = 0.7;
		t.horizontalCenter = 0;
		t.source = "img_base_02_png";
		t.y = 135;
		return t;
	};
	_proto.img_4_i = function () {
		var t = new eui.Image();
		this.img_4 = t;
		t.height = 160;
		t.horizontalCenter = 0;
		t.rotation = 0;
		t.source = "";
		t.top = 0;
		t.width = 160;
		return t;
	};
	_proto.item_3_i = function () {
		var t = new eui.Group();
		this.item_3 = t;
		t.anchorOffsetX = 141;
		t.anchorOffsetY = 103;
		t.height = 206;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.x = 192;
		t.y = 198;
		t.elementsContent = [this._Image4_i(),this.img_3_i()];
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.alpha = 0.7;
		t.horizontalCenter = 0;
		t.source = "img_base_02_png";
		t.y = 135;
		return t;
	};
	_proto.img_3_i = function () {
		var t = new eui.Image();
		this.img_3 = t;
		t.height = 160;
		t.horizontalCenter = 0;
		t.rotation = 0;
		t.source = "";
		t.top = 0;
		t.width = 160;
		return t;
	};
	_proto.item_6_i = function () {
		var t = new eui.Group();
		this.item_6 = t;
		t.anchorOffsetX = 141;
		t.anchorOffsetY = 103;
		t.height = 206;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.x = 557;
		t.y = 198;
		t.elementsContent = [this._Image5_i(),this.img_6_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.alpha = 0.7;
		t.horizontalCenter = 0;
		t.source = "img_base_02_png";
		t.y = 135;
		return t;
	};
	_proto.img_6_i = function () {
		var t = new eui.Image();
		this.img_6 = t;
		t.height = 160;
		t.horizontalCenter = 0;
		t.rotation = 0;
		t.source = "";
		t.top = 0;
		t.width = 160;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new eui.Group();
		this.item_2 = t;
		t.anchorOffsetX = 141;
		t.anchorOffsetY = 103;
		t.height = 206;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.x = 90;
		t.y = 235;
		t.elementsContent = [this._Image6_i(),this.img_2_i()];
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.alpha = 0.7;
		t.horizontalCenter = 0;
		t.source = "img_base_02_png";
		t.y = 135;
		return t;
	};
	_proto.img_2_i = function () {
		var t = new eui.Image();
		this.img_2 = t;
		t.height = 160;
		t.horizontalCenter = 0;
		t.rotation = 0;
		t.source = "";
		t.top = 0;
		t.width = 160;
		return t;
	};
	_proto.item_7_i = function () {
		var t = new eui.Group();
		this.item_7 = t;
		t.anchorOffsetX = 141;
		t.anchorOffsetY = 103;
		t.height = 206;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.x = 670;
		t.y = 235;
		t.elementsContent = [this._Image7_i(),this.img_7_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.alpha = 0.7;
		t.horizontalCenter = 0;
		t.source = "img_base_02_png";
		t.y = 135;
		return t;
	};
	_proto.img_7_i = function () {
		var t = new eui.Image();
		this.img_7 = t;
		t.height = 160;
		t.horizontalCenter = 0;
		t.rotation = 0;
		t.source = "";
		t.top = 0;
		t.width = 160;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new eui.Group();
		this.item_1 = t;
		t.anchorOffsetX = 141;
		t.anchorOffsetY = 103;
		t.height = 206;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.x = 142;
		t.y = 288;
		t.elementsContent = [this._Image8_i(),this.img_1_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.alpha = 0.7;
		t.horizontalCenter = 0;
		t.source = "img_base_02_png";
		t.y = 135;
		return t;
	};
	_proto.img_1_i = function () {
		var t = new eui.Image();
		this.img_1 = t;
		t.height = 160;
		t.horizontalCenter = 0;
		t.rotation = 0;
		t.source = "";
		t.top = 0;
		t.width = 160;
		return t;
	};
	_proto.item_8_i = function () {
		var t = new eui.Group();
		this.item_8 = t;
		t.anchorOffsetX = 141;
		t.anchorOffsetY = 103;
		t.height = 206;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.x = 612;
		t.y = 288;
		t.elementsContent = [this._Image9_i(),this.img_8_i()];
		return t;
	};
	_proto._Image9_i = function () {
		var t = new eui.Image();
		t.alpha = 0.7;
		t.horizontalCenter = 0;
		t.source = "img_base_02_png";
		t.y = 135;
		return t;
	};
	_proto.img_8_i = function () {
		var t = new eui.Image();
		this.img_8 = t;
		t.height = 160;
		t.horizontalCenter = 0;
		t.rotation = 0;
		t.source = "";
		t.top = 0;
		t.width = 160;
		return t;
	};
	_proto.item_0_i = function () {
		var t = new eui.Group();
		this.item_0 = t;
		t.anchorOffsetX = 141;
		t.anchorOffsetY = 103;
		t.height = 206;
		t.x = 375;
		t.y = 303;
		t.elementsContent = [this._Image10_i(),this.img_0_i()];
		return t;
	};
	_proto._Image10_i = function () {
		var t = new eui.Image();
		t.alpha = 0.7;
		t.horizontalCenter = 0;
		t.source = "img_base_02_png";
		t.y = 135;
		return t;
	};
	_proto.img_0_i = function () {
		var t = new eui.Image();
		this.img_0 = t;
		t.height = 160;
		t.horizontalCenter = 0;
		t.rotation = 0;
		t.source = "";
		t.top = 0;
		t.width = 160;
		return t;
	};
	_proto.homeBtn_i = function () {
		var t = new eui.Image();
		this.homeBtn = t;
		t.source = "bnt_home_png";
		t.touchEnabled = true;
		t.x = 28;
		t.y = 58;
		return t;
	};
	_proto.addGold_i = function () {
		var t = new eui.Group();
		this.addGold = t;
		t.touchEnabled = true;
		t.x = 148.38;
		t.y = 66;
		t.elementsContent = [this._Image11_i(),this.goldText_i()];
		return t;
	};
	_proto._Image11_i = function () {
		var t = new eui.Image();
		t.source = "img_bg_fruit_number_png";
		t.touchEnabled = true;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.goldText_i = function () {
		var t = new eui.Label();
		this.goldText = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 26;
		t.text = "40";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 100;
		t.x = 52.31;
		t.y = 21.56;
		return t;
	};
	_proto._Image12_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_text_png";
		t.y = 501.12;
		return t;
	};
	_proto.nameImg_i = function () {
		var t = new eui.Image();
		this.nameImg = t;
		t.horizontalCenter = 0;
		t.source = "img_name_01_png";
		t.y = 501.12;
		return t;
	};
	_proto.natureText_i = function () {
		var t = new eui.Label();
		this.natureText = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 26;
		t.text = "球球属性：第一只拥有的精灵，洁白无一物";
		t.x = 86;
		t.y = 657.12;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 26;
		t.text = "专属印记：";
		t.x = 86;
		t.y = 753.12;
		return t;
	};
	_proto.travelImg_0_i = function () {
		var t = new eui.Image();
		this.travelImg_0 = t;
		t.height = 64;
		t.source = "img_imprinting_a1_png";
		t.width = 55;
		t.x = 242;
		t.y = 732.12;
		return t;
	};
	_proto.travelImg_1_i = function () {
		var t = new eui.Image();
		this.travelImg_1 = t;
		t.height = 64;
		t.source = "img_imprinting_a1_png";
		t.width = 55;
		t.x = 317;
		t.y = 732.12;
		return t;
	};
	_proto.travelImg_2_i = function () {
		var t = new eui.Image();
		this.travelImg_2 = t;
		t.height = 64;
		t.source = "img_imprinting_a1_png";
		t.width = 55;
		t.x = 392;
		t.y = 732.12;
		return t;
	};
	_proto.popularGroup_i = function () {
		var t = new eui.Group();
		this.popularGroup = t;
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.width = 710;
		t.y = 885.12;
		t.elementsContent = [this.fruitText_i(),this._Image13_i(),this._Rect1_i(),this.processBar_i(),this.progressGroup_i(),this.raiseBtn_i()];
		return t;
	};
	_proto.fruitText_i = function () {
		var t = new eui.Label();
		this.fruitText = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 20;
		t.text = "能量果喂养中（2000 / 5000）";
		t.textColor = 0xab9dff;
		t.x = 65;
		t.y = 1;
		return t;
	};
	_proto._Image13_i = function () {
		var t = new eui.Image();
		t.source = "img_fruit_small_png";
		t.x = 36;
		t.y = 0;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 10;
		t.fillColor = 0x7f2fff;
		t.height = 10;
		t.width = 650;
		t.x = 30;
		t.y = 31;
		return t;
	};
	_proto.processBar_i = function () {
		var t = new eui.Rect();
		this.processBar = t;
		t.ellipseWidth = 10;
		t.fillColor = 0xffffff;
		t.height = 10;
		t.width = 650;
		t.x = 30;
		t.y = 31;
		return t;
	};
	_proto.progressGroup_i = function () {
		var t = new eui.Group();
		this.progressGroup = t;
		t.x = 0;
		t.y = 51;
		t.elementsContent = [this._Image14_i(),this.progressText_i()];
		return t;
	};
	_proto._Image14_i = function () {
		var t = new eui.Image();
		t.source = "img_frame_digital_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.progressText_i = function () {
		var t = new eui.Label();
		this.progressText = t;
		t.anchorOffsetY = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 24;
		t.size = 20;
		t.text = "0%";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 60;
		t.x = 1;
		t.y = 9;
		return t;
	};
	_proto.raiseBtn_i = function () {
		var t = new eui.Image();
		this.raiseBtn = t;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "btn_receive_11_png";
		t.touchEnabled = true;
		t.x = 220;
		t.y = 93.36;
		return t;
	};
	_proto.fireGroup_i = function () {
		var t = new eui.Group();
		this.fireGroup = t;
		t.visible = false;
		t.x = 145;
		t.y = 900.12;
		t.elementsContent = [this.fireText_i(),this.fireBtn_i()];
		return t;
	};
	_proto.fireText_i = function () {
		var t = new eui.Label();
		this.fireText = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 24;
		t.text = "成功邀请6位好友即可解锁火火球哦（0/6）";
		t.textColor = 0x9382ff;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.fireBtn_i = function () {
		var t = new eui.Image();
		this.fireBtn = t;
		t.source = "btn_invite_2_png";
		t.touchEnabled = true;
		t.x = 87;
		t.y = 46;
		return t;
	};
	return myBallsSkin;
})(eui.Skin);generateEUI.paths['resource/modal/rankItem.exml'] = window.rankItemSkin = (function (_super) {
	__extends(rankItemSkin, _super);
	function rankItemSkin() {
		_super.call(this);
		this.skinParts = ["index","bestHat","headimgMask","headimg","nickName","score"];
		
		this.height = 86;
		this.minHeight = 50;
		this.minWidth = 100;
		this.width = 600;
		this.elementsContent = [this._Group1_i()];
		this.states = [
			new eui.State ("up",
				[
				])
			,
			new eui.State ("down",
				[
				])
			,
			new eui.State ("disabled",
				[
				])
		];
	}
	var _proto = rankItemSkin.prototype;

	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.percentHeight = 100;
		t.verticalCenter = 0;
		t.percentWidth = 100;
		t.x = 0;
		t.layout = this._BasicLayout1_i();
		t.elementsContent = [this.index_i(),this.bestHat_i(),this.headimgMask_i(),this.headimg_i(),this.nickName_i(),this.score_i(),this._Rect1_i()];
		return t;
	};
	_proto._BasicLayout1_i = function () {
		var t = new eui.BasicLayout();
		return t;
	};
	_proto.index_i = function () {
		var t = new eui.Label();
		this.index = t;
		t.anchorOffsetX = 0;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.italic = true;
		t.scaleX = 1;
		t.scaleY = 1;
		t.size = 32;
		t.text = "1";
		t.textAlign = "center";
		t.textColor = 0xffffff;
		t.verticalCenter = 0;
		t.width = 103;
		t.x = 0;
		return t;
	};
	_proto.bestHat_i = function () {
		var t = new eui.Image();
		this.bestHat = t;
		t.source = "icn_medal_01_png";
		t.verticalCenter = 0;
		t.visible = false;
		t.x = 25;
		return t;
	};
	_proto.headimgMask_i = function () {
		var t = new eui.Rect();
		this.headimgMask = t;
		t.ellipseWidth = 76;
		t.height = 70;
		t.strokeColor = 0xffffff;
		t.verticalCenter = 0;
		t.width = 70;
		t.x = 112;
		return t;
	};
	_proto.headimg_i = function () {
		var t = new eui.Image();
		this.headimg = t;
		t.height = 70;
		t.verticalCenter = 0;
		t.width = 70;
		t.x = 112;
		return t;
	};
	_proto.nickName_i = function () {
		var t = new eui.Label();
		this.nickName = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 26;
		t.size = 24;
		t.text = "";
		t.textColor = 0xfdddff;
		t.verticalCenter = 0;
		t.width = 175;
		t.x = 202;
		return t;
	};
	_proto.score_i = function () {
		var t = new eui.Label();
		this.score = t;
		t.anchorOffsetX = 0;
		t.fontFamily = "Microsoft YaHei";
		t.height = 28;
		t.rotation = 0.12;
		t.size = 32;
		t.text = "0";
		t.textAlign = "right";
		t.textColor = 0xffffff;
		t.verticalCenter = 0;
		t.width = 200;
		t.x = 350;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.anchorOffsetY = 0;
		t.fillColor = 0x888888;
		t.height = 1;
		t.horizontalCenter = 0;
		t.width = 600;
		t.y = 85;
		return t;
	};
	return rankItemSkin;
})(eui.Skin);generateEUI.paths['resource/modal/throughModal.exml'] = window.throughModalSkin = (function (_super) {
	__extends(throughModalSkin, _super);
	function throughModalSkin() {
		_super.call(this);
		this.skinParts = ["processMask","process","tap_1","tap_2","item_0","item_1","item_2"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.processMask_i(),this._Rect1_i(),this.process_i(),this._Label1_i(),this._Image1_i(),this.tap_1_i(),this.tap_2_i(),this.item_0_i(),this.item_1_i(),this.item_2_i()];
	}
	var _proto = throughModalSkin.prototype;

	_proto.processMask_i = function () {
		var t = new eui.Rect();
		this.processMask = t;
		t.anchorOffsetY = 0;
		t.ellipseHeight = 20;
		t.ellipseWidth = 20;
		t.height = 10;
		t.horizontalCenter = 0;
		t.width = 400;
		t.y = 274;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseHeight = 20;
		t.ellipseWidth = 20;
		t.fillAlpha = 0.2;
		t.fillColor = 0xFFFFFF;
		t.height = 10;
		t.horizontalCenter = 0;
		t.width = 400;
		t.y = 274;
		return t;
	};
	_proto.process_i = function () {
		var t = new eui.Rect();
		this.process = t;
		t.ellipseHeight = 20;
		t.ellipseWidth = 20;
		t.fillAlpha = 1;
		t.fillColor = 0xffffff;
		t.height = 10;
		t.horizontalCenter = 0;
		t.width = 400;
		t.y = 274;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "倒计时内，依次点亮";
		t.y = 217;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_click_png";
		t.y = 314;
		return t;
	};
	_proto.tap_1_i = function () {
		var t = new eui.Image();
		this.tap_1 = t;
		t.source = "btn_click_01_png";
		t.touchEnabled = true;
		t.x = 100;
		t.y = 1034;
		return t;
	};
	_proto.tap_2_i = function () {
		var t = new eui.Image();
		this.tap_2 = t;
		t.source = "btn_click_02_png";
		t.touchEnabled = true;
		t.x = 500;
		t.y = 1034;
		return t;
	};
	_proto.item_0_i = function () {
		var t = new eui.Image();
		this.item_0 = t;
		t.alpha = 0.3;
		t.source = "img_click_01_png";
		t.x = 208;
		t.y = 337.5;
		return t;
	};
	_proto.item_1_i = function () {
		var t = new eui.Image();
		this.item_1 = t;
		t.alpha = 0.3;
		t.horizontalCenter = 0;
		t.source = "img_click_01_png";
		t.y = 337.5;
		return t;
	};
	_proto.item_2_i = function () {
		var t = new eui.Image();
		this.item_2 = t;
		t.alpha = 0.3;
		t.source = "img_click_02_png";
		t.x = 468;
		t.y = 337.5;
		return t;
	};
	return throughModalSkin;
})(eui.Skin);generateEUI.paths['resource/modal/travelItem.exml'] = window.travelItemSkin = (function (_super) {
	__extends(travelItemSkin, _super);
	function travelItemSkin() {
		_super.call(this);
		this.skinParts = ["image","imgMask","title"];
		
		this.height = 160;
		this.width = 130;
		this.elementsContent = [this.image_i(),this.imgMask_i(),this.title_i()];
	}
	var _proto = travelItemSkin.prototype;

	_proto.image_i = function () {
		var t = new eui.Image();
		this.image = t;
		t.height = 120;
		t.horizontalCenter = 0;
		t.width = 120;
		t.y = 0;
		return t;
	};
	_proto.imgMask_i = function () {
		var t = new eui.Rect();
		this.imgMask = t;
		t.ellipseHeight = 50;
		t.ellipseWidth = 50;
		t.height = 120;
		t.horizontalCenter = 0;
		t.width = 120;
		t.y = 0;
		return t;
	};
	_proto.title_i = function () {
		var t = new eui.Label();
		this.title = t;
		t.fontFamily = "Microsoft YaHei";
		t.height = 25;
		t.horizontalCenter = 0;
		t.size = 22;
		t.text = "名字哇";
		t.textAlign = "center";
		t.textColor = 0xfbf6e3;
		t.verticalAlign = "middle";
		t.percentWidth = 100;
		t.y = 130.5;
		return t;
	};
	return travelItemSkin;
})(eui.Skin);generateEUI.paths['resource/modal/travelScene.exml'] = window.travelSceneSkin = (function (_super) {
	__extends(travelSceneSkin, _super);
	function travelSceneSkin() {
		_super.call(this);
		this.skinParts = ["content","scroller","closeBtn"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.scroller_i(),this.closeBtn_i()];
	}
	var _proto = travelSceneSkin.prototype;

	_proto.scroller_i = function () {
		var t = new eui.Scroller();
		this.scroller = t;
		t.anchorOffsetY = 0;
		t.height = 1334;
		t.width = 750;
		t.viewport = this._Group1_i();
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.elementsContent = [this.content_i()];
		return t;
	};
	_proto.content_i = function () {
		var t = new eui.Group();
		this.content = t;
		t.height = 2400;
		t.width = 750;
		t.elementsContent = [this._Image1_i(),this._Image2_i(),this._Label1_i(),this._Label2_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "img_bg_imprinting_top_png";
		t.top = 0;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_imprinting_bottom_png";
		t.y = 1314;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 24;
		t.text = "游戏中会收获球球精灵的专属印记";
		t.textColor = 0xbeb3ff;
		t.y = 267;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0.5;
		t.size = 24;
		t.text = "成功收集4个不同的印记，将会获得能量果作为奖励";
		t.textColor = 0xbeb3ff;
		t.y = 305.76;
		return t;
	};
	_proto.closeBtn_i = function () {
		var t = new eui.Image();
		this.closeBtn = t;
		t.source = "bnt_home_png";
		t.touchEnabled = true;
		t.x = 28;
		t.y = 58;
		return t;
	};
	return travelSceneSkin;
})(eui.Skin);generateEUI.paths['resource/modal/tryModal.exml'] = window.tryModalSkin = (function (_super) {
	__extends(tryModalSkin, _super);
	function tryModalSkin() {
		_super.call(this);
		this.skinParts = ["ballImg","sureBtn","ignoreBtn"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._grayBg1_i(),this._Image1_i(),this.ballImg_i(),this.sureBtn_i(),this.ignoreBtn_i()];
	}
	var _proto = tryModalSkin.prototype;

	_proto._grayBg1_i = function () {
		var t = new grayBg();
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_text_11_png";
		t.y = 238;
		return t;
	};
	_proto.ballImg_i = function () {
		var t = new eui.Image();
		this.ballImg = t;
		t.source = "img_elf_02_png";
		t.x = 256;
		t.y = 476;
		return t;
	};
	_proto.sureBtn_i = function () {
		var t = new eui.Image();
		this.sureBtn = t;
		t.horizontalCenter = 0;
		t.source = "btn_feed_png";
		t.touchEnabled = true;
		t.y = 756;
		return t;
	};
	_proto.ignoreBtn_i = function () {
		var t = new eui.Label();
		this.ignoreBtn = t;
		t.horizontalCenter = 0;
		t.text = "不了>";
		t.textColor = 0x9382ff;
		t.touchEnabled = true;
		t.y = 892;
		return t;
	};
	return tryModalSkin;
})(eui.Skin);generateEUI.paths['resource/page/circle.exml'] = window.circleSkin = (function (_super) {
	__extends(circleSkin, _super);
	function circleSkin() {
		_super.call(this);
		this.skinParts = ["img_6","img_5","img_7","img_4","img_8","img_3","img_9","img_2","img_10","img_1","img_11","img_0"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this._Group1_i()];
	}
	var _proto = circleSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "bg_1_jpg";
		t.top = 0;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 300;
		t.anchorOffsetY = 300;
		t.height = 600;
		t.horizontalCenter = 0;
		t.width = 600;
		t.y = 600;
		t.elementsContent = [this.img_6_i(),this.img_5_i(),this.img_7_i(),this.img_4_i(),this.img_8_i(),this.img_3_i(),this.img_9_i(),this.img_2_i(),this.img_10_i(),this.img_1_i(),this.img_11_i(),this.img_0_i()];
		return t;
	};
	_proto.img_6_i = function () {
		var t = new eui.Image();
		this.img_6 = t;
		t.anchorOffsetX = 72;
		t.anchorOffsetY = 59;
		t.rotation = 0;
		t.scaleX = 0.35;
		t.scaleY = 0.35;
		t.source = "";
		t.x = 306;
		t.y = 287;
		return t;
	};
	_proto.img_5_i = function () {
		var t = new eui.Image();
		this.img_5 = t;
		t.anchorOffsetX = 72;
		t.anchorOffsetY = 59;
		t.rotation = 0;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "";
		t.x = 190;
		t.y = 295;
		return t;
	};
	_proto.img_7_i = function () {
		var t = new eui.Image();
		this.img_7 = t;
		t.anchorOffsetX = 72;
		t.anchorOffsetY = 59;
		t.rotation = 0;
		t.scaleX = 0.4;
		t.scaleY = 0.4;
		t.source = "";
		t.x = 406;
		t.y = 295;
		return t;
	};
	_proto.img_4_i = function () {
		var t = new eui.Image();
		this.img_4 = t;
		t.anchorOffsetX = 72;
		t.anchorOffsetY = 59;
		t.rotation = 0;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.source = "";
		t.x = 94;
		t.y = 313;
		return t;
	};
	_proto.img_8_i = function () {
		var t = new eui.Image();
		this.img_8 = t;
		t.anchorOffsetX = 72;
		t.anchorOffsetY = 59;
		t.rotation = 0;
		t.scaleX = 0.5;
		t.scaleY = 0.5;
		t.source = "";
		t.x = 506;
		t.y = 313;
		return t;
	};
	_proto.img_3_i = function () {
		var t = new eui.Image();
		this.img_3 = t;
		t.anchorOffsetX = 72;
		t.anchorOffsetY = 59;
		t.rotation = 0;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.source = "";
		t.x = 28;
		t.y = 363;
		return t;
	};
	_proto.img_9_i = function () {
		var t = new eui.Image();
		this.img_9 = t;
		t.anchorOffsetX = 72;
		t.anchorOffsetY = 59;
		t.rotation = 0;
		t.scaleX = 0.6;
		t.scaleY = 0.6;
		t.source = "";
		t.x = 576;
		t.y = 363;
		return t;
	};
	_proto.img_2_i = function () {
		var t = new eui.Image();
		this.img_2 = t;
		t.anchorOffsetX = 72;
		t.anchorOffsetY = 59;
		t.rotation = 0;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.source = "";
		t.x = 44;
		t.y = 431;
		return t;
	};
	_proto.img_10_i = function () {
		var t = new eui.Image();
		this.img_10 = t;
		t.anchorOffsetX = 72;
		t.anchorOffsetY = 59;
		t.rotation = 0;
		t.scaleX = 0.7;
		t.scaleY = 0.7;
		t.source = "";
		t.x = 562;
		t.y = 431;
		return t;
	};
	_proto.img_1_i = function () {
		var t = new eui.Image();
		this.img_1 = t;
		t.anchorOffsetX = 72;
		t.anchorOffsetY = 59;
		t.rotation = 0;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "";
		t.x = 138;
		t.y = 471;
		return t;
	};
	_proto.img_11_i = function () {
		var t = new eui.Image();
		this.img_11 = t;
		t.anchorOffsetX = 72;
		t.anchorOffsetY = 59;
		t.rotation = 0;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "";
		t.x = 464;
		t.y = 471;
		return t;
	};
	_proto.img_0_i = function () {
		var t = new eui.Image();
		this.img_0 = t;
		t.anchorOffsetX = 72;
		t.anchorOffsetY = 59;
		t.rotation = 0;
		t.source = "";
		t.x = 300;
		t.y = 471;
		return t;
	};
	return circleSkin;
})(eui.Skin);generateEUI.paths['resource/page/common.exml'] = window.commonSkin = (function (_super) {
	__extends(commonSkin, _super);
	function commonSkin() {
		_super.call(this);
		this.skinParts = ["bee","buildingGroup"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.bee_i(),this.buildingGroup_i()];
	}
	var _proto = commonSkin.prototype;

	_proto.bee_i = function () {
		var t = new eui.Image();
		this.bee = t;
		t.source = "";
		t.x = 323;
		t.y = 200;
		return t;
	};
	_proto.buildingGroup_i = function () {
		var t = new eui.Group();
		this.buildingGroup = t;
		t.percentHeight = 100;
		t.left = 0;
		t.top = 0;
		t.percentWidth = 100;
		return t;
	};
	return commonSkin;
})(eui.Skin);generateEUI.paths['resource/page/gameOver.exml'] = window.gameOverSkin = (function (_super) {
	__extends(gameOverSkin, _super);
	var gameOverSkin$Skin11 = 	(function (_super) {
		__extends(gameOverSkin$Skin11, _super);
		function gameOverSkin$Skin11() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = gameOverSkin$Skin11.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_receive_07_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return gameOverSkin$Skin11;
	})(eui.Skin);

	var gameOverSkin$Skin12 = 	(function (_super) {
		__extends(gameOverSkin$Skin12, _super);
		function gameOverSkin$Skin12() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = gameOverSkin$Skin12.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_receive_08_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return gameOverSkin$Skin12;
	})(eui.Skin);

	function gameOverSkin() {
		_super.call(this);
		this.skinParts = ["scoreText","homeBtn","travelBtn","newTip","energyAddImg","energyNum","getEnergy","doubleNum","doubleEnergy","titleText","again","shareBtn","openBall","mask_1","more_1","text_1","group_0","mask_0","more_0","text_0","group_1","proBar","centerImg","degree_0","degree_1","degree_2","head","headMask","headGroup","percentText","proGroup"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._grayBg1_i(),this.scoreText_i(),this.homeBtn_i(),this.travelBtn_i(),this.newTip_i(),this.energyAddImg_i(),this.getEnergy_i(),this.doubleEnergy_i(),this.titleText_i(),this.again_i(),this.shareBtn_i(),this.openBall_i(),this.group_0_i(),this.group_1_i(),this._Group1_i()];
	}
	var _proto = gameOverSkin.prototype;

	_proto._grayBg1_i = function () {
		var t = new grayBg();
		return t;
	};
	_proto.scoreText_i = function () {
		var t = new eui.Label();
		this.scoreText = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "0";
		t.y = 258;
		return t;
	};
	_proto.homeBtn_i = function () {
		var t = new eui.Image();
		this.homeBtn = t;
		t.source = "bnt_home_png";
		t.touchEnabled = false;
		t.x = 21;
		t.y = 60;
		return t;
	};
	_proto.travelBtn_i = function () {
		var t = new eui.Image();
		this.travelBtn = t;
		t.source = "btn_imprinting_png";
		t.x = 151;
		t.y = 46;
		return t;
	};
	_proto.newTip_i = function () {
		var t = new eui.Image();
		this.newTip = t;
		t.source = "img_label_02_png";
		t.visible = false;
		t.x = 226;
		t.y = 36;
		return t;
	};
	_proto.energyAddImg_i = function () {
		var t = new eui.Image();
		this.energyAddImg = t;
		t.source = "img_label_03_png";
		t.touchEnabled = false;
		t.visible = false;
		t.x = 146;
		t.y = -1;
		return t;
	};
	_proto.getEnergy_i = function () {
		var t = new eui.Group();
		this.getEnergy = t;
		t.x = 101;
		t.y = 494;
		t.elementsContent = [this._Image1_i(),this.energyNum_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "img_gift_a1_over_png";
		t.x = 0;
		return t;
	};
	_proto.energyNum_i = function () {
		var t = new eui.Label();
		this.energyNum = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0.5;
		t.size = 28;
		t.text = "50";
		t.textColor = 0xffea00;
		t.y = 284;
		return t;
	};
	_proto.doubleEnergy_i = function () {
		var t = new eui.Group();
		this.doubleEnergy = t;
		t.x = 400;
		t.y = 494;
		t.elementsContent = [this._Image2_i(),this._Image3_i(),this._Image4_i(),this.doubleNum_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.source = "img_gift_a2_over_png";
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.anchorOffsetX = 125;
		t.anchorOffsetY = 125;
		t.horizontalCenter = 0;
		t.source = "gif_light_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_gift_a3_over_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.doubleNum_i = function () {
		var t = new eui.Label();
		this.doubleNum = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "50 x ?";
		t.textColor = 0xFFEA00;
		t.y = 284;
		return t;
	};
	_proto.titleText_i = function () {
		var t = new eui.Label();
		this.titleText = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.size = 44;
		t.text = "继续加油";
		t.x = 286;
		t.y = 162;
		return t;
	};
	_proto.again_i = function () {
		var t = new eui.Button();
		this.again = t;
		t.label = "";
		t.x = 61;
		t.y = 945;
		t.skinName = gameOverSkin$Skin11;
		return t;
	};
	_proto.shareBtn_i = function () {
		var t = new eui.Image();
		this.shareBtn = t;
		t.horizontalCenter = 0;
		t.source = "btn_pk_png";
		t.y = 903;
		return t;
	};
	_proto.openBall_i = function () {
		var t = new eui.Button();
		this.openBall = t;
		t.label = "";
		t.touchEnabled = true;
		t.x = 460;
		t.y = 945;
		t.skinName = gameOverSkin$Skin12;
		return t;
	};
	_proto.group_0_i = function () {
		var t = new eui.Group();
		this.group_0 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 60;
		t.height = 150;
		t.width = 120;
		t.x = 100;
		t.y = 223;
		t.elementsContent = [this.mask_1_i(),this.more_1_i(),this.text_1_i()];
		return t;
	};
	_proto.mask_1_i = function () {
		var t = new eui.Rect();
		this.mask_1 = t;
		t.ellipseHeight = 40;
		t.ellipseWidth = 40;
		t.height = 120;
		t.horizontalCenter = 0;
		t.top = 0;
		t.width = 120;
		return t;
	};
	_proto.more_1_i = function () {
		var t = new eui.Image();
		this.more_1 = t;
		t.height = 120;
		t.top = 0;
		t.width = 120;
		return t;
	};
	_proto.text_1_i = function () {
		var t = new eui.Label();
		this.text_1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 24;
		t.text = "";
		t.y = 124;
		return t;
	};
	_proto.group_1_i = function () {
		var t = new eui.Group();
		this.group_1 = t;
		t.anchorOffsetX = 60;
		t.anchorOffsetY = 64.55;
		t.height = 150;
		t.width = 120;
		t.x = 650;
		t.y = 227.55;
		t.elementsContent = [this.mask_0_i(),this.more_0_i(),this.text_0_i()];
		return t;
	};
	_proto.mask_0_i = function () {
		var t = new eui.Rect();
		this.mask_0 = t;
		t.ellipseHeight = 40;
		t.ellipseWidth = 40;
		t.height = 120;
		t.horizontalCenter = 0;
		t.top = 0;
		t.width = 120;
		return t;
	};
	_proto.more_0_i = function () {
		var t = new eui.Image();
		this.more_0 = t;
		t.height = 120;
		t.width = 120;
		return t;
	};
	_proto.text_0_i = function () {
		var t = new eui.Label();
		this.text_0 = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 24;
		t.text = "";
		t.y = 124;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.cacheAsBitmap = true;
		t.height = 96;
		t.horizontalCenter = 0;
		t.width = 620;
		t.y = 346;
		t.elementsContent = [this._Rect1_i(),this.proBar_i(),this._Image5_i(),this.centerImg_i(),this._Image6_i(),this.degree_0_i(),this.degree_1_i(),this.degree_2_i(),this.headGroup_i(),this.proGroup_i()];
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.fillAlpha = 0.7;
		t.height = 14;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 560;
		return t;
	};
	_proto.proBar_i = function () {
		var t = new eui.Rect();
		this.proBar = t;
		t.fillColor = 0xffffff;
		t.height = 14;
		t.horizontalCenter = 0;
		t.verticalCenter = 0;
		t.width = 560;
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.left = 0;
		t.source = "img_bg_steps_01_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.centerImg_i = function () {
		var t = new eui.Image();
		this.centerImg = t;
		t.horizontalCenter = 0;
		t.source = "img_bg_steps_02_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.right = 0;
		t.source = "img_bg_steps_02_png";
		t.verticalCenter = 0;
		return t;
	};
	_proto.degree_0_i = function () {
		var t = new eui.Label();
		this.degree_0 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 20;
		t.text = "二阶";
		t.x = 9;
		t.y = 28;
		return t;
	};
	_proto.degree_1_i = function () {
		var t = new eui.Label();
		this.degree_1 = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "二阶";
		t.y = 28;
		return t;
	};
	_proto.degree_2_i = function () {
		var t = new eui.Label();
		this.degree_2 = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 20;
		t.text = "二阶";
		t.x = 570;
		t.y = 28;
		return t;
	};
	_proto.headGroup_i = function () {
		var t = new eui.Group();
		this.headGroup = t;
		t.x = 0;
		t.y = -62;
		t.elementsContent = [this._Image7_i(),this.head_i(),this.headMask_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "img_bg_head_2_png";
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.head_i = function () {
		var t = new eui.Image();
		this.head = t;
		t.height = 50;
		t.source = "";
		t.width = 50;
		return t;
	};
	_proto.headMask_i = function () {
		var t = new eui.Rect();
		this.headMask = t;
		t.ellipseWidth = 50;
		t.height = 50;
		t.horizontalCenter = 0;
		t.width = 50;
		t.y = 4;
		return t;
	};
	_proto.proGroup_i = function () {
		var t = new eui.Group();
		this.proGroup = t;
		t.y = 84;
		t.elementsContent = [this._Image8_i(),this.percentText_i()];
		return t;
	};
	_proto._Image8_i = function () {
		var t = new eui.Image();
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "img_frame_digital_png";
		return t;
	};
	_proto.percentText_i = function () {
		var t = new eui.Label();
		this.percentText = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 20;
		t.text = "100%";
		t.y = 12;
		return t;
	};
	return gameOverSkin;
})(eui.Skin);generateEUI.paths['resource/page/rank.exml'] = window.rankSkin = (function (_super) {
	__extends(rankSkin, _super);
	var rankSkin$Skin13 = 	(function (_super) {
		__extends(rankSkin$Skin13, _super);
		function rankSkin$Skin13() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = rankSkin$Skin13.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "bnt_home_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return rankSkin$Skin13;
	})(eui.Skin);

	function rankSkin() {
		_super.call(this);
		this.skinParts = ["bgImg","friendGroup","worldGroup","friend","world","lastPage","nextPage","pageText","goHome"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.bgImg_i(),this._Image1_i(),this.friendGroup_i(),this.worldGroup_i(),this._Group1_i(),this._Group2_i(),this.goHome_i()];
	}
	var _proto = rankSkin.prototype;

	_proto.bgImg_i = function () {
		var t = new eui.Image();
		this.bgImg = t;
		t.height = 1334;
		t.source = "img_bg_ranking_01_png";
		t.width = 750;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_ranking_02_png";
		t.y = 276;
		return t;
	};
	_proto.friendGroup_i = function () {
		var t = new eui.Group();
		this.friendGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.height = 780;
		t.horizontalCenter = 0;
		t.width = 600;
		t.y = 276;
		return t;
	};
	_proto.worldGroup_i = function () {
		var t = new eui.Group();
		this.worldGroup = t;
		t.anchorOffsetX = 0;
		t.anchorOffsetY = 0;
		t.cacheAsBitmap = true;
		t.height = 588;
		t.horizontalCenter = 0;
		t.visible = false;
		t.width = 600;
		t.y = 388;
		return t;
	};
	_proto._Group1_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.horizontalCenter = 0;
		t.width = 470;
		t.y = 296;
		t.elementsContent = [this.friend_i(),this.world_i()];
		return t;
	};
	_proto.friend_i = function () {
		var t = new eui.Image();
		this.friend = t;
		t.left = 0;
		t.source = "img_tittle_a1_png";
		t.touchEnabled = true;
		t.verticalCenter = 0;
		return t;
	};
	_proto.world_i = function () {
		var t = new eui.Image();
		this.world = t;
		t.right = 0;
		t.source = "img_tittle_b2_png";
		t.touchEnabled = true;
		t.verticalCenter = 0;
		return t;
	};
	_proto._Group2_i = function () {
		var t = new eui.Group();
		t.anchorOffsetX = 0;
		t.horizontalCenter = -0.5;
		t.width = 197.19;
		t.y = 995.41;
		t.elementsContent = [this.lastPage_i(),this.nextPage_i(),this.pageText_i()];
		return t;
	};
	_proto.lastPage_i = function () {
		var t = new eui.Image();
		this.lastPage = t;
		t.left = 0;
		t.source = "img_switch_left_png";
		t.top = 0;
		return t;
	};
	_proto.nextPage_i = function () {
		var t = new eui.Image();
		this.nextPage = t;
		t.right = 0;
		t.source = "img_switch_right_png";
		t.top = 0;
		return t;
	};
	_proto.pageText_i = function () {
		var t = new eui.Label();
		this.pageText = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "1 / 2";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.goHome_i = function () {
		var t = new eui.Button();
		this.goHome = t;
		t.label = "";
		t.x = 22;
		t.y = 58;
		t.skinName = rankSkin$Skin13;
		return t;
	};
	return rankSkin;
})(eui.Skin);generateEUI.paths['resource/page/reborn.exml'] = window.rebornSkin = (function (_super) {
	__extends(rebornSkin, _super);
	function rebornSkin() {
		_super.call(this);
		this.skinParts = ["bgImg","scoreText","timing","rebornBtn","ignoreBtn","surpassGroup"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.bgImg_i(),this._Label1_i(),this._Rect1_i(),this._Label2_i(),this.scoreText_i(),this._Image1_i(),this.timing_i(),this.rebornBtn_i(),this.ignoreBtn_i(),this.surpassGroup_i()];
	}
	var _proto = rebornSkin.prototype;

	_proto.bgImg_i = function () {
		var t = new eui.Image();
		this.bgImg = t;
		t.height = 1334;
		t.source = "img_bg_revival_jpg";
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 24;
		t.text = "失足跌落，当前得分";
		t.y = 152;
		return t;
	};
	_proto._Rect1_i = function () {
		var t = new eui.Rect();
		t.ellipseWidth = 150;
		t.fillAlpha = 0.2;
		t.height = 110;
		t.horizontalCenter = 0;
		t.width = 600;
		t.y = 270;
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.size = 28;
		t.text = "哎呀，差一点就超越好友啦";
		t.textColor = 0xab9dff;
		t.x = 138;
		t.y = 310.86;
		return t;
	};
	_proto.scoreText_i = function () {
		var t = new eui.Label();
		this.scoreText = t;
		t.bold = true;
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "0";
		t.textColor = 0xffffff;
		t.y = 205;
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_bg_time_png";
		t.y = 415;
		return t;
	};
	_proto.timing_i = function () {
		var t = new eui.Image();
		this.timing = t;
		t.horizontalCenter = 0;
		t.source = "img_time_05_png";
		t.y = 559;
		return t;
	};
	_proto.rebornBtn_i = function () {
		var t = new eui.Image();
		this.rebornBtn = t;
		t.horizontalCenter = 0;
		t.source = "btn_revival_png";
		t.touchEnabled = true;
		t.y = 872;
		return t;
	};
	_proto.ignoreBtn_i = function () {
		var t = new eui.Label();
		this.ignoreBtn = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 28;
		t.text = "不了>";
		t.textColor = 0xab9dff;
		t.visible = false;
		t.y = 995;
		return t;
	};
	_proto.surpassGroup_i = function () {
		var t = new eui.Group();
		this.surpassGroup = t;
		t.height = 80;
		t.width = 80;
		t.x = 535;
		t.y = 286;
		return t;
	};
	return rebornSkin;
})(eui.Skin);generateEUI.paths['resource/page/runningScene.exml'] = window.runningSceneSkin = (function (_super) {
	__extends(runningSceneSkin, _super);
	var runningSceneSkin$Skin14 = 	(function (_super) {
		__extends(runningSceneSkin$Skin14, _super);
		function runningSceneSkin$Skin14() {
			_super.call(this);
			this.skinParts = ["labelDisplay"];
			
			this.elementsContent = [this._Image1_i(),this.labelDisplay_i()];
			this.states = [
				new eui.State ("up",
					[
					])
				,
				new eui.State ("down",
					[
					])
				,
				new eui.State ("disabled",
					[
					])
			];
		}
		var _proto = runningSceneSkin$Skin14.prototype;

		_proto._Image1_i = function () {
			var t = new eui.Image();
			t.percentHeight = 100;
			t.source = "btn_jump_png";
			t.percentWidth = 100;
			return t;
		};
		_proto.labelDisplay_i = function () {
			var t = new eui.Label();
			this.labelDisplay = t;
			t.horizontalCenter = 0;
			t.verticalCenter = 0;
			return t;
		};
		return runningSceneSkin$Skin14;
	})(eui.Skin);

	function runningSceneSkin() {
		_super.call(this);
		this.skinParts = ["scoreText","perfectText","perfectGroup","flowerGroup","startBg","ballText","startImg","startTips","startBtn"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this._Image1_i(),this.scoreText_i(),this.perfectGroup_i(),this.flowerGroup_i(),this.startBg_i(),this.ballText_i(),this.startImg_i(),this.startTips_i(),this.startBtn_i()];
	}
	var _proto = runningSceneSkin.prototype;

	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_cloud_png";
		t.top = 0;
		t.touchEnabled = false;
		return t;
	};
	_proto.scoreText_i = function () {
		var t = new eui.Label();
		this.scoreText = t;
		t.horizontalCenter = 0;
		t.size = 80;
		t.text = "";
		t.touchEnabled = false;
		t.y = 61;
		return t;
	};
	_proto.perfectGroup_i = function () {
		var t = new eui.Group();
		this.perfectGroup = t;
		t.anchorOffsetX = 205;
		t.anchorOffsetY = 70;
		t.height = 140;
		t.horizontalCenter = 0.5;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.visible = false;
		t.width = 410;
		t.y = 230;
		t.elementsContent = [this._Image2_i(),this.perfectText_i()];
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.scaleX = 1;
		t.scaleY = 1;
		t.source = "continue_bg_png";
		t.verticalCenter = 0;
		t.visible = false;
		return t;
	};
	_proto.perfectText_i = function () {
		var t = new eui.Label();
		this.perfectText = t;
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 60;
		t.text = "Combo x3";
		t.verticalCenter = 0;
		return t;
	};
	_proto.flowerGroup_i = function () {
		var t = new eui.Group();
		this.flowerGroup = t;
		t.height = 1334;
		t.touchChildren = false;
		t.touchEnabled = false;
		t.touchThrough = false;
		t.width = 750;
		return t;
	};
	_proto.startBg_i = function () {
		var t = new grayBg();
		this.startBg = t;
		t.touchEnabled = false;
		return t;
	};
	_proto.ballText_i = function () {
		var t = new eui.Label();
		this.ballText = t;
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.text = "白白球";
		t.textColor = 0xffffff;
		t.visible = false;
		t.y = 203;
		return t;
	};
	_proto.startImg_i = function () {
		var t = new eui.Image();
		this.startImg = t;
		t.horizontalCenter = 0;
		t.source = "img_bg_base_01_png";
		t.y = 171.56;
		return t;
	};
	_proto.startTips_i = function () {
		var t = new eui.Group();
		this.startTips = t;
		t.alpha = 0;
		t.horizontalCenter = 0;
		t.y = 699.67;
		t.elementsContent = [this._Label1_i(),this._Label2_i(),this._Label3_i()];
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 30;
		t.text = "【小提示】";
		return t;
	};
	_proto._Label2_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 30;
		t.text = "踩中光圈可以连击得分";
		t.y = 59.7;
		return t;
	};
	_proto._Label3_i = function () {
		var t = new eui.Label();
		t.fontFamily = "Microsoft YaHei";
		t.horizontalCenter = 0;
		t.size = 30;
		t.text = "获得更多能量果";
		t.y = 116.37;
		return t;
	};
	_proto.startBtn_i = function () {
		var t = new eui.Button();
		this.startBtn = t;
		t.anchorOffsetX = 150;
		t.anchorOffsetY = 150;
		t.horizontalCenter = 0;
		t.label = "";
		t.visible = false;
		t.y = 1060;
		t.skinName = runningSceneSkin$Skin14;
		return t;
	};
	return runningSceneSkin;
})(eui.Skin);generateEUI.paths['resource/page/startScene.exml'] = window.startSceneSkin = (function (_super) {
	__extends(startSceneSkin, _super);
	function startSceneSkin() {
		_super.call(this);
		this.skinParts = ["bgImg","goldText","goldImg","addGold","collection","circle_light","tryImg","tryName","tryBtn","friendBtn","energyBtn","currentBall","tryTip","energyAddGroup","startBtn","houseBtn","travelBtn","rankBtn","shareBtn","houseTip","travelTip","shareTip","energyTip","touchRect"];
		
		this.height = 1334;
		this.width = 750;
		this.elementsContent = [this.bgImg_i(),this.addGold_i(),this.collection_i(),this._Image2_i(),this.circle_light_i(),this._Image3_i(),this._Image4_i(),this.tryBtn_i(),this.friendBtn_i(),this.energyBtn_i(),this.currentBall_i(),this.tryTip_i(),this.energyAddGroup_i(),this.startBtn_i(),this.houseBtn_i(),this.travelBtn_i(),this.rankBtn_i(),this.shareBtn_i(),this.houseTip_i(),this.travelTip_i(),this.shareTip_i(),this.energyTip_i(),this.touchRect_i()];
	}
	var _proto = startSceneSkin.prototype;

	_proto.bgImg_i = function () {
		var t = new eui.Image();
		this.bgImg = t;
		t.anchorOffsetY = 0;
		t.left = 0;
		t.source = "img_bg_home_01_png";
		t.top = 0;
		return t;
	};
	_proto.addGold_i = function () {
		var t = new eui.Group();
		this.addGold = t;
		t.touchEnabled = true;
		t.x = 38.38;
		t.y = 45;
		t.elementsContent = [this._Image1_i(),this.goldText_i(),this.goldImg_i()];
		return t;
	};
	_proto._Image1_i = function () {
		var t = new eui.Image();
		t.source = "img_bg_fruit_number_png";
		t.touchEnabled = true;
		t.x = 0;
		t.y = 0;
		return t;
	};
	_proto.goldText_i = function () {
		var t = new eui.Label();
		this.goldText = t;
		t.fontFamily = "Microsoft YaHei";
		t.size = 26;
		t.text = "40";
		t.textAlign = "center";
		t.verticalAlign = "middle";
		t.width = 100;
		t.x = 52.31;
		t.y = 21.56;
		return t;
	};
	_proto.goldImg_i = function () {
		var t = new eui.Image();
		this.goldImg = t;
		t.anchorOffsetX = 30;
		t.anchorOffsetY = 30;
		t.source = "img_moer_01_png";
		t.x = 167;
		t.y = 36;
		return t;
	};
	_proto.collection_i = function () {
		var t = new eui.Image();
		this.collection = t;
		t.source = "img_collect_png";
		t.x = 244;
		t.y = 24;
		return t;
	};
	_proto._Image2_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0;
		t.source = "img_game_tittle_png";
		t.y = 147;
		return t;
	};
	_proto.circle_light_i = function () {
		var t = new eui.Image();
		this.circle_light = t;
		t.anchorOffsetX = 193;
		t.anchorOffsetY = 193;
		t.horizontalCenter = 0;
		t.source = "img_aperture_png";
		t.y = 413;
		return t;
	};
	_proto._Image3_i = function () {
		var t = new eui.Image();
		t.horizontalCenter = 0.5;
		t.source = "img_bg_home_02_png";
		t.y = 383.97;
		return t;
	};
	_proto._Image4_i = function () {
		var t = new eui.Image();
		t.source = "img_bg_game_png";
		t.y = 284;
		return t;
	};
	_proto.tryBtn_i = function () {
		var t = new eui.Group();
		this.tryBtn = t;
		t.anchorOffsetX = 63;
		t.anchorOffsetY = 81;
		t.height = 162;
		t.touchEnabled = true;
		t.x = 663;
		t.y = 359.5;
		t.elementsContent = [this._Image5_i(),this.tryImg_i(),this._Image6_i(),this.tryName_i()];
		return t;
	};
	_proto._Image5_i = function () {
		var t = new eui.Image();
		t.source = "img_bg_play_try_png";
		t.y = 6;
		return t;
	};
	_proto.tryImg_i = function () {
		var t = new eui.Image();
		this.tryImg = t;
		t.height = 110;
		t.horizontalCenter = 1;
		t.source = "";
		t.width = 110;
		t.y = 12;
		return t;
	};
	_proto._Image6_i = function () {
		var t = new eui.Image();
		t.source = "img_play_try_png";
		t.y = 9;
		return t;
	};
	_proto.tryName_i = function () {
		var t = new eui.Image();
		this.tryName = t;
		t.bottom = 0;
		t.horizontalCenter = 0;
		t.scaleX = 0.8;
		t.scaleY = 0.8;
		t.source = "";
		return t;
	};
	_proto.friendBtn_i = function () {
		var t = new eui.Image();
		this.friendBtn = t;
		t.source = "icn_home_05_png";
		t.touchEnabled = true;
		t.x = 616;
		t.y = 459;
		return t;
	};
	_proto.energyBtn_i = function () {
		var t = new eui.Image();
		this.energyBtn = t;
		t.source = "icn_home_06_png";
		t.touchEnabled = true;
		t.x = 616;
		t.y = 617;
		return t;
	};
	_proto.currentBall_i = function () {
		var t = new eui.Image();
		this.currentBall = t;
		t.blendMode = "normal";
		t.horizontalCenter = 0;
		t.source = "img_elf_02_png";
		t.y = 321;
		return t;
	};
	_proto.tryTip_i = function () {
		var t = new eui.Image();
		this.tryTip = t;
		t.horizontalCenter = 0;
		t.source = "tryTip_png";
		t.visible = false;
		t.y = 589;
		return t;
	};
	_proto.energyAddGroup_i = function () {
		var t = new eui.Group();
		this.energyAddGroup = t;
		t.horizontalCenter = 0;
		t.visible = false;
		t.y = 658;
		t.elementsContent = [this._Image7_i(),this._Label1_i()];
		return t;
	};
	_proto._Image7_i = function () {
		var t = new eui.Image();
		t.source = "img_fruit_small_png";
		t.verticalCenter = 0;
		t.x = 0;
		return t;
	};
	_proto._Label1_i = function () {
		var t = new eui.Label();
		t.bold = true;
		t.fontFamily = "Microsoft YaHei";
		t.size = 22;
		t.text = "能量果加成：10%";
		t.textColor = 0xfffc01;
		t.verticalCenter = 0;
		t.x = 28;
		return t;
	};
	_proto.startBtn_i = function () {
		var t = new eui.Image();
		this.startBtn = t;
		t.anchorOffsetX = 147.5;
		t.anchorOffsetY = 50.5;
		t.horizontalCenter = 0;
		t.source = "btn_start_png";
		t.touchEnabled = true;
		t.y = 805;
		return t;
	};
	_proto.houseBtn_i = function () {
		var t = new eui.Image();
		this.houseBtn = t;
		t.source = "icn_home_01_png";
		t.touchEnabled = true;
		t.x = 60;
		t.y = 893;
		return t;
	};
	_proto.travelBtn_i = function () {
		var t = new eui.Image();
		this.travelBtn = t;
		t.source = "icn_home_02_png";
		t.touchEnabled = true;
		t.x = 230;
		t.y = 893;
		return t;
	};
	_proto.rankBtn_i = function () {
		var t = new eui.Image();
		this.rankBtn = t;
		t.source = "icn_home_03_png";
		t.touchEnabled = true;
		t.x = 400;
		t.y = 893;
		return t;
	};
	_proto.shareBtn_i = function () {
		var t = new eui.Image();
		this.shareBtn = t;
		t.source = "icn_home_04_png";
		t.touchEnabled = true;
		t.x = 570;
		t.y = 893;
		return t;
	};
	_proto.houseTip_i = function () {
		var t = new eui.Image();
		this.houseTip = t;
		t.source = "img_label_01_png";
		t.x = 144;
		t.y = 883;
		return t;
	};
	_proto.travelTip_i = function () {
		var t = new eui.Image();
		this.travelTip = t;
		t.source = "img_label_02_png";
		t.x = 324;
		t.y = 883;
		return t;
	};
	_proto.shareTip_i = function () {
		var t = new eui.Image();
		this.shareTip = t;
		t.source = "img_label_03_png";
		t.x = 598;
		t.y = 883;
		return t;
	};
	_proto.energyTip_i = function () {
		var t = new eui.Image();
		this.energyTip = t;
		t.source = "img_label_04_png";
		t.x = 673;
		t.y = 607;
		return t;
	};
	_proto.touchRect_i = function () {
		var t = new eui.Rect();
		this.touchRect = t;
		t.fillAlpha = 0;
		t.fillColor = 0xffffff;
		t.height = 1334;
		t.strokeAlpha = 1;
		t.touchEnabled = true;
		t.width = 750;
		t.x = -1.52;
		return t;
	};
	return startSceneSkin;
})(eui.Skin);