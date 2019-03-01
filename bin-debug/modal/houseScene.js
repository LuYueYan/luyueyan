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
var houseScene = (function (_super) {
    __extends(houseScene, _super);
    function houseScene() {
        var _this = _super.call(this) || this;
        _this.dataArr = [
            { id: 1, name: '白白球', image: 'resource/assets/Aimages/bee.png' },
            { id: 2, name: '白白球', image: 'resource/assets/Aimages/bee.png' },
            { id: 3, name: '白白球', image: 'resource/assets/Aimages/bee.png' },
            { id: 4, name: '白白球', image: 'resource/assets/Aimages/bee.png' },
            { id: 5, name: '白白球', image: 'resource/assets/Aimages/bee.png' },
            { id: 6, name: '白白球', image: 'resource/assets/Aimages/bee.png' },
            { id: 7, name: '白白球', image: 'resource/assets/Aimages/bee.png' },
            { id: 8, name: '白白球', image: 'resource/assets/Aimages/bee.png' },
            { id: 9, name: '白白球', image: 'resource/assets/Aimages/bee.png' }
        ];
        return _this;
    }
    houseScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    houseScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    houseScene.prototype.init = function () {
        this.sourceArr = new eui.ArrayCollection(this.dataArr);
        this.dataGroup = new eui.DataGroup();
        this.dataGroup.dataProvider = this.sourceArr;
        this.dataGroup.useVirtualLayout = true;
        var layout = new eui.TileLayout();
        layout.paddingTop = 15;
        layout.verticalGap = 60;
        layout.horizontalGap = 60;
        this.dataGroup.layout = layout;
        this.dataGroup.itemRenderer = ballItem;
        this.content.addChild(this.dataGroup);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    };
    houseScene.prototype.closeFun = function () {
        var parent = this.parent;
        parent.removeChild(this);
    };
    return houseScene;
}(eui.Component));
__reflect(houseScene.prototype, "houseScene", ["eui.UIComponent", "egret.DisplayObject"]);
