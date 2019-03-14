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
var tryModal = (function (_super) {
    __extends(tryModal, _super);
    function tryModal(index) {
        var _this = _super.call(this) || this;
        _this.currentBall = 0; //试用的类型
        _this.currentBall = index;
        return _this;
    }
    tryModal.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    tryModal.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    tryModal.prototype.init = function () {
        this.ballImg.texture = RES.getRes('img_elf_' + this.currentBall + '2_png');
        this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sureFun, this);
        this.ignoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ignoreFun, this);
    };
    tryModal.prototype.sureFun = function () {
        var parent = this.parent.parent;
        parent.removeChild(this.parent);
        parent.addChild(new startScene(true));
    };
    tryModal.prototype.ignoreFun = function () {
        var parent = this.parent.parent;
        parent.removeChild(this.parent);
        parent.addChild(new startScene());
    };
    return tryModal;
}(eui.Component));
__reflect(tryModal.prototype, "tryModal", ["eui.UIComponent", "egret.DisplayObject"]);
