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
var reborn = (function (_super) {
    __extends(reborn, _super);
    function reborn(score) {
        if (score === void 0) { score = 0; }
        var _this = _super.call(this) || this;
        _this.score = 0;
        _this.terval = null;
        _this.current_time = 5;
        _this.score = score;
        return _this;
    }
    reborn.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    reborn.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    reborn.prototype.init = function () {
        var that = this;
        this.bgImg.height = this.stage.stageHeight;
        this.scoreText.text = this.score + "";
        this.terval = setInterval(function () {
            that.current_time > 1 && that.current_time--;
            that.timing.texture = RES.getRes('img_time_0' + that.current_time + '_png');
            if (that.current_time <= 1) {
                clearInterval(that.terval);
            }
        }, 1000);
        setTimeout(function () {
            that.ignoreBtn.visible = true;
        }, 5000);
        that.ignoreBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.ignoreFun, this);
    };
    reborn.prototype.ignoreFun = function () {
        var parent = this.parent.parent;
        parent.removeChild(this.parent);
        parent.addChild(new gameOver());
    };
    return reborn;
}(eui.Component));
__reflect(reborn.prototype, "reborn", ["eui.UIComponent", "egret.DisplayObject"]);
