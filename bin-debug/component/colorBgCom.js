var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var colorBgCom = (function (_super) {
    __extends(colorBgCom, _super);
    function colorBgCom(currentTheme) {
        if (currentTheme === void 0) { currentTheme = 1; }
        var _this = _super.call(this) || this;
        _this.currentTheme = 1; //当前主题 从1开始
        _this.currentTheme = currentTheme;
        return _this;
    }
    colorBgCom.getInstance = function (currentTheme) {
        if (currentTheme === void 0) { currentTheme = 1; }
        if (!colorBgCom.shared) {
            colorBgCom.shared = new colorBgCom(currentTheme);
        }
        return colorBgCom.shared;
    };
    colorBgCom.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    colorBgCom.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    colorBgCom.prototype.init = function () {
        colorBgCom.stageHeight = this.stage.stageHeight;
        this.addChild(colorBgCom.bgLinear);
        this.changeTheme(this.currentTheme);
    };
    colorBgCom.prototype.changeTheme = function (currentTheme) {
        var stageHeight = colorBgCom.stageHeight;
        var theme = randomTheme.getInstance().degreeThemeArr[currentTheme - 1];
        colorBgCom.bgLinear.graphics.clear();
        var matix = colorBgCom.bgLinear.matrix;
        matix.createGradientBox(750 / 2, stageHeight / 2, Math.PI / 2, 750 / 4, stageHeight / 4);
        colorBgCom.bgLinear.graphics.beginGradientFill(egret.GradientType.LINEAR, [theme.begin, theme.end], [1, 1], [0, 255], matix);
        colorBgCom.bgLinear.graphics.drawRect(0, 0, 750, stageHeight);
        colorBgCom.bgLinear.graphics.endFill();
    };
    colorBgCom.bgLinear = new egret.Sprite(); //背景对象
    colorBgCom.stageHeight = 1334;
    return colorBgCom;
}(eui.Component));
__reflect(colorBgCom.prototype, "colorBgCom", ["eui.UIComponent", "egret.DisplayObject"]);
window['colorBgCom'] = colorBgCom;
//# sourceMappingURL=colorBgCom.js.map