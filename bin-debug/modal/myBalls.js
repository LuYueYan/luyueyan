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
var myBalls = (function (_super) {
    __extends(myBalls, _super);
    function myBalls() {
        var _this = _super.call(this) || this;
        _this.positionArr = [
            { index: 0, x: 375, y: 303, scaleX: 1, scaleY: 1 },
            { index: 1, x: 142, y: 288, scaleX: 0.6, scaleY: 0.6 },
            { index: 2, x: 90, y: 235, scaleX: 0.5, scaleY: 0.5 },
            { index: 3, x: 192, y: 198, scaleX: 0.4, scaleY: 0.4 },
            { index: 4, x: 305, y: 180, scaleX: 0.3, scaleY: 0.3 },
            { index: 5, x: 448, y: 180, scaleX: 0.3, scaleY: 0.3 },
            { index: 6, x: 557, y: 198, scaleX: 0.4, scaleY: 0.4 },
            { index: 7, x: 670, y: 235, scaleX: 0.5, scaleY: 0.5 },
            { index: 8, x: 612, y: 288, scaleX: 0.6, scaleY: 0.6 }
        ];
        _this.canMove = true;
        _this.position = { x: 0, y: 0, time: 0 };
        _this.currentBall = 0; //当前的球是哪个
        return _this;
    }
    myBalls.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    myBalls.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    myBalls.prototype.init = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginFun, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.endFun, this);
        this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.homeFun, this);
    };
    myBalls.prototype.homeFun = function () {
        var parent = this.parent;
        parent.removeChild(this);
    };
    myBalls.prototype.beginFun = function (e) {
        this.position = { x: e.stageX, y: e.stageY, time: egret.getTimer() };
    };
    myBalls.prototype.endFun = function (e) {
        var t = egret.getTimer() - this.position.time;
        var num = 1;
        if (t < 150) {
            num = 4;
        }
        else if (t < 200) {
            num = 3;
        }
        else if (t < 300) {
            num = 2;
        }
        else {
            num = 1;
        }
        if (this.position.x - e.stageX > 50) {
            this.moveFun('right', num);
        }
        else if (e.stageX - this.position.x > 50) {
            this.moveFun('left', num);
        }
        this.position.x = 0;
        this.position.time = 0;
    };
    myBalls.prototype.moveFun = function (direction, num) {
        var _this = this;
        if (direction === void 0) { direction = 'left'; }
        if (num === void 0) { num = 1; }
        if (!this.canMove) {
            return;
        }
        var that = this;
        this.canMove = false;
        var _loop_1 = function (i, len) {
            var current = 0;
            if (this_1['item_' + i].name) {
                var old = this_1['item_' + i].name.slice(8);
                if (direction == 'left') {
                    current = old > 0 ? parseInt(old) - 1 : 8;
                }
                else {
                    current = old < 8 ? parseInt(old) + 1 : 0;
                }
            }
            else {
                if (direction == 'left') {
                    current = i > 0 ? i - 1 : 8;
                }
                else {
                    current = i < 8 ? i + 1 : 0;
                }
            }
            this_1['item_' + i].name = 'current_' + current;
            var _loop_2 = function (n) {
                var index = i < 5 ? i : 9 - i;
                this_1.bodyGroup.setChildIndex(this_1['item_' + i], this_1.getIndex(current));
                egret.Tween.get(this_1['item_' + i])
                    .wait(1000 / num * n)
                    .to({
                    x: this_1.positionArr[current].x,
                    y: this_1.positionArr[current].y,
                    scaleX: this_1.positionArr[current].scaleX,
                    scaleY: this_1.positionArr[current].scaleY
                }, 1000 / num)
                    .call(function () {
                    if (i == 8 && n == num - 1) {
                        _this.canMove = true;
                    }
                });
            };
            for (var n = 0; n < num; n++) {
                _loop_2(n);
            }
        };
        var this_1 = this;
        for (var i = 0, len = this.positionArr.length; i < len; i++) {
            _loop_1(i, len);
        }
    };
    myBalls.prototype.getIndex = function (i) {
        var index = 0;
        switch (i) {
            case 0:
                index = 8;
                break;
            case 1:
                index = 7;
                break;
            case 2:
                index = 5;
                break;
            case 3:
                index = 3;
                break;
            case 4:
                index = 1;
                break;
            case 5:
                index = 0;
                break;
            case 6:
                index = 2;
                break;
            case 7:
                index = 4;
                break;
            case 8:
                index = 6;
                break;
            default: break;
        }
        return index;
    };
    Object.defineProperty(myBalls.prototype, "factor", {
        set: function (obj) {
            //二次方贝塞尔公式 (1 - t)^2 *P0 + 2 *t* (1 - t)* P1 + t^2* P2
            if (obj && obj.value && obj.target) {
            }
        },
        enumerable: true,
        configurable: true
    });
    return myBalls;
}(eui.Component));
__reflect(myBalls.prototype, "myBalls", ["eui.UIComponent", "egret.DisplayObject"]);
