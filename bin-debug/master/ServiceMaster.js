var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ServiceMaster = (function () {
    //构造函数
    function ServiceMaster() {
    }
    ServiceMaster.getInstance = function () {
        if (!ServiceMaster.instance)
            ServiceMaster.instance = new ServiceMaster();
        return ServiceMaster.instance;
    };
    /**
     * 对obj的 属性名进行sort排序
     * 并返回属性名sort排序后的对象
     * @param object param 需要进行排序的对象
     * @return object newparam 排序完成的新对象
     */
    ServiceMaster.objSort = function (param) {
        //(1)Object内置类的keys()方法获取要排序对象的属性名(Array)
        //(2)利用Array原型上的sort()方法对获取的属性名进行排序(Array)
        var newkeyArray = Object.keys(param).sort();
        var newParam = {}; //创建一个新的对象，用于存放排好序的键值对(Object)
        //遍历newkeyArray数组   
        for (var i = 0; i < newkeyArray.length; i++) {
            newParam[newkeyArray[i]] = param[newkeyArray[i]]; //向新创建的对象中按照排好的顺序依次增加键值对
        }
        return newParam; //返回排好序的新对象
    };
    /**
     * 生成token值
     * @param object param 进行远程请求的所有参数[没有token]
     * @return string token
     */
    ServiceMaster.createToken = function (param) {
        //验证token属性是否存在
        if (typeof (param.token) != "undefined") {
            //如果存在token属性则进行删除
            delete param.token;
        }
        //对param进行sort排序
        var newParam = ServiceMaster.objSort(param);
        var tokenString = '';
        for (var i in newParam) {
            tokenString += tokenString ? '&' : '';
            tokenString += i + '=' + newParam[i];
        }
        tokenString += '!@#$%^&*'; //添加混淆字符串
        return new md5().hex_md5(tokenString);
    };
    //发起请求
    ServiceMaster.request = function (api, method, param, complete, error, progress) {
        if (method === void 0) { method = 'POST'; }
        if (param === void 0) { param = {}; }
        if (complete === void 0) { complete = null; }
        if (error === void 0) { error = null; }
        if (progress === void 0) { progress = null; }
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open(api, egret.HttpMethod[method]);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        param.token = this.createToken(param);
        request.send(this.obj2str(param, true));
        request.addEventListener(egret.Event.COMPLETE, function () {
            if (complete)
                complete(JSON.parse(request.response));
        }, this);
        if (error)
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, error, this);
        if (progress)
            request.addEventListener(egret.ProgressEvent.PROGRESS, progress, this);
    };
    //发起POST请求
    ServiceMaster.post = function (api, param, complete, error, progress) {
        if (param === void 0) { param = {}; }
        if (complete === void 0) { complete = null; }
        if (error === void 0) { error = null; }
        if (progress === void 0) { progress = null; }
        ServiceMaster.request(ServiceMaster.DOMAIN + api, ServiceMaster.METHOD_POST, param, complete, error, progress);
    };
    //发起GET请求
    ServiceMaster.get = function (api, param, complete, error, progress) {
        if (param === void 0) { param = {}; }
        if (complete === void 0) { complete = null; }
        if (error === void 0) { error = null; }
        if (progress === void 0) { progress = null; }
        ServiceMaster.request(ServiceMaster.DOMAIN + api, ServiceMaster.METHOD_GET, param, complete, error, progress);
    };
    /**
     * 将请求参数转化字符串
     */
    ServiceMaster.obj2str = function (param, change) {
        if (change === void 0) { change = false; }
        var str = '';
        for (var k in param) {
            if (change && (k == 'encryptedData' || k == 'iv')) {
                str += '&' + k + '=' + encodeURI(param[k]).replace(/\+/g, '%2B');
            }
            else {
                str += '&' + k + '=' + param[k];
            }
        }
        return str.substring(1);
    };
    //域名
    ServiceMaster.DOMAIN = 'https://newbox.0e3.cn/number_eliminate';
    //请求方式
    ServiceMaster.METHOD_POST = 'POST';
    ServiceMaster.METHOD_GET = 'GET';
    //接口
    ServiceMaster.appLogin = '/user/appLogin'; //登陆
    ServiceMaster.getGameList = '/other/getGameList'; //获取更多游戏列表
    ServiceMaster.getAdList = '/other/getAdList'; //获取广告列表
    ServiceMaster.updateUserInfo = '/user/updateUserInfo'; //更新用户道具
    ServiceMaster.getUserInfo = '/user/getUserInfo'; //获取用户道具
    ServiceMaster.getEdition = '/other/getEdition'; //获取审核状态
    ServiceMaster.getBannerAdList = '/other/getBannerAdList'; //自带的banner广告
    ServiceMaster.getList = '/user/getList'; //世界排行
    ServiceMaster.addMoney = '/other/addMoney'; //发起提现申请
    ServiceMaster.getMoney = '/other/getMoney'; //获取提现列表
    ServiceMaster.incUserFokas = '/user/incUserFokas'; //用户增加福卡
    ServiceMaster.decUserFokas = '/user/decUserFokas'; //福卡兑换
    ServiceMaster.recommand = '/other/click'; //推荐位统计
    return ServiceMaster;
}());
__reflect(ServiceMaster.prototype, "ServiceMaster");
window['ServiceMaster'] = ServiceMaster;
