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
var startScene = (function (_super) {
    __extends(startScene, _super);
    function startScene() {
        return _super.call(this) || this;
    }
    startScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    startScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.startBtn === null) {
            this.addEventListener(egret.Event.COMPLETE, this.init, this);
        }
        else {
            this.init();
        }
    };
    startScene.prototype.init = function () {
        var that = this;
        that.bgImg.height = that.stage.stageHeight;
        setTimeout(function () {
            if (AdMaster.cacheBannerAd) {
                AdMaster.openBannerAd({ width: 700, height: 300 });
            }
        }, 1000);
        this.goldText.text = '' + userDataMaster.gold;
        var list = [
            { appid: '', path: '', image: '/resource/assets/Aimages/img_spirit_01.png', name: '滴滴滴' },
            { appid: '', path: '', image: '/resource/assets/Aimages/img_spirit_01.png', name: '滴滴滴' },
            { appid: '', path: '', image: '/resource/assets/Aimages/img_spirit_01.png', name: '滴滴滴' }
        ];
        var _loop_1 = function (i) {
            // that['more_' + (i + 1)].source = list[i].image;
            // that['more_' + (i + 1)].mask=that['mask_' + (i + 1)];
            that['more_' + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                that.moreFun(list[i]);
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < 3; i++) {
            _loop_1(i);
        }
        egret.Tween.get(that.collection, { loop: true }).to({ x: 230 }, 500).to({ x: 244 }, 300);
        that.houseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.houseFun, this);
        that.travelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.travelFun, this);
        that.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankFun, this);
        that.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
        that.friendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.friendFun, this);
        that.energyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.energyFun, this);
        that.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startFun, this);
        userDataMaster.myCollection.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.updateData, this);
    };
    startScene.prototype.updateData = function (evt) {
        this.goldText.text = '' + userDataMaster.gold;
    };
    startScene.prototype.moreFun = function (item) {
        var type = 1;
        platform.navigateToMiniProgram({
            appId: item.appid,
            path: item.path,
            extraData: {},
            success: function (suc) {
            }, fail: function (err) {
                type = 0;
            },
            complete: function () {
                // CallbackMaster.recommandClick(that.data.id, type)
            }
        });
    };
    startScene.prototype.houseFun = function () {
        var that = this;
        that.addChild(new houseScene());
    };
    startScene.prototype.travelFun = function () {
        var that = this;
        this.addChild(new travelScene());
    };
    startScene.prototype.rankFun = function () {
        var that = this;
        that.addChild(new rank());
    };
    startScene.prototype.shareFun = function () {
        var that = this;
        CallbackMaster.openShare(null, false);
    };
    startScene.prototype.friendFun = function () {
        var that = this;
        that.addChild(new friendHelp());
    };
    startScene.prototype.energyFun = function () {
        var that = this;
        that.addChild(new dayEnergy());
    };
    startScene.prototype.startFun = function () {
        var that = this;
        var parent = that.parent;
        parent.removeChild(that);
        parent.addChild(new runningScene());
        // parent.addChild(new common())
    };
    return startScene;
}(eui.Component));
__reflect(startScene.prototype, "startScene", ["eui.UIComponent", "egret.DisplayObject"]);
