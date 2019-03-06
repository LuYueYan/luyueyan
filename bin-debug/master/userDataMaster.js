var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var getToday = function () {
    //获取格式化的当前日期
    var date = new Date();
    var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) + '' : '0' + (date.getMonth() + 1);
    var day = date.getDate() > 9 ? (date.getDate()) + '' : '0' + date.getDate();
    return date.getFullYear() + month + day;
};
var userDataMaster = (function () {
    function userDataMaster() {
    }
    userDataMaster.getInstance = function () {
        if (!userDataMaster.shared) {
            userDataMaster.shared = new userDataMaster();
        }
        return userDataMaster.shared;
    };
    userDataMaster.init = function () {
        var that = this;
        var sourceArr = [
            userDataMaster.gold,
            userDataMaster.cats,
            userDataMaster.travels
        ];
        //用 ArrayCollection 包装
        userDataMaster.myCollection = new eui.ArrayCollection(sourceArr);
        userDataMaster.login();
    };
    Object.defineProperty(userDataMaster, "myGold", {
        get: function () {
            //获取能量果总数
            return userDataMaster.gold;
        },
        set: function (gold) {
            //更新能量果总数
            userDataMaster.gold = gold;
            userDataMaster.myCollection.replaceItemAt(gold, 0);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(userDataMaster, "MyCats", {
        get: function () {
            // 获取宠物列表数据
            return userDataMaster.cats;
        },
        set: function (cats) {
            // 更新宠物列表数据
            userDataMaster.cats = cats;
            userDataMaster.myCollection.replaceItemAt(cats, 1);
        },
        enumerable: true,
        configurable: true
    });
    userDataMaster.setCat = function (index, cat) {
        //更新单个宠物数据 index--索引 cat--数据
        userDataMaster.cats[index] = cat;
        userDataMaster.myCollection.replaceItemAt(userDataMaster.cats, 1);
    };
    Object.defineProperty(userDataMaster, "myTravels", {
        get: function () {
            //旅行印记获取
            return userDataMaster.travels;
        },
        set: function (travels) {
            //修改旅行印记
            userDataMaster.travels = travels;
            userDataMaster.myCollection.replaceItemAt(travels, 2);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(userDataMaster, "getMyInfo", {
        get: function () {
            return userDataMaster.myInfo;
        },
        set: function (data) {
            userDataMaster.myInfo = data;
        },
        enumerable: true,
        configurable: true
    });
    userDataMaster.getUserInfo = function (uid) {
        //获取用户道具信息
    };
    Object.defineProperty(userDataMaster, "todayEnergy", {
        get: function () {
            //获取今日可领取能量状态
            if (userDataMaster.dayEnergy == getToday()) {
                //今日已领取
                return false;
            }
            return true;
        },
        enumerable: true,
        configurable: true
    });
    userDataMaster.updateTodayEnergy = function () {
        //更改今日能量状态
        userDataMaster.dayEnergy = getToday();
    };
    userDataMaster.createLoginBtn = function (left, top, width, height) {
        return __awaiter(this, void 0, void 0, function () {
            var that, scale, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        that = this;
                        scale = DeviceMaster.screenWidth / 750;
                        left *= scale, top *= scale, width *= scale, height *= scale;
                        _a = userDataMaster;
                        return [4 /*yield*/, platform.createUserInfoButton({
                                type: 'image',
                                // type: 'text',
                                // text: '获取用户信息',
                                image: '../../resource/assets/imgData/img_yxbj.png',
                                style: {
                                    left: left,
                                    top: top,
                                    width: width,
                                    height: height,
                                    lineHeight: 40,
                                    backgroundColor: '#ff0000',
                                    color: '#ffffff',
                                    textAlign: 'center',
                                    fontSize: 16,
                                    borderRadius: 4
                                }
                            })];
                    case 1:
                        _a.userInfoBtn = _b.sent();
                        userDataMaster.userInfoBtn.onTap(function (res) {
                            userDataMaster.login(res);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    userDataMaster.login = function (res) {
        if (res === void 0) { res = null; }
        return __awaiter(this, void 0, void 0, function () {
            var login, params;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, platform.login()];
                    case 1:
                        login = _a.sent();
                        params = {
                            code: login.code
                        };
                        if (res != null) {
                            params.encryptedData = res.encryptedData;
                            params.iv = res.iv;
                        }
                        if (userDataMaster.shareUid > 0) {
                            params.pid = userDataMaster.shareUid;
                        }
                        ServiceMaster.post(ServiceMaster.appLogin, params, function (suc) {
                            if (parseInt(suc.code) === 1 && suc.data) {
                                //登录成功
                                userDataMaster.getMyInfo = suc.data;
                                userDataMaster.userInfoBtn && userDataMaster.userInfoBtn.destroy();
                                //初始化用户openid
                                platform.openDataContext.postMessage({
                                    type: "openid",
                                    openid: suc.data.openId
                                });
                                userDataMaster.getUserInfo(suc.data.uid);
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    userDataMaster.myInfo = { uid: 0, openId: '', is_new_user: false }; //用户信息
    userDataMaster.gold = 0; //能量果
    userDataMaster.cats = [
        { id: 1, name: '肉肉球1', state: true, process: 0 },
        { id: 2, name: '球球球2', state: false, process: 0 },
        { id: 3, name: '球球球3', state: false, process: 0 },
        { id: 4, name: '球球球4', state: false, process: 0 },
        { id: 5, name: '球球球5', state: false, process: 0 },
        { id: 6, name: '球球球6', state: false, process: 0 },
        { id: 7, name: '球球球7', state: false, process: 0 },
        { id: 8, name: '球球球8', state: false, process: 0 },
        { id: 9, name: '球球球9', state: false, process: 0 }
    ];
    userDataMaster.travels = [
        { id: 1, name: '光之旅', image: 'resource/assets/Aimages/bee.png' },
        { id: 2, name: '光之旅', image: 'resource/assets/Aimages/bee.png' },
        { id: 3, name: '光之旅', image: 'resource/assets/Aimages/bee.png' },
        { id: 4, name: '光之旅', image: 'resource/assets/Aimages/bee.png' },
        { id: 5, name: '光之旅', image: 'resource/assets/Aimages/bee.png' },
        { id: 6, name: '光之旅', image: 'resource/assets/Aimages/bee.png' },
        { id: 7, name: '光之旅', image: 'resource/assets/Aimages/bee.png' },
        { id: 8, name: '光之旅', image: 'resource/assets/Aimages/bee.png' },
        { id: 9, name: '光之旅', image: 'resource/assets/Aimages/bee.png' }
    ];
    userDataMaster.shareUid = 0; //分享人id
    userDataMaster.bestScore = 0; //历史最高分
    userDataMaster.haveNickName = false; //是否有用户昵称头像
    return userDataMaster;
}());
__reflect(userDataMaster.prototype, "userDataMaster");
window['userDataMaster'] = userDataMaster;
