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
var rank = (function (_super) {
    __extends(rank, _super);
    function rank() {
        var _this = _super.call(this) || this;
        _this.dataGroup = new eui.DataGroup();
        _this.sourceArr = new eui.ArrayCollection([]);
        _this.currentType = 'friend';
        _this.worldPage = 1;
        _this.endPage = 1;
        return _this;
    }
    rank.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    rank.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.init();
    };
    rank.prototype.init = function () {
        var _this = this;
        var that = this;
        platform.openDataContext.postMessage({
            type: "rank",
            width: 600,
            height: 780
        });
        var rank = platform.openDataContext.createDisplayObject();
        this.friendGroup.addChild(rank);
        this.dataGroup.dataProvider = this.sourceArr;
        this.dataGroup.itemRenderer = rankItem;
        var layout = new eui.VerticalLayout();
        layout.gap = 14;
        this.dataGroup.layout = layout;
        this.worldGroup.addChild(this.dataGroup);
        this.getWorld();
        this.lastPage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.changePage('-1'); }, this);
        this.nextPage.addEventListener(egret.TouchEvent.TOUCH_TAP, function () { _this.changePage('+1'); }, this);
        this.goHome.addEventListener(egret.TouchEvent.TOUCH_TAP, this.goHomeFun, this);
        this.friend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.friendFun, this);
        this.world.addEventListener(egret.TouchEvent.TOUCH_TAP, this.worldFun, this);
        // if (!userData.getInstance().haveNickName) {
        // 	userData.getInstance().createLoginBtn(381, 124, 258, 112);
        // }
    };
    rank.prototype.changePage = function (type) {
        if (this.currentType == 'friend') {
            this.getMore(type);
        }
        else {
            if (type == '-1') {
                this.worldPage > 1 ? this.worldPage-- : 1;
            }
            else {
                this.worldPage < this.endPage ? this.worldPage++ : '';
            }
            this.getWorld();
        }
    };
    rank.prototype.getWorld = function () {
        var that = this;
        var params = {
            p: that.worldPage
        };
        // ServiceMaster.post(ServiceMaster.getList, params, (res) => {
        // 	if (res.code == 1 && res.data) {
        // 		let data = res.data.data;
        // 		that.endPage = res.data.last_page;
        // 		that.sourceArr.removeAll();
        // this.pageText.text=that.worldPage+' / '+that.endPage;
        // 		for (let i = 0; i < data.length; i++) {
        // 			data[i].index = (that.worldPage - 1) * res.data.per_page + i + 1;
        // 			that.sourceArr.addItem(data[i]);
        // 		}
        // 	}
        // })
    };
    rank.prototype.friendFun = function () {
        this.pageText.visible = false;
        this.friend.texture = RES.getRes('img_tittle_a1_png');
        this.world.texture = RES.getRes('img_tittle_b2_png');
        this.friendGroup.visible = true;
        this.worldGroup.visible = false;
        this.currentType = 'friend';
    };
    rank.prototype.worldFun = function () {
        this.pageText.visible = true;
        this.friend.texture = RES.getRes('img_tittle_a2_png');
        this.world.texture = RES.getRes('img_tittle_b1_png');
        this.friendGroup.visible = false;
        this.worldGroup.visible = true;
        this.currentType = 'world';
    };
    rank.prototype.getMore = function (type) {
        platform.openDataContext.postMessage({
            type: "rank",
            page: type,
            width: 600,
            height: 780
        });
    };
    rank.prototype.goHomeFun = function () {
        var parent = this.parent;
        parent.removeChild(this);
        parent.addChild(new startScene());
        // userData.getInstance().userInfoBtn&&userData.getInstance().userInfoBtn.destroy();
    };
    return rank;
}(eui.Component));
__reflect(rank.prototype, "rank", ["eui.UIComponent", "egret.DisplayObject"]);
