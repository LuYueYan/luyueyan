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
var getSuccess = (function (_super) {
    __extends(getSuccess, _super);
    function getSuccess(type, nameOrNum) {
        if (type === void 0) { type = 1; }
        var _this = _super.call(this) || this;
        _this.type = 1; //类型 1--能量果 2--解锁球
        _this.nameOrNum = ''; //球的名字或者能量果数量 （数量的话类似 'x100'）
        _this.type = type;
        _this.nameOrNum = nameOrNum;
        return _this;
    }
    getSuccess.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    getSuccess.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    getSuccess.prototype.init = function () {
        var that = this;
        egret.Tween.get(this.body).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        this.word.text = this.nameOrNum;
        this['type_' + this.type].visible = true;
        if (this.type == 2) {
            this.title.texture = RES.getRes('img_tittle_05_png');
        }
        that.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
        that.ignoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ignoreFun, this);
        setTimeout(function () {
            that.ignoreBtn.visible = true;
        }, 5000);
    };
    getSuccess.prototype.shareFun = function () {
        var _this = this;
        CallbackMaster.openShare(function () { _this.ignoreFun(); }, false);
    };
    getSuccess.prototype.ignoreFun = function () {
        var that = this;
        egret.Tween.get(this.body).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 200).call(function () {
            that.parent.removeChild(that);
        });
    };
    return getSuccess;
}(eui.Component));
__reflect(getSuccess.prototype, "getSuccess", ["eui.UIComponent", "egret.DisplayObject"]);
