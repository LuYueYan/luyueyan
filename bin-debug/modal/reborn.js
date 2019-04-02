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
    function reborn(score, ballId, energy, energyAdd, pro) {
        if (score === void 0) { score = 0; }
        if (ballId === void 0) { ballId = 0; }
        if (energy === void 0) { energy = 0; }
        if (energyAdd === void 0) { energyAdd = 0; }
        var _this = _super.call(this) || this;
        _this.score = 0;
        _this.energy = 0; //本局能量果
        _this.ballId = 0; //本局使用的球
        _this.terval = null;
        _this.current_time = 5;
        _this.energyAdd = 0; //能量加成百分比
        _this.pro = 0; //进度百分比0-1
        _this.score = score;
        _this.energy = energy;
        _this.ballId = ballId;
        _this.energyAdd = energyAdd;
        _this.pro = pro;
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
        this.titleText.text = userDataMaster.degree + '阶试炼';
        this.degreeText.text = (userDataMaster.degree) + '阶';
        this.percentText.text = this.pro * 100 + '%';
        this.proGroup.x = 45 + 600 * this.pro;
        this.proBar.width = 600 * this.pro;
        this.terval = setInterval(function () {
            that.current_time > 0 && that.current_time--;
            that.timing.texture = RES.getRes('img_time_0' + that.current_time + '_png');
            if (that.current_time <= 0) {
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
        // let energy=parseInt(this.energy*(1+this.energyAdd)+'');
        parent.addChild(new gameOver(this.score, this.ballId, this.energy, this.energyAdd, this.pro));
    };
    return reborn;
}(eui.Component));
__reflect(reborn.prototype, "reborn", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=reborn.js.map