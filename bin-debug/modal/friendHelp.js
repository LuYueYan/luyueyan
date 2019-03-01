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
        _this.haveGet = false; //是否已经拥有火火球
        _this.list = [
            { id: 1, avatarUrl: '/resource/assets/Aimages/img_spirit_01.png' },
            { id: 2, avatarUrl: '/resource/assets/Aimages/img_spirit_01.png' },
            { id: 3, avatarUrl: '/resource/assets/Aimages/img_spirit_01.png' }
        ];
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
        for (var i = 0, len = that.list.length; i < len; i++) {
            that['friend_' + i].source = that.list[i].avatarUrl;
            that['friend_' + i].mask = that['mask_' + i];
            that['text_' + i].text = "x50";
            that['icon_' + i].visible = true;
        }
        // for (let j = that.list.length; j < 6; j++) {
        // 	that['friend_' + (j + 1)].addEventListener(egret.TouchEvent.TOUCH_TAP, this.shareFun, this)
        // }
        this.getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getFun, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeFun, this);
        if (that.haveGet && that.list.length >= 6) {
            //已解锁
        }
        if (!that.haveGet && that.list.length >= 6) {
            //可解锁
            that.getBtn.texture = RES.getRes('btn_unlocking_png');
        }
    };
    friendHelp.prototype.getFun = function () {
        var that = this;
        if (that.list.length >= 6) {
            //邀请完成 --解锁
            if (1) {
                //未解锁
            }
            else {
            }
        }
        else {
            CallbackMaster.openShare(null, false);
        }
    };
    friendHelp.prototype.closeFun = function () {
        this.parent.removeChild(this);
    };
    return friendHelp;
}(eui.Component));
__reflect(friendHelp.prototype, "friendHelp", ["eui.UIComponent", "egret.DisplayObject"]);
