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
    function getEnergyModal(suid, day, type) {
        if (suid === void 0) { suid = 0; }
        if (day === void 0) { day = ''; }
        if (type === void 0) { type = 1; }
        var _this = _super.call(this) || this;
        _this.currentNum = 0; //已领取
        _this.status = 1; // //状态 1可领取 2已领取过 3已领取完 4已过期
        _this.suid = userDataMaster.myInfo.uid;
        _this.day = userDataMaster.getToday();
        _this.requestTime = 0; //请求次数
        _this.type = 1;
        // suid--分享源用户id day--日期  type--使用界面 1-每日能量界面 2-我的球球界面弹窗
        if (suid) {
            _this.suid = suid;
        }
        if (day != '') {
            _this.day = day;
        }
        _this.type = type;
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
        if (that.type == 1) {
            that.getMyInfo();
        }
        else {
            that.numTip.visible = true;
            that.title.texture = RES.getRes('img_tittle_07_png');
            that.getBtn.texture = RES.getRes('btn_share_get_png');
            that.getText.text = '分享到群，自己就能领取一份';
            that.status = 2;
        }
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
                that.currentNum = res.data.Received || 0;
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
                    that.numText.visible = true;
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
            ServiceMaster.post(ServiceMaster.getEnergyDo, params, function (res) {
                if (res.code == 1 && res.data) {
                    that.currentNum++;
                    ;
                    that.getText.text = "已领取（" + that.currentNum + "/5）";
                    that.state.visible = true;
                    that.numText.visible = true;
                    var gold = userDataMaster.myGold + 100;
                    userDataMaster.myGold = gold;
                    that.status = 2;
                    that.getBtn.texture = RES.getRes('btn_present_02_png');
                }
            });
        }
        else if (this.status == 2) {
            CallbackMaster.openShare(null, false, "&type=energy&day=" + this.day + "&suid=" + this.suid, 1);
        }
    };
    getEnergyModal.prototype.closeFun = function () {
        this.parent.removeChild(this);
        userDataMaster.sourceEnergy = { uid: 0, day: '' };
    };
    return getEnergyModal;
}(eui.Component));
__reflect(getEnergyModal.prototype, "getEnergyModal", ["eui.UIComponent", "egret.DisplayObject"]);
