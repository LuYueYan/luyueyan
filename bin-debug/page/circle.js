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
var circle = (function (_super) {
    __extends(circle, _super);
    function circle() {
        var _this = _super.call(this) || this;
        _this.positionArr = [
            { index: 0, x: 300, y: 471, scaleX: 1, scaleY: 1 },
            { index: 1, x: 138, y: 471, scaleX: 0.8, scaleY: 0.8 },
            { index: 2, x: 44, y: 431, scaleX: 0.7, scaleY: 0.7 },
            { index: 3, x: 28, y: 363, scaleX: 0.6, scaleY: 0.6 },
            { index: 4, x: 94, y: 313, scaleX: 0.5, scaleY: 0.5 },
            { index: 5, x: 190, y: 295, scaleX: 0.4, scaleY: 0.4 },
            { index: 6, x: 306, y: 287, scaleX: 0.35, scaleY: 0.35 },
            { index: 7, x: 406, y: 295, scaleX: 0.4, scaleY: 0.4 },
            { index: 8, x: 506, y: 313, scaleX: 0.5, scaleY: 0.5 },
            { index: 9, x: 576, y: 363, scaleX: 0.6, scaleY: 0.6 },
            { index: 10, x: 562, y: 431, scaleX: 0.7, scaleY: 0.7 },
            { index: 11, x: 464, y: 471, scaleX: 0.8, scaleY: 0.8 }
        ];
        _this.canMove = true;
        _this.position = { x: 0, y: 0, time: 0 };
        return _this;
    }
    circle.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    circle.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    circle.prototype.init = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginFun, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.endFun, this);
    };
    circle.prototype.beginFun = function (e) {
        this.position = { x: e.stageX, y: e.stageY, time: egret.getTimer() };
    };
    circle.prototype.endFun = function (e) {
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
    circle.prototype.moveFun = function (direction, num) {
        var _this = this;
        if (direction === void 0) { direction = 'left'; }
        if (num === void 0) { num = 1; }
        if (!this.canMove) {
            return;
        }
        this.canMove = false;
        var _loop_1 = function (i, len) {
            var current = 0;
            if (this_1['img_' + i].name) {
                var old = this_1['img_' + i].name.slice(8);
                if (direction == 'left') {
                    current = old > 0 ? parseInt(old) - 1 : 11;
                }
                else {
                    current = old < 11 ? parseInt(old) + 1 : 0;
                }
            }
            else {
                if (direction == 'left') {
                    current = i > 0 ? i - 1 : 11;
                }
                else {
                    current = i < 11 ? i + 1 : 0;
                }
            }
            this_1['img_' + i].name = 'current_' + current;
            var _loop_2 = function (n) {
                egret.Tween.get(this_1['img_' + i])
                    .wait(1000 / num * n)
                    .to({
                    x: this_1.positionArr[current].x,
                    y: this_1.positionArr[current].y,
                    scaleX: this_1.positionArr[current].scaleX,
                    scaleY: this_1.positionArr[current].scaleY
                }, 1000 / num)
                    .call(function () {
                    if (i == 11 && n == num - 1) {
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
    return circle;
}(eui.Component));
__reflect(circle.prototype, "circle", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=circle.js.map