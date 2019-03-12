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
    function getEnergyModal(uid, day) {
        if (uid === void 0) { uid = 0; }
        if (day === void 0) { day = ''; }
        var _this = _super.call(this) || this;
        _this.currentNum = 3; //已领取
        _this.haveGet = false; //自己已领取
        _this.uid = userDataMaster.myInfo.uid;
        _this.day = userDataMaster.getToday();
        if (uid) {
            uid = uid;
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
        this.getText.text = "已领取（" + this.currentNum + "/5）";
        if (this.haveGet) {
            this.state.visible = true;
            this.getBtn.texture = RES.getRes('btn_present_02_png');
        }
        if (this.currentNum >= 5) {
            this.getBtn.texture = RES.getRes('btn_receive_03_png');
        }
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
    };
    getEnergyModal.prototype.getFun = function () {
        if (this.currentNum >= 5) {
            //已领完
            return;
        }
        if (!this.haveGet) {
            this.currentNum++;
            this.getText.text = "已领取（" + this.currentNum + "/5）";
            this.state.visible = true;
            this.numText.visible = true;
            var gold = userDataMaster.myGold + 25;
            userDataMaster.myGold = gold;
            this.haveGet = true;
            if (this.currentNum >= 5) {
                this.getBtn.texture = RES.getRes('btn_receive_03_png');
            }
            else {
                this.getBtn.texture = RES.getRes('btn_receive_04_png');
            }
        }
        else {
            CallbackMaster.openShare(null, false, "&type=energy&day=" + this.day + "&suid=" + this.uid);
        }
    };
    getEnergyModal.prototype.closeFun = function () {
        this.parent.removeChild(this);
    };
    return getEnergyModal;
}(eui.Component));
__reflect(getEnergyModal.prototype, "getEnergyModal", ["eui.UIComponent", "egret.DisplayObject"]);
