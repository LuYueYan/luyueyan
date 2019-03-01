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
var gameOver = (function (_super) {
    __extends(gameOver, _super);
    function gameOver(score) {
        if (score === void 0) { score = 0; }
        var _this = _super.call(this) || this;
        _this.dataArr = [
            { id: 1, name: '光之旅', image: 'resource/assets/Aimages/bee.png', appid: '', path: '' },
            { id: 2, name: '光之旅', image: 'resource/assets/Aimages/bee.png', appid: '', path: '' },
            { id: 3, name: '光之旅', image: 'resource/assets/Aimages/bee.png', appid: '', path: '' },
            { id: 4, name: '光之旅', image: 'resource/assets/Aimages/bee.png', appid: '', path: '' },
            { id: 1, name: '光之旅', image: 'resource/assets/Aimages/bee.png', appid: '', path: '' },
            { id: 2, name: '光之旅', image: 'resource/assets/Aimages/bee.png', appid: '', path: '' },
            { id: 3, name: '光之旅', image: 'resource/assets/Aimages/bee.png', appid: '', path: '' },
            { id: 4, name: '光之旅', image: 'resource/assets/Aimages/bee.png', appid: '', path: '' },
        ];
        return _this;
    }
    gameOver.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    gameOver.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.again) {
            this.init();
        }
        else {
            this.addEventListener(egret.Event.COMPLETE, this.init, this);
        }
    };
    gameOver.prototype.init = function () {
        this.sourceArr = new eui.ArrayCollection(this.dataArr);
        this.dataGroup = new eui.DataGroup();
        this.dataGroup.dataProvider = this.sourceArr;
        this.dataGroup.useVirtualLayout = true;
        var layout = new eui.TileLayout();
        layout.paddingTop = 15;
        layout.verticalGap = 20;
        layout.horizontalGap = 480;
        this.dataGroup.layout = layout;
        this.dataGroup.itemRenderer = travelItem;
        this.leftMore.addChild(this.dataGroup);
        this.again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.againFun, this);
        this.shareBtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
        this.shareBtn_2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
        this.getEnergy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
    };
    gameOver.prototype.getFun = function () {
    };
    gameOver.prototype.shareFun = function () {
        CallbackMaster.openShare(null, false);
    };
    gameOver.prototype.againFun = function () {
        var parent = this.parent;
        parent.removeChild(this);
        parent.addChild(new runningScene());
    };
    return gameOver;
}(eui.Component));
__reflect(gameOver.prototype, "gameOver", ["eui.UIComponent", "egret.DisplayObject"]);
