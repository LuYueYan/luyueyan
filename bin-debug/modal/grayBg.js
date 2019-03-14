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
var grayBg = (function (_super) {
    __extends(grayBg, _super);
    function grayBg() {
        return _super.call(this) || this;
    }
    grayBg.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    grayBg.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    grayBg.prototype.init = function () {
        this.bg.width = this.stage.stageWidth;
        this.bg.height = this.stage.stageHeight;
    };
    return grayBg;
}(eui.Component));
__reflect(grayBg.prototype, "grayBg", ["eui.UIComponent", "egret.DisplayObject"]);
window['grayBg'] = grayBg;
