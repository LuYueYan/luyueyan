var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CallbackMaster = (function () {
    function CallbackMaster() {
    }
    CallbackMaster.init = function () {
        //右上角分享
        var obj = {
            query: 'type=newUser&uid=' + userDataMaster.getMyInfo.uid
        };
        platform.onShareAppMessage(obj);
        platform.onShow(function () {
            if (new Date().getTime() - CallbackMaster.shareTime > 3000) {
                //超过三秒，算分享成功
                CallbackMaster.shareSuc && CallbackMaster.shareSuc();
                CallbackMaster.saveShareSuc = null;
            }
            else {
                CallbackMaster.saveShareSuc = CallbackMaster.shareSuc;
                //分享失败弹窗
                var obj_1 = {
                    title: '温馨提示',
                    content: '分享到不同的群才能获得奖励哦~',
                    confirmText: '再试一次',
                    success: function (res) {
                        if (res.confirm) {
                            CallbackMaster.openShare(CallbackMaster.saveShareSuc);
                        }
                    }
                };
                platform.showModal(obj_1);
            }
            CallbackMaster.shareSuc = null;
        });
        platform.onHide(function () {
            soundMaster.soundChannel && soundMaster.soundChannel.stop();
            //存储数据
            CallbackMaster.onHideFun && CallbackMaster.onHideFun();
            //存储游戏数据
            var spirit_data = JSON.stringify(userDataMaster.MyCats);
            var mark_data = JSON.stringify(userDataMaster.myTravels);
            var info = {
                runCat: userDataMaster.runCat,
                dayEnergy: userDataMaster.dayEnergy,
                dayTry: userDataMaster.dayTry,
                travelList: userDataMaster.travelList
            };
            var params = {
                uid: userDataMaster.getMyInfo.uid,
                energy: userDataMaster.myGold,
                spirit_data: spirit_data,
                mark_data: mark_data,
                info: JSON.stringify(info)
            };
            ServiceMaster.post(ServiceMaster.setGameData, params, function (res) {
                if (res.code == 1 && res.data) {
                }
            });
        });
    };
    CallbackMaster.openShare = function (Callback, judge, query) {
        if (Callback === void 0) { Callback = null; }
        if (judge === void 0) { judge = true; }
        if (query === void 0) { query = ''; }
        //参数1---回调函数 参数2---是否判断分享成功，默认判断
        // 好友助力
        if (CallbackMaster.hasChecked) {
            //如果审核通过了
            var obj = {
                query: 'uid=' + userDataMaster.getMyInfo.uid + query
            };
            platform.shareAppMessage(obj);
            CallbackMaster.shareTime = judge ? new Date().getTime() : 0;
            CallbackMaster.shareSuc = Callback;
        }
    };
    CallbackMaster.openHide = function (Callback) {
        if (Callback === void 0) { Callback = null; }
        CallbackMaster.onHideFun = Callback;
    };
    CallbackMaster.recommandClick = function (type, item) {
        if (type === void 0) { type = 1; }
        //推荐位点击统计
        var uid = userDataMaster.getMyInfo.uid;
        var params = {
            id: item.id,
            uid: uid,
            appid: item.appid,
            type: type,
            module_id: item.module_id,
            module_ext_id: item.module_ext_id
        };
        ServiceMaster.post(ServiceMaster.gameClick, params, function (suc) {
            if (suc.code == 1 && suc.data) {
            }
        });
    };
    CallbackMaster.shareSuc = null; //分享成功回调
    CallbackMaster.shareTime = 0; //分享的时间
    CallbackMaster.onHideFun = null; //页面进入后台回调
    //审核是否通过
    CallbackMaster.hasChecked = false;
    CallbackMaster.saveShareSuc = null; //保存上次分享的回调
    return CallbackMaster;
}());
__reflect(CallbackMaster.prototype, "CallbackMaster");
//# sourceMappingURL=CallbackMaster.js.map