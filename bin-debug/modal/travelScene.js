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
            { index: 0, x: 102, y: 399, state: 0, type: 0 },
            { index: 1, x: 244, y: 371, state: 0, type: 0 },
            { index: 2, x: 384, y: 371, state: 0, type: 0 },
            { index: 3, x: 524, y: 401, state: 0, type: 0 },
            { index: -1, x: 540, y: 562, state: 0, type: 1 },
            { index: 4, x: 384, y: 551, state: 0, type: 0 },
            { index: 5, x: 234, y: 571, state: 0, type: 0 },
            { index: 6, x: 104, y: 621, state: 0, type: 0 },
            { index: 7, x: 104, y: 771, state: 0, type: 0 },
            { index: -1, x: 238, y: 798, state: 0, type: 1 },
            { index: 8, x: 384, y: 793, state: 0, type: 0 },
            { index: 9, x: 524, y: 836, state: 0, type: 0 },
            { index: 10, x: 544, y: 986, state: 0, type: 0 },
            { index: 11, x: 384, y: 993, state: 0, type: 0 },
            { index: -1, x: 239, y: 1018, state: 0, type: 1 },
            { index: 12, x: 104, y: 1048, state: 0, type: 0 },
            { index: 13, x: 104, y: 1198, state: 0, type: 0 },
            { index: 14, x: 244, y: 1198, state: 0, type: 0 },
            { index: 15, x: 384, y: 1220, state: 0, type: 0 },
            { index: -1, x: 539, y: 1272, state: 0, type: 1 },
            { index: 16, x: 544, y: 1403, state: 0, type: 0 },
            { index: 17, x: 384, y: 1420, state: 0, type: 0 },
            { index: 18, x: 234, y: 1438, state: 0, type: 0 },
            { index: 19, x: 104, y: 1475, state: 0, type: 0 },
            { index: -1, x: 101, y: 1631, state: 0, type: 1 },
            { index: 20, x: 244, y: 1635, state: 0, type: 0 },
            { index: 21, x: 384, y: 1657, state: 0, type: 0 },
            { index: 22, x: 524, y: 1700, state: 0, type: 0 },
            { index: 23, x: 544, y: 1850, state: 0, type: 0 },
            { index: -1, x: 385, y: 1860, state: 0, type: 1 },
            { index: 24, x: 234, y: 1877, state: 0, type: 0 },
            { index: 25, x: 104, y: 1914, state: 0, type: 0 },
            { index: 26, x: 104, y: 2064, state: 0, type: 0 },
            { index: -1, x: 305, y: 2100, state: 0, type: 1 }
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
        AdMaster.closeBannerAd();
    };
    travelScene.prototype.createFun = function () {
        var that = this;
        var data = that.dataArr;
        var travels = userDataMaster.travels;
        var travelList = userDataMaster.travelList;
        var _loop_1 = function (i) {
            var name_1 = void 0, travel = void 0, text = void 0;
            if (data[i].type == 1 && i > 0 && travels[i].state == 1) {
                //已领取的礼包
                name_1 = 'img_gift_a3_png';
            }
            if (data[i].type == 1 && i > 0 && travels[i].state == 0 && data[i - 1].index < travelList.length) {
                //可领取的礼包
                name_1 = 'img_gift_a2_png';
            }
            if (data[i].type == 1 && i > 0 && data[i - 1].index >= travelList.length) {
                //不能领取的礼包
                name_1 = 'img_gift_a1_png';
            }
            if (data[i].type == 0 && data[i].index >= travelList.length) {
                //未解锁
                name_1 = 'img_bg_imprinting_2_png';
            }
            if (data[i].type == 0 && data[i].index < travelList.length) {
                //已解锁
                name_1 = 'img_bg_imprinting_1_png';
                var index = travelList[data[i].index];
                travel = that.createBitmapByName('img_imprinting_b' + (travels[index].id + 1) + '_png', data[i].x - 15, data[i].y - 15, 156, 135);
                var txt = travels[index].name;
                text = new eui.Label(txt);
                text.size = 20;
                text.textColor = 0x473678;
                text.x = data[i].x - 15 + (156 - text.width) / 2;
                text.y = data[i].y + 130;
                if (travels[index].state == 1) {
                    //是新的
                    travels[index].state = 1;
                    var is_new = that.createBitmapByName('img_label_02_png', data[i].x + 30, data[i].y - 20);
                    userDataMaster.setTravel(index, travels[index]);
                }
            }
            var img = that.createBitmapByName(name_1, data[i].x - 15, data[i].y - 15);
            this_1.content.addChild(img);
            if (name_1 == 'img_gift_a2_png') {
                var tip_1 = that.createBitmapByName('img_label_05_png', data[i].x + 30, data[i].y - 20);
                this_1.content.addChild(tip_1);
                img.touchEnabled = true;
                img.name = 'img_' + i;
                img.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { that.getFun(img, tip_1, i); }, this_1);
            }
            if (travel) {
                this_1.content.addChild(travel);
                this_1.content.addChild(text);
            }
        };
        var this_1 = this;
        for (var i = 0; i < data.length; i++) {
            _loop_1(i);
        }
    };
    travelScene.prototype.getFun = function (img, tip, index) {
        var travel = userDataMaster.myTravels[index];
        if (travel.state == 0) {
            travel.state = 1;
            userDataMaster.setTravel(index, travel);
            userDataMaster.myGold += 50;
            img.texture = RES.getRes('img_gift_a3_png');
            tip.parent && this.content.removeChild(tip);
            this.addChild(new getSuccess(-1, 'x50'));
        }
    };
    travelScene.prototype.closeFun = function () {
        var parent = this.parent;
        parent.removeChild(this);
        if (AdMaster.cacheBannerAd) {
            AdMaster.openBannerAd({ width: 700, height: 300 });
        }
    };
    travelScene.prototype.createBitmapByName = function (name, x, y, center, vertical) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (center === void 0) { center = 0; }
        if (vertical === void 0) { vertical = 0; }
        //center 是否水平居中  vertical 垂直居中
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        result.x = x;
        result.y = y;
        if (center > 0) {
            result.x = x + (center - result.width) / 2;
        }
        if (vertical > 0) {
            result.y = y + (vertical - result.height) / 2;
        }
        return result;
    };
    return travelScene;
}(eui.Component));
__reflect(travelScene.prototype, "travelScene", ["eui.UIComponent", "egret.DisplayObject"]);
