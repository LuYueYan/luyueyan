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
var friendHelp = (function (_super) {
    __extends(friendHelp, _super);
    function friendHelp() {
        var _this = _super.call(this) || this;
        _this.list = []; //"status":  状态1未领取2已领取
        return _this;
    }
    friendHelp.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    friendHelp.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    friendHelp.prototype.init = function () {
        var that = this;
        that.getList();
        egret.Tween.get(this.body).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        if (userDataMaster.cats[8].state) {
            //已解锁
            that.getBtn.texture = RES.getRes('btn_have_unlock_png');
        }
        if (!userDataMaster.cats[8].state && that.list.length >= 6) {
            //可解锁
            that.getBtn.texture = RES.getRes('btn_unlocking_png');
        }
        this.fireBall = movieMaster.getGif('fire_ball');
        this.fireBall.y = 297;
        this.fireBall.x = 245;
        this.body.addChild(this.fireBall);
        this.fireBall.gotoAndPlay(0, -1);
    };
    friendHelp.prototype.getList = function () {
        var _this = this;
        var that = this;
        var params = {
            uid: userDataMaster.getMyInfo.uid || 0
        };
        ServiceMaster.post(ServiceMaster.getAssistanceList, params, function (res) {
            if (res.code == 1 && res.data) {
                that.list = res.data.list;
                var _loop_1 = function (i, len) {
                    that['friend_' + i].source = that.list[i].avatarUrl;
                    that['friend_' + i].mask = that['mask_' + i];
                    if (that.list[i].status == 1) {
                        that['get_' + i].visible = true;
                        that['get_' + i].addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.getEnergyFun(i); }, _this);
                    }
                    else {
                        that['icon_' + i].visible = false;
                        that['text_' + i].visible = false;
                    }
                };
                for (var i = 0, len = res.data.total; i < len; i++) {
                    _loop_1(i, len);
                }
            }
        });
    };
    friendHelp.prototype.getEnergyFun = function (i) {
        var that = this;
        var params = {
            id: that.list[i].id,
            uid: userDataMaster.getMyInfo.uid
        };
        ServiceMaster.post(ServiceMaster.receiveAssistance, params, function (res) {
            if (res.code == 1 && res.data) {
                var gold = userDataMaster.myGold;
                gold += 150;
                userDataMaster.myGold = gold;
                that['get_' + i].visible = false;
                that['icon_' + i].visible = false;
                that['text_' + i].visible = false;
                that.list[i].status = 2;
                that.addChild(new getSuccess(-1, 'x 150'));
            }
        });
    };
    friendHelp.prototype.getFun = function () {
        var that = this;
        if (that.list.length >= 6) {
            //邀请完成 --解锁
            if (!userDataMaster.cats[8].state) {
                //未解锁
                var cat = userDataMaster.cats[8];
                cat.state = true;
                userDataMaster.setCat(8, cat);
                that.getBtn.texture = RES.getRes('btn_have_unlock_png');
                that.addChild(new getSuccess(4, '火火球'));
            }
            else {
                //已解锁
            }
        }
        else {
            CallbackMaster.openShare(null, false);
            setTimeout(function () {
                platform.showModal({
                    title: '温馨提示',
                    content: '新好友加入，你就能获得能量果和火火球~'
                });
            }, 500);
        }
    };
    friendHelp.prototype.closeFun = function () {
        var that = this;
        egret.Tween.get(this.body).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 200).call(function () {
            that.parent.removeChild(that);
        });
    };
    return friendHelp;
}(eui.Component));
__reflect(friendHelp.prototype, "friendHelp", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=friendHelp.js.map