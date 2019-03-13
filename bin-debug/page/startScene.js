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
    function startScene(trying) {
        if (trying === void 0) { trying = false; }
        var _this = _super.call(this) || this;
        _this.tryIndex = 1; //今日试玩index
        _this.trying = false; //是否是试玩结束返回
        _this.trying = trying;
        return _this;
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
        userDataMaster.createLoginBtn(0, 100, 300, 100);
        that.bgImg.height = that.stage.stageHeight;
        setTimeout(function () {
            if (AdMaster.cacheBannerAd) {
                AdMaster.openBannerAd({ width: 700, height: 300 });
            }
        }, 1000);
        var match = DeviceMaster.model.match(/iPhone ?X/ig);
        if (match) {
            that.collection.y = 80;
        }
        if (userDataMaster.todayTry) {
            //今天还没试玩
            this.tryBtn.visible = true;
            var tryList = [];
            var cats = userDataMaster.cats;
            for (var i = 0, len = cats.length; i < len; i++) {
                if (!cats[i].state) {
                    tryList.push(i);
                }
            }
            this.tryIndex = Math.floor(Math.random() * tryList.length);
            this.tryImg.texture = RES.getRes('img_elf_' + this.tryIndex + '2_png');
        }
        if (userDataMaster.getMyInfo.uid) {
            // userDataMaster.createLoginBtn()
        }
        this.goldText.text = '' + userDataMaster.gold;
        this.currentBall.texture = RES.getRes('img_elf_' + userDataMaster.runCat + '2_png');
        if (userDataMaster.recommand && userDataMaster.recommand['1'] && userDataMaster.recommand['1'].games) {
            var list_1 = userDataMaster.recommand['1'].games;
            var _loop_1 = function (i) {
                that['more_' + (i + 1)].source = list_1[i].image;
                var text = list_1[i].name.length > 4 ? list_1[i].name.substr(0, 3) + '…' : list_1[i].name;
                that['text_' + (i + 1)].text = text;
                that['more_' + (i + 1)].mask = that['mask_' + (i + 1)];
                that['more_' + (i + 1)].addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    that.moreFun(list_1[i]);
                }, this_1);
            };
            var this_1 = this;
            for (var i = 0; i < 3 && i < list_1.length; i++) {
                _loop_1(i);
            }
        }
        var energy = userDataMaster.sourceEnergy;
        if (energy.uid && energy.day) {
            this.addChild(new getEnergyModal(energy.uid, energy.day));
        }
        if (this.trying) {
            this.addChild(new myBalls());
        }
        egret.Tween.get(that.collection, { loop: true }).to({ x: 230 }, 500).to({ x: 244 }, 300);
        egret.Tween.get(that.startBtn, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 1000).to({ scaleX: 1, scaleY: 1 }, 800);
        that.houseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.houseFun, this);
        that.travelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.travelFun, this);
        that.rankBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rankFun, this);
        that.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
        that.friendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.friendFun, this);
        that.energyBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.energyFun, this);
        that.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startFun, this);
        that.tryBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tryFun, this);
        userDataMaster.myCollection.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.updateData, this);
    };
    startScene.prototype.tryFun = function () {
        //今日试玩
        if (userDataMaster.todayTry) {
            var parent_1 = this.parent;
            parent_1.removeChild(this);
            parent_1.addChild(new runningScene(1, 0, 0, this.tryIndex + 100));
            userDataMaster.updateTodayTry();
        }
        else {
            platform.showModal({
                title: '温馨提示',
                content: '今天你已经试玩过了，请明天再来哦'
            });
        }
    };
    startScene.prototype.updateData = function (evt) {
        this.goldText.text = '' + userDataMaster.gold;
        this.currentBall.texture = RES.getRes('img_elf_' + userDataMaster.runCat + '2_png');
    };
    startScene.prototype.moreFun = function (item) {
        CallbackMaster.recommandClick(1, item);
        var type = 2;
        platform.navigateToMiniProgram({
            appId: item.appid,
            path: item.path,
            extraData: {},
            success: function (suc) {
            }, fail: function (err) {
                type = 3;
            },
            complete: function () {
                CallbackMaster.recommandClick(type, item);
            }
        });
    };
    startScene.prototype.houseFun = function () {
        var that = this;
        that.addChild(new myBalls());
        that.houseTip.visible = false;
    };
    startScene.prototype.travelFun = function () {
        var that = this;
        this.addChild(new travelScene());
        that.travelTip.visible = false;
    };
    startScene.prototype.rankFun = function () {
        var that = this;
        that.addChild(new rank());
    };
    startScene.prototype.shareFun = function () {
        var that = this;
        CallbackMaster.openShare(null, false);
        that.shareTip.visible = false;
    };
    startScene.prototype.friendFun = function () {
        var that = this;
        that.addChild(new friendHelp());
    };
    startScene.prototype.energyFun = function () {
        var that = this;
        that.addChild(new dayEnergy());
        that.energyTip.visible = false;
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
//# sourceMappingURL=startScene.js.map