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
    function gameOver(score, ballId, energy) {
        if (score === void 0) { score = 0; }
        if (ballId === void 0) { ballId = 0; }
        if (energy === void 0) { energy = 0; }
        var _this = _super.call(this) || this;
        _this.score = 0;
        _this.ballId = 0; //这局用的球类型
        _this.energy = 0; //本局获得的能量果数量
        _this.score = score;
        _this.ballId = ballId;
        _this.energy = energy;
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
        soundMaster.stopSongMusic();
        this.bgImg.height = this.stage.stageHeight;
        this.scoreText.text = this.score + '';
        userDataMaster.myGold += this.energy;
        this.energyNum.text = 'x ' + this.energy;
        var travel = userDataMaster.MyCats[this.ballId].belong;
        var ran = Math.floor(Math.random() * travel.length);
        var newArr = [];
        for (var i = 0; i < travel.length; i++) {
            if (i != ran) {
                newArr.push(travel[i]);
            }
        }
        var item_0 = userDataMaster.travels[newArr[0]];
        var item_1 = userDataMaster.travels[newArr[1]];
        this.travel_img_0.texture = RES.getRes('img_imprinting_a' + (item_0.id + 1) + '_png');
        this.travel_name_0.text = item_0.name;
        this.travel_img_1.texture = RES.getRes('img_imprinting_a' + (item_1.id + 1) + '_png');
        this.travel_name_1.text = item_1.name;
        if (item_0.state == 0) {
            //初次获得
            item_0.state = 1;
            this.travel_new_0.visible = true;
            userDataMaster.setTravel(newArr[0], item_0);
            userDataMaster.travelList.push(newArr[0]);
        }
        if (item_1.state == 0) {
            //初次获得
            item_1.state = 1;
            this.travel_new_1.visible = true;
            userDataMaster.travelList.push(newArr[1]);
            userDataMaster.setTravel(newArr[1], item_1);
        }
        egret.Tween.get(this.getEnergy, { loop: true }).to({ scaleX: 1.1, scaleY: 1.1 }, 800).to({ scaleX: 1, scaleY: 1 }, 1000);
        this.updateScore();
        this.again.addEventListener(egret.TouchEvent.TOUCH_TAP, this.againFun, this);
        this.shareBtn_0.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
        this.shareBtn_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
        this.getEnergy.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
        this.openBall.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ballFun, this);
        this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.homeFun, this);
    };
    gameOver.prototype.updateScore = function () {
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
        var parent = this.parent;
        parent.removeChild(this);
        parent.addChild(new startScene());
    };
    gameOver.prototype.getFun = function () {
        var that = this;
        AdMaster.useVideo(function () {
            suc();
        }, function () {
            CallbackMaster.openShare(function () {
                suc();
            });
        });
        function suc() {
            userDataMaster.myGold += that.energy;
            that.getEnergy.texture = RES.getRes('btn_receive_04_png');
            egret.Tween.removeTweens(that.getEnergy);
            that.getEnergy.removeEventListener(egret.TouchEvent.TOUCH_TAP, that.getFun, that);
            that.addChild(new getSuccess(-1, 'x ' + that.energy));
        }
    };
    gameOver.prototype.shareFun = function () {
        CallbackMaster.openShare(null, false);
    };
    gameOver.prototype.againFun = function () {
        var parent = this.parent;
        parent.removeChild(this);
        parent.addChild(new runningScene());
    };
    gameOver.prototype.ballFun = function () {
        this.addChild(new myBalls(true));
    };
    return gameOver;
}(eui.Component));
__reflect(gameOver.prototype, "gameOver", ["eui.UIComponent", "egret.DisplayObject"]);
