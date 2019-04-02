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
    function gameOver(score, ballId, energy, energyAdd, pro) {
        if (score === void 0) { score = 0; }
        if (ballId === void 0) { ballId = 0; }
        if (energy === void 0) { energy = 0; }
        if (energyAdd === void 0) { energyAdd = 0; }
        var _this = _super.call(this) || this;
        _this.multip = 1; //视频奖励多少倍
        _this.score = 0;
        _this.ballId = 0; //这局用的球类型
        _this.energy = 0; //本局获得的能量果数量
        _this.energyAdd = 0; //能量果加成百分几
        _this.more_list = []; //推荐位列表v
        _this.terval = null; //定时器
        _this.more_index_0 = 0;
        _this.more_index_1 = 0;
        _this.pro = 0; //本阶段进度
        _this.touchPosition = [
            { name: 'homeBtn', func: 'homeFun' },
            { name: 'travelBtn', func: 'travelFun' },
            { name: 'getEnergy', func: 'getEnergyFun' },
            { name: 'doubleEnergy', func: 'doubleEnergyFun' },
            { name: 'again', func: 'againFun' },
            { name: 'shareBtn', func: 'shareFun' },
            { name: 'openBall', func: 'openBallFun' }
        ];
        _this.haveGet = {
            one: false,
            double: false
        }; //是否已领取奖励
        // score--分数 ballId--精灵索引 energy--获得的能量果 energyAdd--能量果是否加成 pro--本阶段进度
        _this.score = score;
        _this.ballId = ballId;
        _this.energy = parseInt(energy * (1 + energyAdd) + '');
        _this.energyAdd = energyAdd;
        _this.pro = pro;
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
        var that = this;
        soundMaster.stopSongMusic();
        if (AdMaster.cacheBannerAd) {
            AdMaster.openBannerAd({ width: 700, height: 300 });
        }
        that.scoreText.text = that.score + '';
        userDataMaster.myGold += that.energy;
        var degree = userDataMaster.degree;
        if (that.pro == 1) {
            that.centerImg.texture = RES.getRes('img_bg_steps_01_png');
            that.titleText.text = '完整通关';
        }
        else {
            degree++;
        }
        that.degree_0.text = (degree - 1) + '阶';
        that.degree_1.text = degree + '阶';
        that.degree_2.text = (degree + 1) + '阶';
        var w = 280 * that.pro;
        that.headGroup.x = w;
        that.head.source = userDataMaster.myInfo.avatarUrl;
        that.head.mask = that.headMask;
        that.proGroup.x = w;
        that.proBar.width = w;
        that.percentText.text = Math.floor(that.pro * 100) + '%';
        that.energyNum.text = '' + that.energy;
        that.doubleNum.text = that.energy + ' x ?';
        // if (that.energyAdd != 0) {
        // 	that.energyAddImg.visible = true;
        // }
        var travel = userDataMaster.MyCats[that.ballId].belong;
        var ran = Math.floor(Math.random() * travel.length);
        var newArr = [];
        for (var i = 0; i < travel.length; i++) {
            if (i != ran) {
                newArr.push(travel[i]);
            }
        }
        var item_0 = userDataMaster.travels[newArr[0]];
        var item_1 = userDataMaster.travels[newArr[1]];
        if (item_0.state == 0) {
            //初次获得
            item_0.state = 2;
            that.newTip.visible = true;
            userDataMaster.setTravel(newArr[0], item_0);
            userDataMaster.travelList.push(newArr[0]);
        }
        if (item_1.state == 0) {
            //初次获得
            item_1.state = 2;
            that.newTip.visible = true;
            userDataMaster.setTravel(newArr[1], item_1);
            userDataMaster.travelList.push(newArr[1]);
        }
        if (userDataMaster.recommand && userDataMaster.recommand['2'] && userDataMaster.recommand['2'].games) {
            that.more_list = userDataMaster.recommand['2'].games;
            if (that.more_list.length > 1) {
                var len_1 = that.more_list.length;
                that.more_index_1 = len_1 - 1;
                that.more_0.source = that.more_list[that.more_index_0].image;
                if (that.more_list[that.more_index_0].name.length > 5) {
                    that.more_list[that.more_index_0].name = that.more_list[that.more_index_0].name.slice(0, 4) + '…';
                }
                that.text_0.text = that.more_list[that.more_index_0].name;
                that.more_0.mask = that.mask_0;
                that.more_1.source = that.more_list[that.more_index_1].image;
                if (that.more_list[that.more_index_1].name.length > 5) {
                    that.more_list[that.more_index_1].name = that.more_list[that.more_index_1].name.slice(0, 4) + '…';
                }
                that.text_1.text = that.more_list[that.more_index_1].name;
                that.more_1.mask = that.mask_1;
                that.group_0.visible = true;
                that.group_1.visible = true;
                that.terval = setInterval(function () {
                    that.more_index_0 < len_1 - 1 ? that.more_index_0++ : that.more_index_0 = 0;
                    that.more_index_1 > 0 ? that.more_index_1-- : that.more_index_1 = len_1 - 1;
                    that.more_0.source = that.more_list[that.more_index_0].image;
                    if (that.more_list[that.more_index_0].name.length > 5) {
                        that.more_list[that.more_index_0].name = that.more_list[that.more_index_0].name.slice(0, 4) + '…';
                    }
                    that.text_0.text = that.more_list[that.more_index_0].name;
                    // that.more_0.mask = that.mask_0;
                    that.more_1.source = that.more_list[that.more_index_1].image;
                    if (that.more_list[that.more_index_1].name.length > 5) {
                        that.more_list[that.more_index_1].name = that.more_list[that.more_index_1].name.slice(0, 4) + '…';
                    }
                    that.text_1.text = that.more_list[that.more_index_1].name;
                    // that.more_1.mask = that.mask_1;
                }, 5000);
                that.group_0.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { that.jumpFun(0); }, that);
                that.group_1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { that.jumpFun(1); }, that);
            }
            egret.Tween.get(that.group_0, { loop: true }).to({ rotation: 20 }, 300).to({ rotation: -20 }, 600).to({ rotation: 0 }, 300);
            egret.Tween.get(that.group_1, { loop: true }).to({ rotation: 20 }, 300).to({ rotation: -20 }, 600).to({ rotation: 0 }, 300);
        }
        egret.Tween.get(that.getEnergy, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 800).to({ scaleX: 1, scaleY: 1 }, 1000);
        this.updateScore();
        that.touchRect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
    };
    gameOver.prototype.touchFun = function (e) {
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
    gameOver.prototype.jumpFun = function (index) {
        var that = this;
        var item = that.more_list[that['more_index_' + index]];
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
    gameOver.prototype.updateScore = function () {
        var that = this;
        platform.openDataContext.postMessage({
            type: "updateScore",
            score: that.score,
            width: 80,
            height: 80
        });
        if (this.score > userDataMaster.bestScore) {
            userDataMaster.bestScore = this.score;
        }
        var params = {
            score: this.score,
            uid: userDataMaster.getMyInfo.uid
        };
        ServiceMaster.post(ServiceMaster.getScore, params, function (suc) {
            if (parseInt(suc.code) === 1 && suc.data) {
                //分数提交成功
            }
        });
    };
    gameOver.prototype.homeFun = function () {
        this.touchRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
        this.terval && clearInterval(this.terval);
        var parent = this.parent;
        parent.removeChild(this);
        parent.addChild(new startScene());
    };
    gameOver.prototype.getEnergyFun = function () {
        var that = this;
        if (that.haveGet.one) {
            return;
        }
        that.addChild(new getSuccess(-1, '' + that.energy));
        that.haveGet.one = true;
    };
    gameOver.prototype.doubleEnergyFun = function () {
        var that = this;
        if (that.haveGet.double) {
            return;
        }
        AdMaster.useVideo(function () {
            suc();
        }, function () {
            CallbackMaster.openShare(function () {
                suc();
            });
        });
        function suc() {
            that.multip = 2 + Math.floor(Math.random() * 3); //2-4倍
            userDataMaster.myGold += that.energy * (that.multip - 1);
            that.doubleNum.text = that.energy + ' x ' + that.multip;
            egret.Tween.removeTweens(that.getEnergy);
            that.addChild(new getSuccess(-1, 'x ' + that.energy * 2));
            that.haveGet.double = true;
        }
    };
    gameOver.prototype.shareFun = function () {
        CallbackMaster.openShare(null, false);
    };
    gameOver.prototype.againFun = function () {
        this.touchRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
        this.terval && clearInterval(this.terval);
        var parent = this.parent;
        parent.removeChild(this);
        parent.addChild(new runningScene());
    };
    gameOver.prototype.openBallFun = function () {
        this.touchRect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchFun, this);
        this.terval && clearInterval(this.terval);
        var parent = this.parent;
        parent.removeChild(this);
        var start = new startScene();
        parent.addChild(start);
        start.addChild(new myBalls(true));
    };
    return gameOver;
}(eui.Component));
__reflect(gameOver.prototype, "gameOver", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=gameOver.js.map