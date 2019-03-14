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
var travelItem = (function (_super) {
    __extends(travelItem, _super);
    function travelItem() {
        return _super.call(this) || this;
    }
    travelItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    travelItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    travelItem.prototype.init = function () {
        var that = this;
        this.image.mask = this.imgMask;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
        }, this);
    };
    travelItem.prototype.dataChanged = function () {
        this.title.text = this.data.name;
        this.image.source = this.data.image || '';
        this.image.mask = this.imgMask;
        // this.title.textColor = this.data.color || 0xFBF6E3;
    };
    return travelItem;
}(eui.ItemRenderer));
__reflect(travelItem.prototype, "travelItem", ["eui.UIComponent", "egret.DisplayObject"]);
window['travelItem'] = travelItem;
