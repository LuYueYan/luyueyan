var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var buildingCom = (function () {
    function buildingCom(type, adaptation) {
        this.type = 0; //类型 0--中心 1--左边 2--右边
        this.haveHit = false; //是否碰撞
        this.factor = 50;
        this.adaptation = 0; //适配差距
        this.type = type;
        this.adaptation = adaptation;
    }
    buildingCom.prototype.init = function (themeItem, y) {
        if (y === void 0) { y = 14; }
        var that = this;
        var width = themeItem.width / that.factor;
        var boxShape = new p2.Box({ width: width, height: 11.1 });
        var boxBody = new p2.Body({ mass: 500, gravityScale: 0, type: p2.Body.KINEMATIC });
        var display = that.createBitmapByName(themeItem.name);
        display.name = themeItem.name;
        display.anchorOffsetX = display.width / 2;
        display.anchorOffsetY = display.height / 2;
        display.x = display.width / 2;
        display.y = display.height / 2;
        display.scaleX = 0.8;
        display.scaleY = 0.8;
        if (that.type == 0) {
            boxBody.position = [7.5, 6 + that.adaptation];
            display.texture = RES.getRes(themeItem.name + '1_png');
        }
        else if (that.type == 1) {
            var ran = Math.random() > 0.9 ? Math.random() * 2 : -Math.random() * 2;
            boxBody.position = [5 + ran, y + that.adaptation];
        }
        else {
            var ran = Math.random() > 0.9 ? -Math.random() * 2 : Math.random() * 2;
            boxBody.position = [10 + ran, y + that.adaptation];
        }
        var lightningShape = new p2.Box({ width: 0.92, height: 6.26, material: new p2.Material(2) });
        var lightning = that.createBitmapByName('lightning');
        lightning.x = lightning.width / 2;
        lightning.y = -boxShape.height * that.factor / 2;
        lightning.anchorOffsetX = lightning.width / 2;
        lightning.height = 0;
        lightning.rotation = 180;
        boxBody.displays = [display, lightning];
        boxBody.addShape(boxShape);
        boxBody.addShape(lightningShape);
        this.boxBody = boxBody;
    };
    buildingCom.prototype.unpdateBuilding = function (type, y) {
        if (y === void 0) { y = 14; }
        var that = this;
        that.type = type;
        that.haveHit = false;
        that.boxBody.displays[0].scaleX = 0.8;
        that.boxBody.displays[0].scaleY = 0.8;
        that.boxBody.displays[0].texture = RES.getRes(that.boxBody.displays[0].name + '2_png');
        if (that.type == 1) {
            var ran = Math.random() > 0.9 ? Math.random() * 2 : -Math.random() * 2;
            that.boxBody.position = [5 + ran, y + that.adaptation];
        }
        else {
            var ran = Math.random() > 0.9 ? -Math.random() * 2 : Math.random() * 2;
            that.boxBody.position = [10 + ran, y + that.adaptation];
        }
        that.boxBody.displays[1].height = 0;
    };
    buildingCom.prototype.updateTexture = function (name) {
        this.boxBody.displays[0].texture = RES.getRes(name + '_png');
    };
    buildingCom.prototype.afterHit = function (world, buildingLoop, removeArr, x) {
        var boxBody = this.boxBody;
        boxBody.displays[0].scaleX += 0.005;
        if (boxBody.position[1] < -4) {
            world.removeBody(boxBody);
            if (boxBody.displays[0] && boxBody.displays[0].parent) {
                boxBody.displays[0].parent.removeChild(boxBody.displays[0]);
            }
            if (boxBody.displays[1] && boxBody.displays[1].parent) {
                boxBody.displays[1].parent.removeChild(boxBody.displays[1]);
            }
            var r = removeArr.shift();
            buildingLoop[r.boxBody.displays[0].name].push(r);
            x > 0 && x--;
        }
    };
    buildingCom.prototype.changeScale = function (speed, worldSpeed) {
        var boxBody = this.boxBody;
        if (boxBody.displays[0].scaleX < 1) {
            boxBody.displays[0].scaleX += 0.001 * speed / worldSpeed;
            boxBody.displays[0].scaleY += 0.001 * speed / worldSpeed;
            boxBody.velocity[1] = -2;
        }
    };
    buildingCom.prototype.removeBuilding = function () {
    };
    buildingCom.prototype.createBitmapByName = function (name) {
        var that = this;
        var result = new egret.Bitmap();
        var texture = RES.getRes(name + '2_png');
        result.texture = texture;
        return result;
    };
    return buildingCom;
}());
__reflect(buildingCom.prototype, "buildingCom");
window['buildingCom'] = buildingCom;
//# sourceMappingURL=buildingCom.js.map