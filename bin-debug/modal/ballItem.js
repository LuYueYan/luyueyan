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
var ballItem = (function (_super) {
    __extends(ballItem, _super);
    function ballItem() {
        return _super.call(this) || this;
    }
    ballItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    ballItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    ballItem.prototype.init = function () {
        var that = this;
        this.image.mask = this.imgMask;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, this);
    };
    ballItem.prototype.dataChanged = function () {
        this.title.text = this.data.name;
        this.image.source = this.data.image || '';
        this.image.mask = this.imgMask;
        // this.title.textColor = this.data.color || 0xFBF6E3;
    };
    return ballItem;
}(eui.ItemRenderer));
__reflect(ballItem.prototype, "ballItem", ["eui.UIComponent", "egret.DisplayObject"]);
window['ballItem'] = ballItem;
