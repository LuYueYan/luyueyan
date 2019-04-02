var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var spiritCom = (function () {
    function spiritCom() {
    }
    spiritCom.prototype.init = function (currentBall, adaptation, callback) {
        if (callback === void 0) { callback = null; }
        var that = this;
        var boxShape = new p2.Box({ width: 3.2, height: 3.2 });
        this.bee = new p2.Body({ mass: 5000, position: [7.5, 26 + adaptation] });
        // this.bee.collisionResponse = false;
        this.bee.addShape(boxShape);
        var display = new egret.Bitmap();
        var texture = RES.getRes('img_elf_' + currentBall + '2_png');
        display.texture = texture;
        display.width = 160;
        display.height = 160;
        display.anchorOffsetX = display.width / 2;
        display.anchorOffsetY = display.height / 2;
        this.bee.displays = [display];
        callback && callback(this.bee);
    };
    return spiritCom;
}());
__reflect(spiritCom.prototype, "spiritCom");
window['spiritCom'] = spiritCom;
//# sourceMappingURL=spiritCom.js.map