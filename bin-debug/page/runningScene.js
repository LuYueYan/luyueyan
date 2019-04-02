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
var runningScene = (function (_super) {
    __extends(runningScene, _super);
    function runningScene(theme, score, hitNum, currentBall, rebornNum, energy, energyAdd, themeArr) {
        if (theme === void 0) { theme = 1; }
        if (score === void 0) { score = 0; }
        if (hitNum === void 0) { hitNum = 0; }
        if (currentBall === void 0) { currentBall = -1; }
        if (rebornNum === void 0) { rebornNum = 0; }
        if (energy === void 0) { energy = 0; }
        if (energyAdd === void 0) { energyAdd = 0; }
        if (themeArr === void 0) { themeArr = []; }
        var _this = _super.call(this) || this;
        _this.factor = 50;
        _this.currentTimer = egret.getTimer();
        _this.flowerArr = [];
        _this.ceilArr = [];
        _this.removeArr = [];
        _this.score = 0; //分数
        _this.currentTheme = 1; //当前第几个主题（从1开始算）
        _this.moveSpeed = 1;
        _this.hitNum = 0; //当前主题的建筑出现次数
        _this.perfectNum = 0; //连续击中中心光束的次数
        _this.themeArr = [];
        //num--该主题的数量 score--单次击中分数 energy--单次击中能量 width--建筑总宽度 tw--接触面宽度  th--接触面顶部距离图片顶部距离
        // left--发光点距离左侧距离  top--发光点距离顶部距离 name--建筑图片名字 begin主题渐变起色 end--主题渐变结束色
        _this.buildingLoop = {
            img_castle_a: [],
            img_castle_b: [],
            img_castle_c: [],
            img_castle_d: [],
            img_castle_e: [],
            img_castle_f: [],
            img_castle_g: [],
            img_castle_h: [],
            img_castle_i: [],
            img_castle_j: [],
            lightning: []
        }; //建筑回收数组
        _this.list = [];
        _this.chooseList = [];
        _this.terval = null;
        _this.adaptation = 0; //适配长度
        _this.rebornNum = 0; //是否已经复活
        _this.guideProcess = 0; //引导进度
        _this.worldSpeed = 1000; //世界运行速度
        _this.speed = {
            before: 4000,
            guide: 2000,
            start: 1500,
            common: 1000,
            still: 1000000 //静态时
        }; //各种速度
        _this.currentBall = userDataMaster.runCat; //本局使用的球index
        _this.energy = 0; //本局获得的能量果数量
        _this.trying = false; //是否试玩
        _this.energyAdd = 0; //本局能量加成百分比
        _this.degree = 0; //当前阶段
        _this.currentTheme = theme;
        _this.score = score;
        _this.hitNum = hitNum;
        if (currentBall != -1) {
            if (currentBall > 50) {
                currentBall -= 100;
                _this.trying = true;
            }
            _this.currentBall = currentBall;
        }
        _this.energyAdd = energyAdd;
        _this.rebornNum = rebornNum;
        _this.energy = energy;
        if (themeArr.length > 0) {
            _this.themeArr = themeArr;
        }
        return _this;
    }
    runningScene.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    runningScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        if (this.scoreText) {
            this.init();
        }
        else {
            this.addEventListener(egret.Event.COMPLETE, this.init, this);
        }
    };
    runningScene.prototype.init = function () {
        var that = this;
        AdMaster.closeBannerAd();
        this.worldSpeed = this.speed.still;
        that.degree = userDataMaster.degree;
        if (that.rebornNum == 0) {
            new randomTheme(that.degree).init(function () {
                that.addChildAt(new colorBgCom(that.currentTheme), 0);
                that.themeArr = randomTheme.getInstance().degreeThemeArr;
            });
        }
        else {
            that.addChildAt(new colorBgCom(that.currentTheme), 0);
            that.themeArr = randomTheme.getInstance().degreeThemeArr;
        }
        this.scoreText.text = this.score + '';
        this.adaptation = (this.stage.stageHeight - 1334) / this.factor;
        var ball = userDataMaster.cats[this.currentBall];
        this.ballText.text = ball.name;
        //创建world
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING; //睡眠策略，提高性能
        this.world.gravity = [0, -60];
        this.spirit = new spiritCom();
        this.spirit.init(that.currentBall, that.adaptation, function (bee) {
            that.addChild(bee.displays[0]);
            that.world.addBody(bee);
            that.worldSpeed = that.speed.before;
            that.bee = bee;
            setTimeout(function () {
                that.ballText.visible = true;
                egret.Tween.get(that.startTips).to({ alpha: 1 }, 500);
            }, 1000);
            setTimeout(function () {
                that.worldSpeed = that.speed.still;
                if (that.guide) {
                    that.guide.visible = true;
                }
                that.startBtn.visible = true;
            }, 2000);
        });
        var themeItem = that.themeArr[that.currentTheme - 1];
        var initList = [{ type: 0, y: 6 }, { type: 2, y: 8 }, { type: 1, y: 10 }, { type: 2, y: 12 }, { type: 1, y: 14 }];
        var _loop_1 = function (i) {
            var item = initList[i];
            var building = new buildingCom(item.type, that.adaptation);
            building.init(themeItem, item.y);
            that.world.addBody(building.boxBody);
            setTimeout(function () {
                that.flowerGroup.addChildAt(building.boxBody.displays[0], 0);
                that.flowerGroup.addChildAt(building.boxBody.displays[1], 1);
            }, 10);
            that.flowerArr.push(building);
        };
        for (var i = 0; i < 5; i++) {
            _loop_1(i);
        }
        //右边墙壁
        var planeBody = new p2.Body({ mass: 1, position: [16, 0], type: p2.Body.STATIC, material: new p2.Material(3) }); //创建墙壁
        var shape = new p2.Box({ width: 1, height: 60 });
        planeBody.addShape(shape); //给这个刚体添加形状
        planeBody.displays = []; //与每个形状对应的显示对象
        this.world.addBody(planeBody);
        this.ceilArr.push(planeBody);
        //左边墙壁
        var planeBody = new p2.Body({ mass: 1, position: [-1, 0], type: p2.Body.STATIC, material: new p2.Material(3) }); //创建墙壁
        var shape = new p2.Box({ width: 1, height: 60 });
        planeBody.addShape(shape); //给这个刚体添加形状
        planeBody.displays = []; //与每个形状对应的显示对象
        this.world.addBody(planeBody);
        this.ceilArr.push(planeBody);
        if (userDataMaster.getMyInfo.is_new_user && !this.trying) {
            this.guide = new guideModal();
            this.addChild(this.guide);
            this.guide.addChild(this.startBtn);
            this.guide.visible = false;
        }
        egret.Tween.get(that.startBtn, { loop: true }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startFun, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.perfectGif = movieMaster.getGif('continue');
        this.perfectGif.x = 30;
        this.perfectGroup.addChild(this.perfectGif);
        platform.onShow(function () {
            //当页面隐藏后重新打开时恢复时间节点
            if (that.currentTimer) {
                that.currentTimer = egret.getTimer();
            }
        });
    };
    runningScene.prototype.startFun = function () {
        soundMaster.playSongMusic(this.degree);
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startFun, this);
        this.removeChild(this.startImg);
        this.removeChild(this.startTips);
        this.removeChild(this.ballText);
        this.removeChild(this.startBg);
        egret.Tween.removeTweens(this.startBtn);
        if (this.guide) {
            this.guide.process_1.visible = false;
            this.guide.removeChild(this.startBtn);
            this.removeChild(this.guide);
            this.guideProcess = 1; //第一步引导完成
            this.worldSpeed = this.speed.guide;
        }
        else {
            this.removeChild(this.startBtn);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
            this.worldSpeed = this.speed.start; //第一步减速
        }
        this.currentTimer = egret.getTimer();
    };
    runningScene.prototype.onEnterFrame = function () {
        var that = this;
        var dt = egret.getTimer() - this.currentTimer;
        if (dt < 10) {
            return;
        }
        if (dt > 1000) {
            return;
        }
        this.world.step(dt / this.worldSpeed); //使物理系统向前经过一定时间，也就是使世界运行
        this.currentTimer = egret.getTimer();
        var stageHeight = egret.MainContext.instance.stage.stageHeight; //获取舞台高度？？？？
        var l = this.world.bodies.length; //所有body的长度
        var currentTheme = that.themeArr[that.currentTheme - 1];
        var marginTop = currentTheme.top + 10;
        var marginLeft = currentTheme.left;
        for (var i = 0; i < l; i++) {
            var boxBody = this.world.bodies[i];
            var len = boxBody.displays.length;
            for (var j = 0; j < len; j++) {
                var box = boxBody.displays[j];
                if (box) {
                    if (j == 0) {
                        box.anchorOffsetX = boxBody.displays[0].width / 2;
                    }
                    box.x = boxBody.position[0] * this.factor;
                    box.y = stageHeight - boxBody.position[1] * this.factor; //坐标系不一样，所以要转换
                    box.rotation = 360 - (boxBody.angle + boxBody.shapes[j].angle) * 180 / Math.PI; //旋转
                    if (j == 1) {
                        box.y -= (boxBody.displays[0].height / 2 - marginTop) * boxBody.displays[0].scaleY;
                        box.x -= (boxBody.displays[0].width / 2 - marginLeft) * boxBody.displays[0].scaleX;
                        box.rotation = 180;
                    }
                }
            }
        }
        if (that.bee.position[1] < 0) {
            this.gameOver();
            return;
        }
        if (this.guide && (this.guideProcess % 2 == 1) && that.flowerArr[0].type == 2 && Math.abs(this.bee.position[0] - this.flowerArr[0].boxBody.position[0]) < 1) {
            //第二次引导
            this.addChild(this.guide);
            this.guide.process_3.visible = false;
            this.guide.process_2.visible = true;
            this.guide.alpha = 0;
            egret.Tween.get(this.guide).to({ alpha: 1 }, 1000).call(function () {
                that.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchFun, that);
            });
            this.worldSpeed = this.speed.still;
            this.guideProcess++; //第二/四步引导结束
        }
        if (this.guide && (this.guideProcess % 2 == 0) && that.flowerArr[0].type == 1 && Math.abs(this.bee.position[0] - this.flowerArr[0].boxBody.position[0]) < 1) {
            //第三次引导
            this.addChild(this.guide);
            this.guide.process_2.visible = false;
            this.guide.process_3.visible = true;
            this.guide.alpha = 0;
            egret.Tween.get(this.guide).to({ alpha: 1 }, 1000).call(function () {
                that.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchFun, that);
            });
            this.worldSpeed = this.speed.still;
            this.guideProcess++; //第三/五步引导结束
        }
        if (this.guide && this.guideProcess == 7 && that.hitNum == 7) {
            //引导结束
            this.addChild(this.guide);
            this.guide.process_7.visible = true;
            this.guide.alpha = 0;
            egret.Tween.get(this.guide).to({ alpha: 1 }, 1000);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
            userDataMaster.createLoginBtn(250, 808, 250, 90);
            userDataMaster.loginCallback = function () {
                userDataMaster.myGold += 200;
                userDataMaster.myInfo.is_new_user = false;
                var parent = that.parent;
                parent.removeChild(that);
                soundMaster.stopSongMusic();
                parent.addChild(new startScene());
            };
            this.guide.knowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                userDataMaster.myGold += 200;
                userDataMaster.myInfo.is_new_user = false;
                var parent = that.parent;
                parent.removeChild(that);
                soundMaster.stopSongMusic();
                parent.addChild(new startScene());
            }, that);
        }
        var dh = (that.bee.position[1] - that.flowerArr[0].boxBody.position[1]) * that.factor;
        var dw = Math.abs(that.bee.position[0] - that.flowerArr[0].boxBody.position[0]) - currentTheme.tw / 2 / that.factor;
        if (!that.flowerArr[0].haveHit && that.bee.velocity[1] <= 0 && dw <= 0 && (dh <= 357.5 - currentTheme.th - 10 && dh >= 150)) {
            var degreeInfo = randomTheme.getInstance().degreeItem;
            that.score += randomTheme.getInstance().getScore(that.currentTheme);
            that.energy += degreeInfo.energy;
            if (that.flowerArr[0].boxBody.displays[0].x + 30 >= that.bee.displays[0].x && that.flowerArr[0].boxBody.displays[0].x - 30 <= that.bee.displays[0].x) {
                // console.log('center')
                if (that.flowerArr[0].boxBody.displays[1].parent) {
                    that.flowerGroup.removeChild(that.flowerArr[0].boxBody.displays[1]);
                }
                that.perfectNum++;
                if (that.perfectNum >= 3) {
                    egret.Tween.removeTweens(that.perfectGroup);
                    that.perfectGroup.visible = true;
                    that.perfectGroup.scaleX = 2.5, that.perfectGroup.scaleY = 2.5;
                    that.perfectGroup.alpha = 1;
                    that.perfectGif.gotoAndPlay(0, 1);
                    that.perfectText.text = 'Combo x' + that.perfectNum;
                    that.score += 100;
                    that.addChildAt(that.perfectGroup, 2);
                    egret.Tween.get(that.perfectGroup).to({ scaleX: 1, scaleY: 1 }, 500).to({ alpha: 0 }, 2000).call(function () {
                        that.perfectGroup.parent && that.perfectGroup.parent.removeChild(that.perfectGroup);
                    });
                }
            }
            else {
                that.perfectNum = 0;
            }
            platform.vibrateShort({ success: function (res) { } });
            that.bee.mass = 3000;
            this.scoreText.text = this.score + '';
            that.flowerArr[0].haveHit = true;
            var r_1 = that.flowerArr.shift();
            r_1.boxBody.velocity = [0, -10];
            that.removeArr.push(r_1);
            var sx = 12;
            if (r_1.type == 1) {
                sx = 20;
                sx += Math.random() * 3;
                that.bee.angle = -0.2;
            }
            else if (r_1.type == 2) {
                sx = -20;
                sx -= Math.random() * 3;
                that.bee.angle = 0.2;
            }
            else {
                //这是是第一步结束，回复正常速度
                that.worldSpeed = this.speed.common;
            }
            that.bee.velocity = [sx, 36];
            that.bee.damping = 0.8;
            if (that.bee.velocity[0] > 0) {
                that.bee.angle = 0.2;
                that.bee.angularVelocity = 0;
            }
            else if (that.bee.velocity[0] < 0) {
                that.bee.angle = -0.2;
                that.bee.angularVelocity = 0;
            }
            else {
                that.bee.angularVelocity = 0.01;
            }
            that.hitNum++;
            var judgeHitNum = that.hitNum == degreeInfo.num;
            if (judgeHitNum) {
                that.hitNum = 0;
                if (that.currentTheme < that.themeArr.length) {
                    that.currentTheme++;
                }
                else {
                    //通关成功
                    that.successOver();
                    return;
                }
                // that.currentTheme < that.themeArr.length ? that.currentTheme++ : that.currentTheme = 1;
                currentTheme = that.themeArr[that.currentTheme - 1];
                // if (that.currentTheme % 2 == 1) {
                // 	that.worldSpeed = this.speed.common - Math.floor(that.currentTheme / 2) * 80;
                // }
                //场景切换
                colorBgCom.getInstance().changeTheme(that.currentTheme);
                var current = currentTheme.name;
                for (var i_1 = 0; i_1 < that.flowerArr.length; i_1++) {
                    that.flowerArr[i_1].boxBody.shapes[0].width = currentTheme.width / this.factor;
                    that.flowerArr[i_1].boxBody.displays[0].name = current;
                    if (i_1 == 0) {
                        that.flowerArr[i_1].boxBody.displays[0].texture = RES.getRes(current + '1_png');
                    }
                    else {
                        that.flowerArr[i_1].boxBody.displays[0].texture = RES.getRes(current + '2_png');
                    }
                    var mt = currentTheme.top + 10;
                    var ml = currentTheme.left;
                    that.flowerArr[i_1].boxBody.displays[1].y = stageHeight - that.flowerArr[i_1].boxBody.position[1] * this.factor - (that.flowerArr[i_1].boxBody.displays[0].height / 2 - mt) * that.flowerArr[i_1].boxBody.displays[0].scaleY;
                    that.flowerArr[i_1].boxBody.displays[1].x = that.flowerArr[i_1].boxBody.position[0] * this.factor - (that.flowerArr[i_1].boxBody.displays[0].width / 2 - ml) * that.flowerArr[i_1].boxBody.displays[0].scaleX;
                }
            }
            that.flowerArr[0].boxBody.displays[0].texture = RES.getRes(currentTheme.name + '1_png');
            egret.Tween.get(that.flowerArr[0].boxBody.displays[1]).to({ height: 313 }, 500);
            setTimeout(function () {
                var type = r_1.type == 2 ? 1 : 2;
                var building;
                if (that.buildingLoop[currentTheme.name].length > 2) {
                    building = that.buildingLoop[currentTheme.name].shift();
                    building.unpdateBuilding(type);
                }
                else {
                    building = new buildingCom(type, that.adaptation);
                    building.init(currentTheme);
                }
                that.world.addBody(building.boxBody);
                setTimeout(function () {
                    that.flowerGroup.addChildAt(building.boxBody.displays[0], 0);
                    that.flowerGroup.addChildAt(building.boxBody.displays[1], 1);
                }, 100);
                that.flowerArr.push(building);
            }, 50);
        }
        else {
            //是否撞墙
            var hitright = that.ceilArr[0].overlaps(that.bee);
            if (hitright && !(that.bee.velocity[0] < 0 && that.bee.velocity[1] > 0)) {
                that.bee.velocity = [-25, -8];
                that.bee.angle = -0.2;
                that.bee.mass = 8000;
            }
            var hitleft = that.ceilArr[1].overlaps(that.bee);
            if (hitleft && !(that.bee.velocity[0] > 0 && that.bee.velocity[1] > 0)) {
                that.bee.velocity = [25, -8];
                that.bee.angle = 0.2;
                that.bee.mass = 8000;
            }
        }
        if (that.bee.velocity[1] <= 0) {
            that.bee.damping = 0;
        }
        for (var x = 0, len_1 = that.removeArr.length; x < len_1; x++) {
            if (that.removeArr[x] && that.removeArr[x].boxBody && (!that.guide || !that.guide.parent)) {
                that.removeArr[x].afterHit(that.world, that.buildingLoop, that.removeArr, x);
            }
        }
        if (that.flowerArr[0].type !== 0) {
            for (var i_2 = 0, len_2 = that.flowerArr.length; i_2 < len_2; i_2++) {
                that.flowerArr[i_2].changeScale(that.speed.common, that.worldSpeed);
            }
        }
    };
    runningScene.prototype.successOver = function () {
        userDataMaster.degree++;
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
        soundMaster.stopSongMusic();
        var parent = this.parent;
        // let energy = parseInt(this.energy * (1 + this.energyAdd) + '');
        parent.addChild(new gameOver(this.score, this.currentBall, this.energy, this.energyAdd, 1));
        parent.removeChild(this);
    };
    runningScene.prototype.gameOver = function () {
        //died
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
        soundMaster.stopSongMusic();
        var pro = randomTheme.getInstance().getProccess(this.currentTheme, this.hitNum);
        if (this.rebornNum == 0) {
            //可复活
            this.rebornNum++;
            var born = new reborn(this.score, this.currentBall, this.energy, this.energyAdd, pro);
            this.addChild(born);
            born.rebornBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.judgeReborn, this);
        }
        else {
            var parent_1 = this.parent;
            // let energy = parseInt(this.energy * (1 + this.energyAdd) + '');
            parent_1.addChild(new gameOver(this.score, this.currentBall, this.energy, this.energyAdd, pro));
            parent_1.removeChild(this);
        }
    };
    runningScene.prototype.judgeReborn = function () {
        //video or share
        var that = this;
        AdMaster.useVideo(function () {
            suc();
        }, function () {
            // console.log('share')
            CallbackMaster.openShare(function () {
                suc();
            });
        });
        var suc = function () {
            var parent = that.parent;
            var theme = that.currentTheme;
            var score = that.score;
            var hitNum = that.hitNum;
            var currentBall = that.currentBall;
            var rebornNum = that.rebornNum;
            var energy = that.energy;
            var energyAdd = that.energyAdd;
            var themeArr = that.themeArr;
            parent.removeChild(that);
            parent.addChild(new runningScene(theme, score, hitNum, currentBall, rebornNum, energy, energyAdd, themeArr));
        };
    };
    runningScene.prototype.touchFun = function (e) {
        // console.log('touch')
        this.bee.velocity = [0, -80];
        this.bee.angle = 0;
        this.bee.angularVelocity = 0;
        if (this.guide && this.guide.parent) {
            this.guide.process_3.visible = false;
            this.guide['process_' + this.guideProcess].visible = false;
            this.guide.parent.removeChild(this.guide);
            this.worldSpeed = this.speed.guide;
            if (this.guideProcess < 7) {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
            }
        }
    };
    return runningScene;
}(eui.Component));
__reflect(runningScene.prototype, "runningScene", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=runningScene.js.map