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
var dayEnergy = (function (_super) {
    __extends(dayEnergy, _super);
    function dayEnergy() {
        return _super.call(this) || this;
    }
    dayEnergy.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    dayEnergy.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    dayEnergy.prototype.init = function () {
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    };
    dayEnergy.prototype.getFun = function () {
    };
    dayEnergy.prototype.shareFun = function () {
        CallbackMaster.openShare(null, false, '&type=energy');
    };
    dayEnergy.prototype.closeFun = function () {
        this.parent.removeChild(this);
    };
    return dayEnergy;
}(eui.Component));
__reflect(dayEnergy.prototype, "dayEnergy", ["eui.UIComponent", "egret.DisplayObject"]);
