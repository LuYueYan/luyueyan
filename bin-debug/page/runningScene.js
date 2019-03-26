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
    function runningScene(theme, score, hitNum, currentBall, rebornNum, energy, energyAdd) {
        if (theme === void 0) { theme = 1; }
        if (score === void 0) { score = 0; }
        if (hitNum === void 0) { hitNum = 0; }
        if (currentBall === void 0) { currentBall = -1; }
        if (rebornNum === void 0) { rebornNum = 0; }
        if (energy === void 0) { energy = 0; }
        if (energyAdd === void 0) { energyAdd = 0; }
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
        _this.themeArr = [
            { index: 1, num: 15, score: 52, energy: 2, width: 340, tw: 270, left: 175, top: 60, name: 'img_castle_a', begin: 0x7a3fc3, end: 0x30368d },
            { index: 5, num: 30, score: 101, energy: 5, width: 340, tw: 280, left: 170, top: 72, name: 'img_castle_e', begin: 0xca5b49, end: 0x8f3234 },
            { index: 8, num: 25, score: 101, energy: 5, width: 340, tw: 270, left: 175, top: 55, name: 'img_castle_h', begin: 0xf8a5fd, end: 0xb295ff },
            { index: 9, num: 20, score: 101, energy: 5, width: 340, tw: 275, left: 170, top: 45, name: 'img_castle_i', begin: 0x4ddcae, end: 0x4dd4dc },
            { index: 10, num: 15, score: 101, energy: 5, width: 340, tw: 284, left: 175, top: 30, name: 'img_castle_j', begin: 0xd0faff, end: 0xc4d3ea },
            { index: 2, num: 20, score: 64, energy: 3, width: 250, tw: 215, left: 130, top: 55, name: 'img_castle_b', begin: 0x4a3fac, end: 0x192c6f },
            { index: 3, num: 30, score: 76, energy: 4, width: 250, tw: 178, left: 130, top: 45, name: 'img_castle_c', begin: 0xabdf85, end: 0x3ccd84 },
            { index: 6, num: 25, score: 101, energy: 5, width: 250, tw: 188, left: 130, top: 65, name: 'img_castle_f', begin: 0xf3d781, end: 0xdf7252 },
            { index: 4, num: 25, score: 88, energy: 5, width: 250, tw: 88, left: 118, top: 33, name: 'img_castle_d', begin: 0x9f3c70, end: 0x5f1c5a },
            { index: 7, num: 30, score: 101, energy: 5, width: 250, tw: 136, left: 132, top: 35, name: 'img_castle_g', begin: 0xffa7a0, end: 0xf4746c },
        ];
        //num--该主题的数量 score--单次击中分数 energy--单次击中能量 width--建筑总宽度 tw--接触面宽度 
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
        _this.currentBall = userDataMaster.runCat; //本局使用的球index
        _this.energy = 0; //本局获得的能量果数量
        _this.trying = false; //是否试玩
        _this.energyAdd = 0; //本局能量加成百分比
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
        this.worldSpeed = 1000000;
        that.randomTheme();
        this.scoreText.text = this.score + '';
        this.adaptation = (this.stage.stageHeight - 1334) / this.factor;
        var ball = userDataMaster.cats[this.currentBall];
        this.ballText.text = ball.name;
        //创建world
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING; //睡眠策略，提高性能
        this.world.gravity = [0, -60];
        this.createBee();
        this.createFlower('center');
        this.createFlower('right', 8);
        this.createFlower('left', 10);
        this.createFlower('right', 12);
        this.createFlower('left', 14);
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
            this.worldSpeed = 1000000;
        }
        egret.Tween.get(that.startBtn, { loop: true }).to({ scaleX: 0.8, scaleY: 0.8 }, 1000).to({ scaleX: 1, scaleY: 1 }, 1000);
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startFun, this);
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    runningScene.prototype.randomTheme = function () {
        var that = this;
        var arr = [];
        var sourceArr = this.themeArr;
        var len = 5;
        for (var i = 0; i < len; i++) {
            var ran = Math.floor(Math.random() * len);
            arr.push(sourceArr[ran]);
            sourceArr.splice(ran, 1);
        }
        this.themeArr = arr.concat(sourceArr);
        this.createBg(that.themeArr[that.currentTheme - 1].begin, that.themeArr[that.currentTheme - 1].end);
    };
    runningScene.prototype.createBg = function (begin, end) {
        if (!this.bgLinear) {
            this.bgLinear = new egret.Sprite();
            this.addChildAt(this.bgLinear, 0);
        }
        else {
            this.bgLinear.graphics.clear();
        }
        var matix = this.bgLinear.matrix;
        matix.createGradientBox(750 / 2, this.stage.stageHeight / 2, Math.PI / 2, 750 / 4, this.stage.stageHeight / 4);
        this.bgLinear.graphics.beginGradientFill(egret.GradientType.LINEAR, [begin, end], [1, 1], [0, 255], matix);
        this.bgLinear.graphics.drawRect(0, 0, 750, this.stage.stageHeight);
        this.bgLinear.graphics.endFill();
    };
    runningScene.prototype.startFun = function () {
        soundMaster.playSongMusic(this.currentBall);
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startFun, this);
        this.removeChild(this.startImg);
        this.removeChild(this.ballText);
        this.removeChild(this.startBg);
        if (this.guide) {
            this.guide.process_1.visible = false;
            this.guide.removeChild(this.startBtn);
            this.removeChild(this.guide);
            this.guideProcess = 1; //第一步引导完成
            this.worldSpeed = 1500;
        }
        else {
            this.removeChild(this.startBtn);
            this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
            this.worldSpeed = 2000; //第一步减速
        }
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
        var marginTop = that.themeArr[that.currentTheme - 1].top + 10;
        var marginLeft = that.themeArr[that.currentTheme - 1].left;
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
        if (this.guide && this.guideProcess == 1 && that.flowerArr[0].params.type == "right" && Math.abs(this.bee.position[0] - this.flowerArr[0].body.position[0]) < 1) {
            //第二次引导
            this.addChild(this.guide);
            this.guide.process_2.visible = true;
            this.guide.alpha = 0;
            egret.Tween.get(this.guide).to({ alpha: 1 }, 1000).call(function () {
                that.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchFun, that);
            });
            this.worldSpeed = 1000000;
            this.guideProcess = 2; //第二步引导结束
        }
        if (this.guide && this.guideProcess == 2 && that.flowerArr[0].params.type == "left" && Math.abs(this.bee.position[0] - this.flowerArr[0].body.position[0]) < 1) {
            //第三次引导
            this.addChild(this.guide);
            this.guide.process_3.visible = true;
            this.guide.alpha = 0;
            egret.Tween.get(this.guide).to({ alpha: 1 }, 1000).call(function () {
                that.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchFun, that);
            });
            this.worldSpeed = 1000000;
            this.guideProcess = 3; //第三步引导结束
        }
        if (this.guide && this.guideProcess == 3 && that.hitNum == 5) {
            //引导结束
            this.addChild(this.guide);
            this.guide.process_7.visible = true;
            this.guide.alpha = 0;
            egret.Tween.get(this.guide).to({ alpha: 1 }, 1000);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
            userDataMaster.createLoginBtn(250, 808, 250, 90);
            this.guide.knowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                userDataMaster.myGold += 200;
                userDataMaster.myInfo.is_new_user = false;
                var parent = that.parent;
                parent.removeChild(that);
                parent.addChild(new startScene());
            }, that);
        }
        var hitright = that.ceilArr[0].overlaps(that.bee);
        if (hitright) {
            that.bee.velocity = [-25, -8];
            that.bee.angle = -0.2;
            that.bee.mass = 8000;
        }
        var hitleft = that.ceilArr[1].overlaps(that.bee);
        if (hitleft) {
            that.bee.velocity = [25, -8];
            that.bee.angle = 0.2;
            that.bee.mass = 8000;
        }
        // let hit = that.flowerArr[0].body.overlaps(that.bee);
        // let top = (that.bee.position[1] - that.bee.displays[0].height / 2 / that.factor) - (that.flowerArr[0].body.position[1] + that.flowerArr[0].body.displays[0].height / 2 / that.factor);
        var dh = (that.bee.position[1] - that.flowerArr[0].body.position[1]) * that.factor;
        // let dw = Math.abs(that.bee.position[0] - that.flowerArr[0].body.position[0]) - that.flowerArr[0].body.displays[0].width / 2/that.factor;
        var dw = Math.abs(that.bee.position[0] - that.flowerArr[0].body.position[0]) - that.themeArr[that.currentTheme - 1].tw / 2 / that.factor;
        if (!that.flowerArr[0].params.haveHit && that.bee.velocity[1] <= 0 && dw <= 0 && dh <= 357.5 - 10 && dh >= 230) {
            if (that.flowerArr[0].body.displays[0].x + 30 >= that.bee.displays[0].x && that.flowerArr[0].body.displays[0].x - 30 <= that.bee.displays[0].x) {
                // console.log('center')
                if (that.flowerArr[0].body.displays[1].parent) {
                    that.buildingLoop.lightning.push(that.flowerArr[0].body.displays[1]);
                    that.flowerGroup.removeChild(that.flowerArr[0].body.displays[1]);
                }
                that.perfectNum++;
                if (that.perfectNum >= 3) {
                    egret.Tween.removeTweens(that.perfectGroup);
                    that.perfectGroup.visible = true;
                    that.perfectGroup.scaleX = 0, that.perfectGroup.scaleY = 0, that.perfectGroup.alpha = 1;
                    that.perfectText.text = 'Perfect x' + that.perfectNum;
                    that.addChildAt(that.perfectGroup, 2);
                    egret.Tween.get(that.perfectGroup).to({ scaleX: 1, scaleY: 1 }, 500).to({ alpha: 0 }, 2000).call(function () {
                        that.perfectGroup.parent && that.perfectGroup.parent.removeChild(that.perfectGroup);
                    });
                }
            }
            else {
                that.perfectNum = 0;
            }
            that.score += that.themeArr[that.currentTheme - 1].score;
            that.energy += that.themeArr[that.currentTheme - 1].energy;
            platform.vibrateShort({ success: function (res) { } });
            that.bee.mass = 2000;
            this.scoreText.text = this.score + '';
            that.flowerArr[0].params.haveHit = true;
            var r = that.flowerArr.shift();
            r.body.velocity = [0, -10];
            that.removeArr.push(r);
            var sx = 15;
            if (r.params.type == 'left') {
                sx = 20;
                sx += Math.random() * 3;
                that.bee.angle = -0.2;
            }
            else if (r.params.type == 'right') {
                sx = -20;
                sx -= Math.random() * 3;
                that.bee.angle = 0.2;
            }
            else {
                //这是是第一步结束，回复正常速度
                that.worldSpeed = 1000;
            }
            that.bee.velocity = [sx, 36];
            that.bee.damping = 0.85;
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
            var judgeHitNum = that.hitNum == that.themeArr[that.currentTheme - 1].num;
            if (judgeHitNum) {
                // if(that.trying){
                // 	//是试玩
                // 	that.removeEventListener(egret.Event.ENTER_FRAME, that.onEnterFrame, that);
                // 	that.addChild(new tryModal(that.currentBall));
                // 	that.worldSpeed=100000;
                // 	return;
                // }
                that.hitNum = 0;
                that.currentTheme < that.themeArr.length ? that.currentTheme++ : that.currentTheme = 1;
                //难度增大
                this.worldSpeed = 1000 - that.currentTheme * 80;
                this.createBg(that.themeArr[that.currentTheme - 1].begin, that.themeArr[that.currentTheme - 1].end);
                var current = that.themeArr[that.currentTheme - 1].name;
                for (var i_1 = 0; i_1 < that.flowerArr.length; i_1++) {
                    that.flowerArr[i_1].body.shapes[0].width = this.themeArr[this.currentTheme - 1].width / this.factor;
                    if (i_1 == 0) {
                        that.flowerArr[i_1].body.displays[0].texture = RES.getRes(current + '1_png');
                    }
                    else {
                        that.flowerArr[i_1].body.displays[0].texture = RES.getRes(current + '2_png');
                    }
                    var mt = that.themeArr[that.currentTheme - 1].top + 10;
                    var ml = that.themeArr[that.currentTheme - 1].left;
                    that.flowerArr[i_1].body.displays[1].y = stageHeight - that.flowerArr[i_1].body.position[1] * this.factor - (that.flowerArr[i_1].body.displays[0].height / 2 - mt) * that.flowerArr[i_1].body.displays[0].scaleY;
                    that.flowerArr[i_1].body.displays[1].x = that.flowerArr[i_1].body.position[0] * this.factor - (that.flowerArr[i_1].body.displays[0].width / 2 - ml) * that.flowerArr[i_1].body.displays[0].scaleX;
                }
                // that.throughFun();
            }
            var cur = that.themeArr[that.currentTheme - 1].name;
            that.flowerArr[0].body.displays[0].texture = RES.getRes(cur + '1_png');
            egret.Tween.get(that.flowerArr[0].body.displays[1]).to({ height: 313 }, 500);
            var type = r.params.type == 'right' ? 'left' : 'right';
            that.createFlower(type);
        }
        if (that.bee.velocity[1] <= 0) {
            that.bee.damping = 0;
        }
        for (var x = 0, len_1 = that.removeArr.length; x < len_1; x++) {
            if (that.removeArr[x] && that.removeArr[x].body && (!that.guide || !that.guide.parent)) {
                that.removeArr[x].body.displays[0].scaleX += 0.005;
                if (that.removeArr[x].body.position[1] < -4) {
                    that.world.removeBody(that.removeArr[x].body);
                    if (that.removeArr[x].body.displays[0] && that.removeArr[x].body.displays[0].parent) {
                        that.buildingLoop[that.removeArr[x].body.displays[0].name].push(that.removeArr[x].body.displays[0]);
                        that.flowerGroup.removeChild(that.removeArr[x].body.displays[0]);
                    }
                    if (that.removeArr[x].body.displays[1] && that.removeArr[x].body.displays[1].parent) {
                        that.buildingLoop.lightning.push(that.removeArr[x].body.displays[1]);
                        that.flowerGroup.removeChild(that.removeArr[x].body.displays[1]);
                    }
                    that.removeArr.shift();
                    x > 0 && x--;
                }
            }
        }
        if (that.flowerArr[0].params.type !== "center") {
            var cur = that.themeArr[that.currentTheme - 1].name;
            for (var i_2 = 0; i_2 < 5; i_2++) {
                if (that.flowerArr[i_2].body.displays[0].scaleX < 1) {
                    that.flowerArr[i_2].body.displays[0].scaleX += 0.001 * 1000 / that.worldSpeed;
                    that.flowerArr[i_2].body.displays[0].scaleY += 0.001 * 1000 / that.worldSpeed;
                    that.flowerArr[i_2].body.displays[1].scaleX += 0.001 * 1000 / that.worldSpeed;
                    that.flowerArr[i_2].body.displays[1].scaleY += 0.001 * 1000 / that.worldSpeed;
                    that.flowerArr[i_2].body.velocity[1] = -2;
                }
            }
        }
    };
    runningScene.prototype.gameOver = function () {
        //died
        this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
        if (this.rebornNum == 0) {
            //可复活
            this.rebornNum++;
            var born = new reborn(this.score, this.currentBall, this.energy, this.energyAdd);
            this.addChild(born);
            born.rebornBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.judgeReborn, this);
        }
        else {
            var parent_1 = this.parent;
            var energy = parseInt(this.energy * (1 + this.energyAdd) + '');
            parent_1.addChild(new gameOver(this.score, this.currentBall, energy));
            parent_1.removeChild(this);
        }
    };
    runningScene.prototype.judgeReborn = function () {
        //video or share
        var that = this;
        AdMaster.useVideo(function () {
            suc();
        }, function () {
            console.log('share');
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
            parent.removeChild(that);
            parent.addChild(new runningScene(theme, score, hitNum, currentBall, rebornNum, energy, energyAdd));
        };
    };
    runningScene.prototype.createBee = function () {
        var boxShape = new p2.Box({ width: 3.2, height: 3.2, material: new p2.Material(1) });
        this.bee = new p2.Body({ mass: 5000, position: [7.5, 20 + this.adaptation] });
        // this.bee.gravityScale = 0;
        this.bee.collisionResponse = false;
        this.bee.addShape(boxShape);
        this.world.addBody(this.bee);
        var display = new egret.Bitmap();
        var texture = RES.getRes('img_elf_' + this.currentBall + '2_png');
        display.texture = texture;
        display.width = 160;
        display.height = 160;
        display.anchorOffsetX = display.width / 2;
        display.anchorOffsetY = display.height / 2;
        this.bee.displays = [display];
        this.addChild(display);
    };
    runningScene.prototype.createFlower = function (type, y) {
        if (type === void 0) { type = 'left'; }
        if (y === void 0) { y = 14; }
        var that = this;
        var width = that.themeArr[that.currentTheme - 1].width / that.factor;
        var boxShape = new p2.Box({ width: width, height: 11.1, material: new p2.Material(2) });
        var boxBody = new p2.Body({ mass: 500, gravityScale: 0, type: p2.Body.KINEMATIC });
        var display = that.createBitmapByName(that.themeArr[that.currentTheme - 1].name);
        display.name = that.themeArr[that.currentTheme - 1].name;
        display.anchorOffsetX = display.width / 2;
        display.anchorOffsetY = display.height / 2;
        display.x = display.width / 2;
        display.y = display.height / 2;
        display.scaleX = 0.8;
        display.scaleY = 0.8;
        var ran = Math.random() > 0.5 ? -Math.random() * 2 : Math.random() * 2;
        if (type == 'center') {
            boxBody.position = [7.5, 6 + that.adaptation];
            display.texture = RES.getRes(that.themeArr[that.currentTheme - 1].name + '1_png');
        }
        else if (type == 'left') {
            boxBody.position = [5 + ran, y + that.adaptation];
        }
        else {
            boxBody.position = [12 + ran, y + that.adaptation];
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
        that.world.addBody(boxBody);
        setTimeout(function () {
            that.flowerGroup.addChildAt(display, 0);
            that.flowerGroup.addChildAt(lightning, 1);
        }, 100);
        that.flowerArr.push({ body: boxBody, params: { type: type, haveHit: false } });
    };
    runningScene.prototype.touchFun = function (e) {
        console.log('touch');
        this.bee.velocity = [0, -80];
        // this.bee.gravityScale = 1;
        this.bee.angle = 0;
        this.bee.angularVelocity = 0;
        if (this.guide && this.guide.parent) {
            this.guide['process_' + this.guideProcess].visible = false;
            this.guide.parent.removeChild(this.guide);
            this.worldSpeed = 5000;
            if (this.guideProcess < 3) {
                this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
            }
        }
    };
    runningScene.prototype.throughFun = function () {
        var that = this;
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchFun, this);
        that.through = new throughModal();
        this.addChild(that.through);
        that.worldSpeed = 10000;
        var t = 500;
        if (this.guide && this.guideProcess == 3) {
            //引导
            that.through.addChild(this.guide);
            this.guide.addChild(that.through.tap_1);
            this.guide.addChild(that.through.tap_2);
            this.guide.process_4.visible = true;
            that.list = [1, 2, 1];
            t = 1000;
        }
        for (var i = 0; i < 3; i++) {
            if (that.list.length == i) {
                var ran = Math.random() > 0.5 ? 2 : 1;
                that.list.push(ran);
            }
            that.through['item_' + i].texture = RES.getRes('img_click_0' + that.list[i] + '_png');
        }
        that.terval = setInterval(function () {
            if (that.through.processMask.width > 0) {
                that.through.processMask.width -= 20;
                that.through.process.mask = that.through.processMask;
            }
            else {
                clearInterval(that.terval);
                that.throughEndFun(false);
            }
        }, t);
        that.through.tap_1.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { that.chooseFun(1); }, this);
        that.through.tap_2.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { that.chooseFun(2); }, this);
    };
    runningScene.prototype.throughEndFun = function (type) {
        var that = this;
        if (type) {
            that.removeChild(that.through);
            if (this.guide && this.guide.parent && this.guideProcess == 6) {
                this.addChild(this.guide);
                this.guide.process_6.visible = false;
                this.guide.removeChild(this.through.tap_1);
                this.guide.removeChild(this.through.tap_2);
                this.guide.process_7.visible = true;
                userDataMaster.createLoginBtn(250, 808, 440, 204);
                this.guide.knowBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    userDataMaster.myGold += 200;
                    userDataMaster.myInfo.is_new_user = false;
                    var parent = that.parent;
                    parent.removeChild(that);
                    parent.addChild(new startScene());
                    // that.worldSpeed = 1000;
                    // that.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchFun, that);
                }, that);
            }
            else {
                var speed = Math.random() > 0.7 ? 800 : 1000;
                this.worldSpeed = speed;
                that.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, that.touchFun, that);
            }
        }
        else {
            that.removeChild(that.through);
            that.gameOver();
        }
    };
    runningScene.prototype.chooseFun = function (type) {
        var len = this.chooseList.length;
        if (this.list[len] == type) {
            this.through['item_' + len].alpha = 1;
            this.chooseList.push(type);
            if (this.guide && this.guide.parent && this.guideProcess >= 3 && this.guideProcess < 6) {
                this.guideProcess++;
                this.guide['process_' + (this.guideProcess + 1)].visible = true;
            }
            if (this.chooseList.length == 3) {
                //通过
                this.chooseList = [];
                this.list = [];
                clearInterval(this.terval);
                this.throughEndFun(true);
            }
        }
        else if (this.guide && this.guide.parent) {
            return;
        }
        else {
            clearInterval(this.terval);
            this.throughEndFun(false);
        }
    };
    runningScene.prototype.createBitmapByName = function (name) {
        var that = this;
        if ((name !== 'lightning' && that.buildingLoop[name].length > 0) || that.buildingLoop[name].length > 5) {
            var item = that.buildingLoop[name].shift();
            item.texture = RES.getRes(name + '2_png');
            item.scaleX = 1, item.scaleY = 1;
            return item;
        }
        else {
            var result = new egret.Bitmap();
            var texture = RES.getRes(name + '2_png');
            result.texture = texture;
            return result;
        }
    };
    return runningScene;
}(eui.Component));
__reflect(runningScene.prototype, "runningScene", ["eui.UIComponent", "egret.DisplayObject"]);
