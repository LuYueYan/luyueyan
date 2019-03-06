var getToday = function () {
	//获取格式化的当前日期
	let date = new Date();
	let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) + '' : '0' + (date.getMonth() + 1);
	let day = date.getDate() > 9 ? (date.getDate()) + '' : '0' + date.getDate();
	return date.getFullYear() + month + day;
}
class userDataMaster {
	public static myInfo: any = { uid: 0, openId: '', is_new_user: false };//用户信息
	public static gold = 0;//能量果
	public static cats = [
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
	public static travels= [
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
	public static dayEnergy;
	public static myCollection: eui.ArrayCollection;
	public static shareUid = 0;//分享人id
	public static bestScore = 0;//历史最高分
	public static userInfoBtn;
	public static haveNickName = false;//是否有用户昵称头像
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
			userDataMaster.travels
		];
		//用 ArrayCollection 包装
		userDataMaster.myCollection = new eui.ArrayCollection(sourceArr);
		userDataMaster.login();
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
	public static get myTravels(){
		//旅行印记获取
		return userDataMaster.travels;
	}
	public static set myTravels(travels){
		//修改旅行印记
		userDataMaster.travels=travels;
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
	public static get todayEnergy(){
		//获取今日可领取能量状态
		if(userDataMaster.dayEnergy==getToday()){
			//今日已领取
			return false;
		}
		return true;
	}
	public static updateTodayEnergy(){
		//更改今日能量状态
		userDataMaster.dayEnergy=getToday();
	}

	public static async createLoginBtn(left, top, width, height) {
		let that = this;
		let scale = DeviceMaster.screenWidth / 750;
		left *= scale, top *= scale, width *= scale, height *= scale;
		userDataMaster.userInfoBtn = await platform.createUserInfoButton({
			type: 'image',
			// type: 'text',
			// text: '获取用户信息',
			image: '../../resource/assets/imgData/img_yxbj.png',
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
			userDataMaster.login(res)

		})
	}

	public static async login(res: any = null) {
		let login = await platform.login();
		let params: any = {
			code: login.code
		};
		if (res != null) {
			params.encryptedData = res.encryptedData;
			params.iv = res.iv
		}
		if (userDataMaster.shareUid > 0) {
			params.pid = userDataMaster.shareUid;
		}
		ServiceMaster.post(
			ServiceMaster.appLogin,
			params,
			function (suc) {
				if (parseInt(suc.code) === 1 && suc.data) {
					//登录成功

					userDataMaster.getMyInfo = suc.data;
					userDataMaster.userInfoBtn && userDataMaster.userInfoBtn.destroy();

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

}
window['userDataMaster'] = userDataMaster