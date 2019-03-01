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
var travelScene = (function (_super) {
    __extends(travelScene, _super);
    function travelScene() {
        return _super.call(this) || this;
    }
    travelScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    travelScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    travelScene.prototype.init = function () {
        this.sourceArr = new eui.ArrayCollection(userDataMaster.myTravels);
        this.dataGroup = new eui.DataGroup();
        this.dataGroup.dataProvider = this.sourceArr;
        this.dataGroup.useVirtualLayout = true;
        var layout = new eui.TileLayout();
        layout.paddingTop = 15;
        layout.verticalGap = 60;
        layout.horizontalGap = 60;
        this.dataGroup.layout = layout;
        this.dataGroup.itemRenderer = travelItem;
        this.content.addChild(this.dataGroup);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    };
    travelScene.prototype.closeFun = function () {
        var parent = this.parent;
        parent.removeChild(this);
    };
    return travelScene;
}(eui.Component));
__reflect(travelScene.prototype, "travelScene", ["eui.UIComponent", "egret.DisplayObject"]);
