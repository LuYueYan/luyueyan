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
var throughModal = (function (_super) {
    __extends(throughModal, _super);
    function throughModal() {
        var _this = _super.call(this) || this;
        _this.list = [];
        _this.chooseList = [];
        _this.terval = null;
        return _this;
    }
    throughModal.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    throughModal.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    throughModal.prototype.init = function () {
        var that = this;
        var blurFliter = new egret.BlurFilter(4, 4);
        that.process.filters = [blurFliter];
        for (var i = 0; i < 3; i++) {
            var ran = Math.random() > 0.5 ? 2 : 1;
            that.list.push(ran);
            that['item_' + i].texture = RES.getRes('img_click_0' + ran + '_png');
        }
        // that.timeFun()
        // that.tap_1.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { that.chooseFun(1) }, this);
        // that.tap_2.addEventListener(egret.TouchEvent.TOUCH_TAP, () => { that.chooseFun(2) }, this);
    };
    return throughModal;
}(eui.Component));
__reflect(throughModal.prototype, "throughModal", ["eui.UIComponent", "egret.DisplayObject"]);
