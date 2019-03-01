class CallbackMaster {
	public static shareSuc: Function = null;//分享成功回调
	public static shareTime = 0;//分享的时间
	public static onHideFun: Function = null;//页面进入后台回调
	//审核是否通过
	public static hasChecked: boolean = false;

	public static saveShareSuc = null;//保存上次分享的回调
	public constructor() {
	}
	public static init() {
		ServiceMaster.post(
			ServiceMaster.getEdition,
			{},
			function (suc) {
				if (suc.code == 1 && suc.data) {
					if (suc.data.edition_1 == 2) {
						//审核通过，允许分享
						CallbackMaster.hasChecked = true;
					}
				}
			})
		//右上角分享
		let obj = {
			query: 'type=newUser&uid=' + userDataMaster.getMyInfo.uid
		};
		platform.onShareAppMessage(obj);
		platform.onShow(() => {
			if (new Date().getTime() - CallbackMaster.shareTime > 3000) {
				//超过三秒，算分享成功
				CallbackMaster.shareSuc && CallbackMaster.shareSuc();
				CallbackMaster.saveShareSuc = null;
			} else {
				CallbackMaster.saveShareSuc = CallbackMaster.shareSuc;
				//分享失败弹窗
				let obj = {
					title: '温馨提示',
					content: '分享到不同的群才能获得奖励哦~',
					confirmText: '再试一次',
					success(res) {
						if (res.confirm) {
							CallbackMaster.openShare(CallbackMaster.saveShareSuc)
						}
					}
				}
				platform.showModal(obj);
			}
			CallbackMaster.shareSuc = null;
		})
		platform.onHide(() => {
			soundMaster.soundChannel && soundMaster.soundChannel.stop();
			//存储数据
			CallbackMaster.onHideFun && CallbackMaster.onHideFun();
		})
	}
	public static openShare(Callback: Function = null, judge = true,query='') {
		//参数1---回调函数 参数2---是否判断分享成功，默认判断
		// 好友助力
		if (CallbackMaster.hasChecked) {
			//如果审核通过了
			let obj = {
				title: '全新连线2048，你能走出魔鬼的步伐吗？',
				query: 'uid=' + userDataMaster.getMyInfo.uid+query
			};
			platform.shareAppMessage(obj);
			CallbackMaster.shareTime = judge ? new Date().getTime() : 0;
			CallbackMaster.shareSuc = Callback;
		}
	}
	public static openHide(Callback: Function = null) {
		CallbackMaster.onHideFun = Callback;
	}
	public static recommandClick(gid, type = 1) {
		//推荐位点击统计
		let uid = userDataMaster.getMyInfo.uid;
		// ServiceMaster.post(
		// 	ServiceMaster.click,
		// 	{ gid, uid, type },
		// 	function (suc) {
		// 		if (suc.code == 1 && suc.data) {

		// 		}
		// 	})

	}

}