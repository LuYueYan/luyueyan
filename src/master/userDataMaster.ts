class userDataMaster {
	public static myInfo: any = { uid: 0, openId: '', is_new_user: false };//用户信息
	public static gold = 3000;//能量果
	public static cats = [
		{ id: 1, name: '白白球', state: true, process: 1000, target: 1000, belong: [0, 2, 3], des: '描述1', music: '《水晶》' },
		{ id: 2, name: '摇滚球', state: false, process: 0, target: 2000, belong: [4, 2, 3], des: '描述2', music: '《幽默》' },
		{ id: 3, name: '水灵球', state: false, process: 0, target: 3000, belong: [5, 1, 3], des: '描述3', music: '《沙滩》' },
		{ id: 4, name: '跑酷球', state: false, process: 0, target: 4000, belong: [0, 2, 6], des: '描述4', music: '《超越》' },
		{ id: 5, name: '火火球', state: false, process: 0, target: 5000, belong: [1, 2, 7], des: '描述5', music: '《希望》' },
		{ id: 6, name: '黑洞球', state: false, process: 0, target: 6000, belong: [1, 8, 3], des: '描述6', music: '《迷宫》' },
		{ id: 7, name: '爆破球', state: false, process: 0, target: 7000, belong: [0, 3, 5], des: '描述7', music: '《时空》' },
		{ id: 8, name: '旋风球', state: false, process: 0, target: 8000, belong: [1, 6, 7], des: '描述8', music: '《海洋》' },
		{ id: 9, name: '懒懒球', state: false, process: 0, target: 10000, belong: [7, 8, 5], des: '描述9', music: '《星辰》' }
	];
	public static travels = [
		{ id: 1, name: '光之旅1', image: 'resource/assets/Aimg0301/img_imprinting_a1.png' },
		{ id: 2, name: '光之旅2', image: 'resource/assets/Aimg0301/img_imprinting_a1.png' },
		{ id: 3, name: '光之旅3', image: 'resource/assets/Aimg0301/img_imprinting_a1.png' },
		{ id: 4, name: '光之旅4', image: 'resource/assets/Aimg0301/img_imprinting_a1.png' },
		{ id: 5, name: '光之旅5', image: 'resource/assets/Aimg0301/img_imprinting_a1.png' },
		{ id: 6, name: '光之旅6', image: 'resource/assets/Aimg0301/img_imprinting_a1.png' },
		{ id: 7, name: '光之旅7', image: 'resource/assets/Aimg0301/img_imprinting_a1.png' },
		{ id: 8, name: '光之旅8', image: 'resource/assets/Aimg0301/img_imprinting_a1.png' },
		{ id: 9, name: '光之旅9', image: 'resource/assets/Aimg0301/img_imprinting_a1.png' }
	];
	public static dayEnergy;//上次领取每日能量的日期
	public static myCollection: eui.ArrayCollection;
	public static shareUid = 0;//分享人id
	public static sourceEnergy = { uid: 0, day: '' };//能量分享的原始id,日期
	public static bestScore = 0;//历史最高分
	public static userInfoBtn;
	public static haveNickName = false;//是否有用户昵称头像
	public static runCat = 0;//当前旅行的是哪个球
	public static recommand: any;//推荐位列表
	public static requestTimes = 0;//请求游戏数据的次数
	public constructor() {
	}
	public static shared: userDataMaster;
	public static getInstance() {
		if (!userDataMaster.shared) {
			userDataMaster.shared = new userDataMaster();
		}
		return userDataMaster.shared;
	}
	public static init() {
		let that = this;
		var sourceArr: any[] = [
			userDataMaster.gold,
			userDataMaster.cats,
			userDataMaster.travels,
			userDataMaster.runCat
		];
		//用 ArrayCollection 包装
		userDataMaster.myCollection = new eui.ArrayCollection(sourceArr);
		userDataMaster.login();
		userDataMaster.getRecommand();
	}
	public static getGameData() {
		let that = this;
		let uid = userDataMaster.myInfo.uid;
		userDataMaster.requestTimes++;
		if (uid != 0) {
			ServiceMaster.post(ServiceMaster.getGameData, { uid }, (res) => {
				if (res.code == 1 && res.data) {
					let data = res.data;
					if (data.energy > 0) {
						userDataMaster.myGold = data.energy;
					}
					if (data.spirit_data != '') {
						userDataMaster.MyCats = JSON.parse(data.spirit_data);
					}
					if (data.mark_data != '') {
						userDataMaster.myTravels = JSON.parse(data.mark_data);
					}
					if (data.info != '') {
						let info = JSON.parse(data.info);
						if (info.runCat >= 0) {
                           userDataMaster.runCat=info.runCat;
						}
						if(info.dayEnergy){
							userDataMaster.dayEnergy=info.dayEnergy;
						}
					}
				}
			})
		} else {
			if (userDataMaster.requestTimes < 5) {
				setTimeout(function () {
					userDataMaster.getGameData();
				}, 1000);
			}
		}

	}
	public static getRecommand() {
		//获取推荐位
		ServiceMaster.post(ServiceMaster.getGameList, {}, (res) => {
			if (res.code == 1 && res.data) {
				userDataMaster.recommand = res.data;
			}
		})
	}
	public static get myGold() {
		//获取能量果总数
		return userDataMaster.gold;
	}
	public static set myGold(gold) {
		//更新能量果总数
		userDataMaster.gold = gold;
		userDataMaster.myCollection.replaceItemAt(gold, 0);
	}
	public static get MyCats() {
		// 获取宠物列表数据
		return userDataMaster.cats;
	}
	public static set myRunCat(index) {
		//更新当前出行球球
		userDataMaster.runCat = index;
		userDataMaster.myCollection.replaceItemAt(index, 3);
	}
	public static setCat(index, cat) {
		//更新单个宠物数据 index--索引 cat--数据
		userDataMaster.cats[index] = cat;
		userDataMaster.myCollection.replaceItemAt(userDataMaster.cats, 1);
	}
	public static set MyCats(cats) {
		// 更新宠物列表数据
		userDataMaster.cats = cats;
		userDataMaster.myCollection.replaceItemAt(cats, 1);
	}
	public static get myTravels() {
		//旅行印记获取
		return userDataMaster.travels;
	}
	public static set myTravels(travels) {
		//修改旅行印记
		userDataMaster.travels = travels;
		userDataMaster.myCollection.replaceItemAt(travels, 2);
	}
	public static set getMyInfo(data) {
		userDataMaster.myInfo = data;
	}
	public static get getMyInfo() {
		return userDataMaster.myInfo;
	}
	public static getUserInfo(uid) {
		//获取用户道具信息

	}
	public static get todayEnergy() {
		//获取今日可领取能量状态
		if (userDataMaster.dayEnergy == userDataMaster.getToday()) {
			//今日已领取
			return false;
		}
		return true;
	}
	public static updateTodayEnergy() {
		//更改今日能量状态
		userDataMaster.dayEnergy = userDataMaster.getToday();
	}

	public static async createLoginBtn(left, top, width, height) {
		let that = this;
		let scale = DeviceMaster.screenWidth / 750;
		left *= scale, top *= scale, width *= scale, height *= scale;
		userDataMaster.userInfoBtn = await platform.createUserInfoButton({
			// type: 'image',
			type: 'text',
			text: '获取用户信息',
			// image: '../../resource/assets/imgData/img_yxbj.png',
			style: {
				left,
				top,
				width,
				height,
				lineHeight: 40,
				backgroundColor: '#ff0000',
				color: '#ffffff',
				textAlign: 'center',
				fontSize: 16,
				borderRadius: 4
			}
		})

		userDataMaster.userInfoBtn.onTap((res) => {
			userDataMaster.updateUser(res)

		})
	}
	public static async updateUser(res: any = null) {
		let userInfo = res.userInfo;
		let params: any = {
			uid: userDataMaster.getMyInfo.uid,
			nickName: userInfo.nickName,
			gender: userInfo.gender,
			avatarUrl: userInfo.avatarUrl
		};
		console.log(res)
		ServiceMaster.post(
			ServiceMaster.updateUser,
			params,
			function (suc) {
				if (parseInt(suc.code) === 1 && suc.data) {
					//修改用户信息成功
					userDataMaster.userInfoBtn && userDataMaster.userInfoBtn.destroy();
				}
			}
		);

	}
	public static async login(res: any = null) {
		let login = await platform.login();
		let params: any = {
			code: login.code
		};
		// if (res != null) {
		// 	params.encryptedData = res.encryptedData;
		// 	params.iv = res.iv
		// }
		if (userDataMaster.shareUid > 0) {
			params.pid = userDataMaster.shareUid;
		}
		ServiceMaster.post(
			ServiceMaster.logins,
			params,
			function (suc) {
				if (parseInt(suc.code) === 1 && suc.data) {
					//登录成功
					userDataMaster.getMyInfo = suc.data;
					// userDataMaster.userInfoBtn && userDataMaster.userInfoBtn.destroy();
					//初始化用户openid
					platform.openDataContext.postMessage({
						type: "openid",
						openid: suc.data.openId
					});
					userDataMaster.getUserInfo(suc.data.uid)
				}
			}
		);
	}
	public static getToday() {
		//获取格式化的当前日期
		let date = new Date();
		let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) + '' : '0' + (date.getMonth() + 1);
		let day = date.getDate() > 9 ? (date.getDate()) + '' : '0' + date.getDate();
		return date.getFullYear() + month + day;
	}

}
window['userDataMaster'] = userDataMaster