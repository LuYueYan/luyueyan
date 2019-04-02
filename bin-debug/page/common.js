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
var common = (function (_super) {
    __extends(common, _super);
    function common() {
        var _this = _super.call(this) || this;
        _this.beeSpeed = {
            speedX: 0,
            speedY: 0,
            acceleration: 0,
            outSpeed: 0,
            oldAcceleration: 0,
            dragPosition: 0,
            oldSpeedX: 0.6
        };
        _this.buildingSpeed = 10;
        _this.buildingArr = [];
        _this.currentTimer = egret.getTimer();
        _this.removeArr = [];
        return _this;
    }
    common.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    common.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.bee) {
            this.init();
        }
        else {
            this.addEventListener(egret.Event.COMPLETE, this.init, this);
        }
    };
    common.prototype.init = function () {
        this.createBuilding('center', 800);
        this.createBuilding('left', 750);
        this.createBuilding('right', 700);
        this.createBuilding('left', 650);
        this.createBuilding('right', 600);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.moveBee, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    common.prototype.createBuilding = function (type, y) {
        if (type === void 0) { type = 'left'; }
        if (y === void 0) { y = 800; }
        var building = this.createBitmapByName('img_castle_a2_png');
        building.anchorOffsetX = building.width / 2;
        building.anchorOffsetY = building.height / 2;
        if (type == 'left') {
            building.x = 100;
        }
        else if (type == 'right') {
            building.x = 500;
        }
        else {
            building.x = 375;
            building.texture = RES.getRes('img_castle_a1_png');
        }
        building.y = y + building.anchorOffsetY;
        this.buildingGroup.addChildAt(building, 0);
        egret.Tween.get(building).to({ y: 800 + building.anchorOffsetY }, 5000);
        this.buildingArr.push({ content: building, hit: false, type: type });
    };
    common.prototype.onEnterFrame = function () {
        var that = this;
        var dt = egret.getTimer() - this.currentTimer;
        if (dt < 10) {
            return;
        }
        if (dt > 1000) {
            return;
        }
        this.bee.x += dt * this.beeSpeed.speedX;
        this.bee.y += this.beeSpeed.speedY * dt + 0.5 * this.beeSpeed.acceleration * dt * dt + this.beeSpeed.outSpeed;
        this.beeSpeed.speedY += dt * this.beeSpeed.acceleration;
        this.collisionFun();
        this.currentTimer = egret.getTimer();
        if (this.bee.x + this.bee.width >= this.stage.stageWidth) {
            this.beeSpeed.speedY = -this.beeSpeed.speedY;
            this.beeSpeed.speedX = -this.beeSpeed.speedX;
        }
    };
    common.prototype.moveBee = function (e) {
        if (this.bee.x == 323 && this.bee.y == 200) {
            //开始游戏
            this.beeSpeed.acceleration = 0.005;
        }
        else {
            //下落
            if (this.buildingArr[0].content.y - (this.bee.y + this.bee.height) > 50) {
                console.log(66);
                this.beeSpeed.outSpeed = 30;
                this.beeSpeed.speedX = 0;
            }
        }
    };
    common.prototype.collisionFun = function () {
        var _this = this;
        if (this.buildingArr.length == 0) {
            return;
        }
        var x1 = this.buildingArr[0].content.x - this.buildingArr[0].content.anchorOffsetX;
        var x2 = this.buildingArr[0].content.x + this.buildingArr[0].content.anchorOffsetX;
        var y = this.buildingArr[0].content.y - this.buildingArr[0].content.anchorOffsetY;
        var hit = (this.bee.x + this.bee.width / 2) >= x1 && (this.bee.x + this.bee.width / 2) <= x2 && (y <= this.bee.y + this.bee.height) && (y >= this.bee.y + this.bee.height / 2);
        if (hit && !this.buildingArr[0].hit && this.beeSpeed.speedY >= 0) {
            this.buildingArr[0].hit = true;
            this.beeSpeed.speedY = -2;
            this.beeSpeed.outSpeed = 0;
            var remove_1 = this.buildingArr.shift();
            console.log(777);
            egret.Tween.removeTweens(remove_1.content);
            egret.Tween.get(remove_1.content).to({ y: 1500 }, 1000).call(function () {
                _this.buildingGroup.removeChild(remove_1.content);
            });
            // this.removeArr.push(remove);
            var type = this.buildingArr[0].type == 'left' ? 'right' : 'left';
            this.createBuilding(type, 600);
            if (this.buildingArr.length > 0) {
                this.buildingArr[0].content.texture = RES.getRes('img_castle_a1_png');
                if (this.bee.x > this.buildingArr[0].content.x + this.buildingArr[0].content.width / 2) {
                    //向左
                    this.beeSpeed.speedX = -this.beeSpeed.oldSpeedX;
                }
                else {
                    this.beeSpeed.speedX = this.beeSpeed.oldSpeedX;
                }
            }
        }
    };
    common.prototype.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return common;
}(eui.Component));
__reflect(common.prototype, "common", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=common.js.map