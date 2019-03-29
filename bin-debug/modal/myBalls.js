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
    function myBalls(guideFeed) {
        if (guideFeed === void 0) { guideFeed = false; }
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
        _this.fireList = []; //火火球邀请情况
        _this.guideFeed = false; //是否从结束页进来的
        _this.guideFeed = guideFeed;
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
        var cats = userDataMaster.cats;
        for (var len = this.positionArr.length, i = len - 1; i >= 0; i--) {
            this['img_' + i].texture = RES.getRes('img_elf_' + i + '2_png');
            if (cats[i].state) {
                //已获得
            }
            else {
                if (this.guideFeed && this.currentBall == 0) {
                    this.currentBall = i;
                }
                this.filterFun(this['img_' + i]);
            }
        }
        if (this.currentBall != 0) {
            var dx = this.currentBall;
            for (var i = 0, len = this.positionArr.length; i < len; i++) {
                var current = i - dx >= 0 ? i - dx : i - dx + 9;
                this['item_' + i].name = 'current_' + current;
                this.bodyGroup.setChildIndex(this['item_' + i], this.getIndex(current));
                this['item_' + i].x = this.positionArr[current].x;
                this['item_' + i].y = this.positionArr[current].y;
                this['item_' + i].scaleX = this.positionArr[current].scaleX;
                this['item_' + i].scaleY = this.positionArr[current].scaleY;
            }
        }
        this.changeInfo(this.currentBall);
        this.bgImg.height = this.stage.stageHeight;
        var blurFliter = new egret.BlurFilter(4, 4);
        this.processBar.filters = [blurFliter];
        this.goldText.text = userDataMaster.myGold + '';
        this.getFireList();
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.beginFun, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.endFun, this);
        this.homeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.homeFun, this);
        this.raiseBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.raiseFun, this);
        this.fireBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.fireFun, this);
        this.addGold.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addGoldFun, this);
        userDataMaster.myCollection.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, this.updateData, this);
    };
    myBalls.prototype.updateData = function (evt) {
        this.goldText.text = '' + userDataMaster.gold;
    };
    myBalls.prototype.addGoldFun = function () {
        var that = this;
        switch (userDataMaster.todayVideoEnergy) {
            case 0:
                //今天还没分享还没看视频
                CallbackMaster.openShare(function () {
                    suc(50);
                });
                break;
            case 1:
                // 今天已经分享，还没看视频
                AdMaster.useVideo(function () {
                    suc(100);
                }, function () {
                    CallbackMaster.openShare(function () {
                        suc(100);
                    });
                });
                break;
            case 2:
                // 今天已经分享已经看视频
                platform.showModal({
                    title: '温馨提示',
                    content: '今日次数已用完，明日再来'
                });
                break;
            default: break;
        }
        function suc(num) {
            userDataMaster.dayVideoEnergy.num++;
            userDataMaster.myGold += num;
            that.addChild(new getSuccess(-1, 'x ' + num));
        }
    };
    myBalls.prototype.getFireList = function () {
        var that = this;
        var params = {
            uid: userDataMaster.getMyInfo.uid || 0
        };
        ServiceMaster.post(ServiceMaster.getAssistanceList, params, function (res) {
            if (res.code == 1 && res.data) {
                that.fireList = res.data.list;
            }
        });
    };
    myBalls.prototype.filterFun = function (obj, type) {
        if (type === void 0) { type = 0; }
        // type ==0 添加滤镜，type==1去除滤镜
        if (type == 0) {
            var colorMatrix = [
                0.3, 0.6, 0, 0, -300,
                0.3, 0.6, 0, 0, -300,
                0.3, 0.6, 0, 0, -300,
                0, 0, 0, 1, 0
            ];
            var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
            obj.filters = [colorFlilter];
        }
        else {
            obj.filters = [];
        }
    };
    myBalls.prototype.fireFun = function () {
        var that = this;
        var i = 4;
        if (userDataMaster.cats[i].state && userDataMaster.runCat == i) {
            //旅行中
        }
        else if (!userDataMaster.cats[i].state && that.fireList.length >= 6) {
            //可解锁
            var cat = userDataMaster.cats[i];
            cat.state = true;
            userDataMaster.setCat(i, cat);
            that.filterFun(that['img_' + i], 1);
            that.fireBtn.texture = RES.getRes('btn_receive_10_png');
            that.addChild(new getSuccess(4, '火火球'));
        }
        else if (userDataMaster.cats[i].state && that.fireList.length >= 6) {
            //带他出发
            that.fireBtn.texture = RES.getRes('btn_receive_09_png');
            userDataMaster.myRunCat = i;
        }
        else {
            CallbackMaster.openShare(null, false);
        }
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
        // if (t < 150) {
        // 	num = 4;
        // } else if (t < 200) {
        // 	num = 3;
        // } else if (t < 300) {
        // 	num = 2;
        // } else {
        // 	num = 1;
        // }
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
            if (current == 0) {
                that.changeInfo(i);
            }
            this_1['item_' + i].name = 'current_' + current;
            var _loop_2 = function (n) {
                var index = i < 5 ? i : 9 - i;
                this_1.bodyGroup.setChildIndex(this_1['item_' + i], this_1.getIndex(current));
                egret.Tween.get(this_1['item_' + i])
                    .wait(500 / num * n)
                    .to({
                    x: this_1.positionArr[current].x,
                    y: this_1.positionArr[current].y,
                    scaleX: this_1.positionArr[current].scaleX,
                    scaleY: this_1.positionArr[current].scaleY
                }, 500 / num)
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
    myBalls.prototype.changeInfo = function (i, feed) {
        if (feed === void 0) { feed = false; }
        var that = this;
        var cat = userDataMaster.cats[i];
        if (!feed) {
            that.currentBall = i;
            that.nameImg.texture = RES.getRes('img_name_0' + (i + 1) + '_png');
            that.natureText.text = "球球属性：" + cat.des;
            that.musicText.text = "音乐主题：" + cat.music;
            var travel = cat.belong;
            var travels = userDataMaster.travels;
            for (var n = 0; n < 3; n++) {
                var name_1 = 'img_imprinting_a' + (travels[travel[n]].id + 1) + '_png';
                that["travelImg_" + n].texture = RES.getRes(name_1);
            }
        }
        if (i == 4) {
            //火火球
            that.fireGroup.visible = true;
            that.popularGroup.visible = false;
            that.fireText.text = '成功邀请6位好友即可解锁火火球哦（' + that.fireList.length + '/6）';
            if (userDataMaster.cats[i].state && userDataMaster.runCat == i) {
                //旅行中
                that.fireBtn.texture = RES.getRes('btn_receive_09_png');
            }
            else if (!userDataMaster.cats[i].state && that.fireList.length >= 6) {
                //可解锁
                that.fireBtn.texture = RES.getRes('btn_unlocking_2_png');
            }
            else if (userDataMaster.cats[i].state && that.fireList.length >= 6) {
                //已解锁
                that.fireBtn.texture = RES.getRes('btn_receive_10_png');
            }
            return;
        }
        that.fireGroup.visible = false;
        that.popularGroup.visible = true;
        that.fruitText.text = "能量果喂养中（" + cat.process + " / " + cat.target + "）";
        var pro = cat.process / cat.target;
        that.processBar.width = 650 * pro;
        that.progressText.text = parseInt(pro * 100 + '') + "%";
        that.progressGroup.x = pro * 650;
        if (pro < 1) {
            that.raiseBtn.texture = RES.getRes('btn_receive_11_png');
        }
        else if (userDataMaster.runCat == i) {
            //正在出行
            that.raiseBtn.texture = RES.getRes('btn_receive_09_png');
        }
        else {
            //带它出发
            that.raiseBtn.texture = RES.getRes('btn_receive_10_png');
        }
    };
    myBalls.prototype.raiseFun = function () {
        var cat = userDataMaster.cats[this.currentBall];
        var pro = cat.process / cat.target;
        if (!cat.state && cat.process < cat.target) {
            //喂养
            if (userDataMaster.myGold >= 100) {
                userDataMaster.myGold -= 100;
                cat.process += 100;
                if (cat.process == cat.target) {
                    //
                    cat.state = true;
                    this.filterFun(this['img_' + this.currentBall], 1);
                    this.addChild(new getSuccess(this.currentBall, cat.name));
                }
                userDataMaster.setCat(this.currentBall, cat);
                this.changeInfo(this.currentBall, true);
            }
            else {
                this.addChild(new getEnergyModal(userDataMaster.myInfo.uid, userDataMaster.getToday(), 2));
            }
        }
        else if (cat.state && this.currentBall != userDataMaster.runCat) {
            //带他出发
            userDataMaster.myRunCat = this.currentBall;
            this.raiseBtn.texture = RES.getRes('btn_receive_09_png');
        }
    };
    return myBalls;
}(eui.Component));
__reflect(myBalls.prototype, "myBalls", ["eui.UIComponent", "egret.DisplayObject"]);
