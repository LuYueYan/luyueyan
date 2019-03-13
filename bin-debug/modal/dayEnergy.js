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
        egret.Tween.get(this.body).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        if (!userDataMaster.todayEnergy) {
            this.getBtn.texture = RES.getRes('btn_receive_04_png');
        }
        else {
            this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
        }
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    };
    dayEnergy.prototype.getFun = function () {
        if (userDataMaster.todayEnergy) {
            userDataMaster.updateTodayEnergy();
            this.getBtn.texture = RES.getRes('btn_receive_04_png');
            userDataMaster.myGold += 100;
            this.addChild(new getSuccess(-1, 'x 100'));
            this.getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
        }
    };
    dayEnergy.prototype.shareFun = function () {
        CallbackMaster.openShare(null, false, '&type=energy&day=' + userDataMaster.getToday());
    };
    dayEnergy.prototype.closeFun = function () {
        var that = this;
        egret.Tween.get(this.body).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 200).call(function () {
            that.parent.removeChild(that);
        });
    };
    return dayEnergy;
}(eui.Component));
__reflect(dayEnergy.prototype, "dayEnergy", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=dayEnergy.js.map