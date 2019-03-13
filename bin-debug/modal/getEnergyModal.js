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
var getEnergyModal = (function (_super) {
    __extends(getEnergyModal, _super);
    function getEnergyModal(suid, day) {
        if (suid === void 0) { suid = 0; }
        if (day === void 0) { day = ''; }
        var _this = _super.call(this) || this;
        _this.currentNum = 0; //已领取
        _this.status = 1; // //状态 1可领取 2已领取过 3已领取完 4已过期
        _this.suid = userDataMaster.myInfo.uid;
        _this.day = userDataMaster.getToday();
        _this.requestTime = 0; //请求次数
        if (suid) {
            _this.suid = suid;
        }
        if (day != '') {
            day = day;
        }
        return _this;
    }
    getEnergyModal.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    getEnergyModal.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    getEnergyModal.prototype.init = function () {
        var that = this;
        that.getMyInfo();
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    };
    getEnergyModal.prototype.getMyInfo = function () {
        var that = this;
        if (!userDataMaster.getMyInfo.uid) {
            that.requestTime++;
            if (that.requestTime < 5) {
                setTimeout(function () {
                    that.getMyInfo();
                }, 500);
            }
            return;
        }
        var params = {
            uid: userDataMaster.sourceEnergy.uid,
            be_invitation_uid: userDataMaster.getMyInfo.uid,
            share_day: userDataMaster.sourceEnergy.day
        };
        ServiceMaster.post(ServiceMaster.getEnergy, params, function (res) {
            if (res.code == 1 && res.data) {
                console.log('获取的能量信息', res);
                that.currentNum = res.Received;
                that.getText.text = "已领取（" + that.currentNum + "/5）";
                if (that.currentNum >= 5) {
                    that.getBtn.texture = RES.getRes('btn_receive_03_png');
                }
                that.status = res.data.status;
                if (res.data.status == 1) {
                    //    可领取
                }
                else if (res.data.status == 2) {
                    //已领取
                    that.state.visible = true;
                    that.getBtn.texture = RES.getRes('btn_present_02_png');
                }
                else if (res.data.status == 3) {
                    //已领完
                    that.getBtn.texture = RES.getRes('btn_receive_03_png');
                }
                else {
                    //已过期
                    that.getBtn.texture = RES.getRes('btn_receive_out_png');
                }
            }
        });
    };
    getEnergyModal.prototype.getFun = function () {
        var that = this;
        if (this.status == 1) {
            //可领
            var params = {
                uid: userDataMaster.sourceEnergy.uid,
                be_invitation_uid: userDataMaster.getMyInfo.uid
            };
            ServiceMaster.post(ServiceMaster.getEnergyList, params, function (res) {
                if (res.code == 1 && res.data) {
                    console.log('领取好友分享的能量', res);
                    that.currentNum = res.Received;
                    that.getText.text = "已领取（" + that.currentNum + "/5）";
                    that.state.visible = true;
                    that.numText.visible = true;
                    var gold = userDataMaster.myGold + 25;
                    userDataMaster.myGold = gold;
                    that.status = 2;
                    that.getBtn.texture = RES.getRes('btn_present_02_png');
                }
            });
        }
        else if (this.status == 2) {
            CallbackMaster.openShare(null, false, "&type=energy&day=" + this.day + "&suid=" + this.suid);
        }
    };
    getEnergyModal.prototype.closeFun = function () {
        this.parent.removeChild(this);
    };
    return getEnergyModal;
}(eui.Component));
__reflect(getEnergyModal.prototype, "getEnergyModal", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=getEnergyModal.js.map