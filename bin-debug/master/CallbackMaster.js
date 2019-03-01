var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CallbackMaster = (function () {
    function CallbackMaster() {
    }
    CallbackMaster.init = function () {
        ServiceMaster.post(ServiceMaster.getEdition, {}, function (suc) {
            if (suc.code == 1 && suc.data) {
                if (suc.data.edition_1 == 2) {
                    //审核通过，允许分享
                    CallbackMaster.hasChecked = true;
                }
            }
        });
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
                title: '全新连线2048，你能走出魔鬼的步伐吗？',
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
    CallbackMaster.recommandClick = function (gid, type) {
        if (type === void 0) { type = 1; }
        //推荐位点击统计
        var uid = userDataMaster.getMyInfo.uid;
        // ServiceMaster.post(
        // 	ServiceMaster.click,
        // 	{ gid, uid, type },
        // 	function (suc) {
        // 		if (suc.code == 1 && suc.data) {
        // 		}
        // 	})
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
