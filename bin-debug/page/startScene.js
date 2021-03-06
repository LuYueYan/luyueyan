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
        _this.tryIndex = -1; //今日试玩index
        _this.trying = false; //是否是试玩结束返回
        _this.energyAdd = 0; //能量加成百分比
        _this.touchPosition = [
            { x: 0, y: 0, name: 'houseBtn', func: 'houseFun' },
            { x: 0, y: 0, name: 'travelBtn', func: 'travelFun' },
            { x: 0, y: 0, name: 'rankBtn', func: 'rankFun' },
            { x: 0, y: 0, name: 'shareBtn', func: 'shareFun' },
            { x: 0, y: 0, name: 'friendBtn', func: 'friendFun' },
            { x: 0, y: 0, name: 'energyBtn', func: 'energyFun' },
            { x: 0, y: 0, name: 'startBtn', func: 'startFun' },
            { x: 0, y: 0, name: 'tryBtn', func: 'tryFun' },
            { x: 0, y: 0, name: 'addGold', func: 'addGoldFun' }
        ];
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
        that.bgImg.height = that.stage.stageHeight;
        setTimeout(function () {
            if (AdMaster.cacheBannerAd) {
                AdMaster.openBannerAd({ width: 700, height: 300 });
            }
        }, 1000);
        that.moreCom = new moreScroller();
        that.moreCom.y = 300;
        that.addChild(that.moreCom);
        that.moreCom.cacheAsBitmap = true;
        var match = DeviceMaster.model.match(/iPhone ?X/ig);
        if (match) {
            that.collection.y = 80;
        }
        setTimeout(function () {
            //今天试玩
            // that.tryBtn.visible = true;
            var tryList = [];
            var cats = userDataMaster.cats;
            for (var i = 0, len = cats.length; i < len; i++) {
                if (!cats[i].state) {
                    tryList.push(i);
                }
            }
            that.tryIndex = tryList[Math.floor(Math.random() * tryList.length)];
            that.tryImg.texture = RES.getRes('img_elf_' + that.tryIndex + '2_png');
            that.tryName.texture = RES.getRes('text_list_json.img_name_0' + (that.tryIndex + 1) + '_png');
            egret.Tween.get(that.tryBtn, { loop: true }).to({ rotation: 20 }, 100).to({ rotation: -20 }, 200).to({ rotation: 0 }, 100).wait(1000);
            that.goldText.text = '' + userDataMaster.gold;
            that.currentBall.texture = RES.getRes('img_elf_' + userDataMaster.runCat + '2_png');
            var energy = userDataMaster.sourceEnergy;
            if (energy.uid != 0 && energy.day) {
                that.addChild(new getEnergyModal(energy.uid, energy.day));
            }
            if (userDataMaster.todayVideoEnergy == 2) {
                that.goldImg.texture + RES.getRes('img_moer_02_png');
            }
            else {
                egret.Tween.get(that.goldImg, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 500).to({ scaleX: 1, scaleY: 1 }, 600);
            }
        }, 500);
        egret.Tween.get(that.circle_light, { loop: true }).to({ scaleX: 0.5, scaleY: 0.5 }, 800).to({ scaleX: 1, scaleY: 1 }, 1500);
        // if (this.trying) {
        // 	this.addChild(new myBalls());
        // }
        egret.Tween.get(that.collection, { loop: true }).to({ x: 230 }, 500).to({ x: 244 }, 300);
        egret.Tween.get(that.startBtn, { loop: true }).to({ scaleX: 1.2, scaleY: 1.2 }, 1000).to({ scaleX: 1, scaleY: 1 }, 800);
        that.touchRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
        userDataMaster.myCollection.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.updateData, this);
    };
    startScene.prototype.touchFun = function (e) {
        var that = this;
        var tx = e.stageX;
        var ty = e.stageY;
        var arr = that.touchPosition;
        for (var i = 0, len = arr.length; i < len; i++) {
            var target = that[arr[i].name];
            var dx = tx - (target.x - target.anchorOffsetX);
            var dy = ty - (target.y - target.anchorOffsetY);
            if (dx >= 0 && dx <= target.width && dy >= 0 && dy <= target.height) {
                that[arr[i].func] && that[arr[i].func]();
                return;
            }
        }
    };
    startScene.prototype.addGoldFun = function () {
        var that = this;
        switch (userDataMaster.todayVideoEnergy) {
            case 0:
                //今天还没分享还没看视频
                CallbackMaster.openShare(function () {
                    suc(50);
                });
                CallbackMaster.shareFailText = '分享到群或者好友就能获得能量果哦~';
                break;
            case 1:
                // 今天已经分享，还没看视频
                AdMaster.useVideo(function () {
                    suc(100);
                }, function () {
                    CallbackMaster.openShare(function () {
                        suc(100);
                    });
                    CallbackMaster.shareFailText = '分享到群或者好友就能获得能量果哦~';
                });
                break;
            case 2:
                // 今天已经分享已经看视频
                platform.showModal({
                    title: '温馨提示',
                    content: '今日次数已用完，明日再来'
                });
                break;
            default: break;
        }
        function suc(num) {
            userDataMaster.dayVideoEnergy.num++;
            userDataMaster.myGold += num;
            that.addChild(new getSuccess(-1, 'x ' + num));
            if (userDataMaster.dayVideoEnergy.num == 2) {
                that.goldImg.texture = RES.getRes('img_moer_02_png');
                egret.Tween.removeTweens(that.goldImg);
            }
        }
    };
    startScene.prototype.tryFun = function () {
        //今日试玩
        var that = this;
        if (userDataMaster.todayTry) {
            AdMaster.useVideo(function () {
                suc();
            }, function () {
                CallbackMaster.openShare(function () {
                    suc();
                });
                CallbackMaster.shareFailText = '分享到群或者好友就能立刻试玩' + userDataMaster.cats[that.tryIndex].name + '哦~';
            });
        }
        else {
            platform.showModal({
                title: '温馨提示',
                content: '今天你已经试玩过了，请明天再来哦'
            });
        }
        function suc() {
            that.tryTip.visible = true;
            that.currentBall.texture = RES.getRes('img_elf_' + that.tryIndex + '2_png');
            userDataMaster.updateTodayTry();
        }
    };
    startScene.prototype.updateData = function (evt) {
        this.goldText.text = '' + userDataMaster.gold;
        if (this.tryTip.visible) {
            this.currentBall.texture = RES.getRes('img_elf_' + this.tryIndex + '2_png');
        }
        else {
            this.currentBall.texture = RES.getRes('img_elf_' + userDataMaster.runCat + '2_png');
        }
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
        CallbackMaster.openShare(function () {
            that.energyAdd = 0.1;
            that.energyAddGroup.visible = true;
            that.shareTip.visible = false;
        });
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
        egret.Tween.removeAllTweens();
        that.touchRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
        userDataMaster.myCollection.removeEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.updateData, this);
        clearInterval(moreScroller.getInstance().scrTerval);
        var parent = that.parent;
        parent.removeChild(that);
        var currentBall = -1;
        if (this.tryTip.visible) {
            currentBall = this.tryIndex;
        }
        parent.addChild(new runningScene(1, 0, 0, currentBall, 0, 0, that.energyAdd));
    };
    return startScene;
}(eui.Component));
__reflect(startScene.prototype, "startScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=startScene.js.map