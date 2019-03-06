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
        var _this = _super.call(this) || this;
        _this.dataArr = [
            { index: 0, x: 80, y: 274, state: 0 },
            { index: 1, x: 220, y: 224, state: 0 },
            { index: 2, x: 360, y: 244, state: 0 },
            { index: 3, x: 500, y: 274, state: 0 },
            { index: 4, x: 520, y: 404, state: 0 },
            { index: 5, x: 360, y: 424, state: 0 },
            { index: 6, x: 210, y: 444, state: 0 },
            { index: 7, x: 80, y: 494, state: 0 },
            { index: 8, x: 80, y: 624, state: 0 },
            { index: 9, x: 220, y: 644, state: 0 },
            { index: 10, x: 360, y: 666, state: 0 },
            { index: 11, x: 500, y: 709, state: 0 },
            { index: 12, x: 520, y: 839, state: 0 },
            { index: 13, x: 358, y: 864, state: 0 },
            { index: 14, x: 208, y: 882, state: 0 },
            { index: 15, x: 80, y: 921, state: 0 },
            { index: 16, x: 80, y: 1051, state: 0 },
            { index: 17, x: 218, y: 1069, state: 0 },
            { index: 18, x: 360, y: 1093, state: 0 },
            { index: 19, x: 500, y: 1136, state: 0 },
            { index: 20, x: 520, y: 1266, state: 0 },
            { index: 21, x: 360, y: 1293, state: 0 },
            { index: 22, x: 210, y: 1311, state: 0 },
            { index: 23, x: 80, y: 1368, state: 0 },
            { index: 24, x: 80, y: 1488, state: 0 },
            { index: 25, x: 220, y: 1508, state: 0 },
            { index: 26, x: 360, y: 1530, state: 0 }
        ];
        return _this;
    }
    travelScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    travelScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    travelScene.prototype.init = function () {
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        this.scroller.height = this.stage.stageHeight;
        this.createFun();
    };
    travelScene.prototype.createFun = function () {
        var that = this;
        var data = that.dataArr;
        for (var i = 0; i < data.length; i++) {
            var name_1 = data[i].state == 1 ? 'img_bg_imprinting_1_png' : 'img_bg_imprinting_2_png';
            var img = that.createBitmapByName(name_1, data[i].x, data[i].y);
            this.content.addChild(img);
        }
    };
    travelScene.prototype.closeFun = function () {
        var parent = this.parent;
        parent.removeChild(this);
    };
    travelScene.prototype.createBitmapByName = function (name, x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.x = x;
        result.y = y;
        return result;
    };
    return travelScene;
}(eui.Component));
__reflect(travelScene.prototype, "travelScene", ["eui.UIComponent", "egret.DisplayObject"]);
