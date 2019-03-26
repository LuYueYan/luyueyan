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
var dayEnergy = (function (_super) {
    __extends(dayEnergy, _super);
    function dayEnergy() {
        return _super.call(this) || this;
    }
    dayEnergy.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    dayEnergy.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    dayEnergy.prototype.init = function () {
        var that = this;
        egret.Tween.get(this.body).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        switch (userDataMaster.todayEnergy) {
            case 0:
                break;
            case 1:
                that.getBtn.texture = RES.getRes('btn_receive_video_png');
                break;
            case 2:
                that.getBtn.texture = RES.getRes('btn_receive_04_png');
                break;
            default: break;
        }
        egret.Tween.get(this.img, { loop: true }).to({ y: 262 }, 600).to({ y: 300 }, 600);
        that.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    };
    dayEnergy.prototype.getFun = function () {
        var that = this;
        var state = userDataMaster.todayEnergy;
        if (state == 0) {
            suc('video');
        }
        else if (state == 1) {
            AdMaster.useVideo(function () {
                suc('04');
            }, function () {
                CallbackMaster.openShare(function () {
                    suc('04');
                });
            });
        }
        function suc(str) {
            userDataMaster.dayEnergy.num++;
            userDataMaster.myGold += 100;
            that.addChild(new getSuccess(-1, 'x 100'));
            that.getBtn.texture = RES.getRes('btn_receive_' + str + '_png');
        }
    };
    dayEnergy.prototype.shareFun = function () {
        CallbackMaster.openShare(null, false, '&type=energy&day=' + userDataMaster.getToday(), 1);
        setTimeout(function () {
            platform.showModal({
                title: '温馨提示',
                content: '从分享链接点进去，就能获得一份能量果~'
            });
        }, 500);
    };
    dayEnergy.prototype.closeFun = function () {
        var that = this;
        egret.Tween.get(this.body).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 200).call(function () {
            that.parent.removeChild(that);
        });
    };
    return dayEnergy;
}(eui.Component));
__reflect(dayEnergy.prototype, "dayEnergy", ["eui.UIComponent", "egret.DisplayObject"]);
