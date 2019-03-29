var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var randomTheme = (function () {
    function randomTheme(degree) {
        this.themeArr = [
            { index: 1, num: 15, score: 52, energy: 2, width: 300, tw: 300, th: 18, left: 156, top: 55, name: 'img_castle_a', begin: 0x7a3fc3, end: 0x30368d },
            { index: 5, num: 30, score: 101, energy: 5, width: 300, tw: 270, th: 45, left: 155, top: 72, name: 'img_castle_e', begin: 0xca5b49, end: 0x8f3234 },
            { index: 8, num: 25, score: 101, energy: 5, width: 300, tw: 300, th: 18, left: 160, top: 55, name: 'img_castle_h', begin: 0xf8a5fd, end: 0xb295ff },
            { index: 9, num: 20, score: 101, energy: 5, width: 300, tw: 300, th: 0, left: 146, top: 45, name: 'img_castle_i', begin: 0x4ddcae, end: 0x4dd4dc },
            { index: 10, num: 15, score: 101, energy: 5, width: 300, tw: 288, th: 0, left: 154, top: 30, name: 'img_castle_j', begin: 0xd0faff, end: 0xc4d3ea },
            { index: 2, num: 20, score: 64, energy: 3, width: 250, tw: 250, th: 12, left: 130, top: 55, name: 'img_castle_b', begin: 0x4a3fac, end: 0x192c6f },
            { index: 3, num: 30, score: 76, energy: 4, width: 250, tw: 205, th: 12, left: 130, top: 45, name: 'img_castle_c', begin: 0xabdf85, end: 0x3ccd84 },
            { index: 6, num: 25, score: 101, energy: 5, width: 250, tw: 250, th: 20, left: 130, top: 65, name: 'img_castle_f', begin: 0xf3d781, end: 0xdf7252 },
            { index: 4, num: 25, score: 88, energy: 5, width: 250, tw: 250, th: 0, left: 118, top: 33, name: 'img_castle_d', begin: 0x9f3c70, end: 0x5f1c5a },
            { index: 7, num: 30, score: 101, energy: 5, width: 250, tw: 160, th: 15, left: 132, top: 35, name: 'img_castle_g', begin: 0xffa7a0, end: 0xf4746c },
        ];
        this.scoreInit = 52; //初始单个分数
        this.degreeArr = [
            { degree: 0, scene: 2, num: 15, energy: 8 },
            { degree: 1, scene: 3, num: 15, energy: 8 },
            { degree: 2, scene: 4, num: 20, energy: 9 },
            { degree: 3, scene: 5, num: 20, energy: 9 },
            { degree: 4, scene: 6, num: 20, energy: 10 },
            { degree: 5, scene: 7, num: 20, energy: 10 },
            { degree: 6, scene: 8, num: 20, energy: 11 },
            { degree: 7, scene: 9, num: 20, energy: 11 },
            { degree: 8, scene: 10, num: 20, energy: 13 },
            { degree: 9, scene: 10, num: 20, energy: 15 },
            { degree: 10, scene: 10, num: 20, energy: 20 }
        ];
        this.degreeThemeArr = []; //本阶段主题
        this.degree = 0; //阶段
        this.degree = degree;
        this.degreeItem = this.degreeArr[degree];
    }
    randomTheme.getInstance = function (degree) {
        if (degree === void 0) { degree = 1; }
        if (!randomTheme.shared) {
            randomTheme.shared = new randomTheme(degree);
        }
        return randomTheme.shared;
    };
    randomTheme.prototype.init = function (callback) {
        if (callback === void 0) { callback = null; }
        var that = this;
        var arr = [];
        var themeArr = this.themeArr;
        var len = themeArr.length;
        for (var i = 0, l = that.degreeItem.scene; i < l; i++) {
            var ran = Math.floor(Math.random() * len);
            arr.push(themeArr[ran]);
            themeArr.splice(ran, 1);
            len--;
        }
        randomTheme.getInstance().degreeThemeArr = arr;
        callback && callback();
    };
    randomTheme.prototype.getScore = function (scene) {
        if (scene < 4) {
            return this.scoreInit + 12 * (scene - 1);
        }
        else {
            return this.scoreInit + 12 * 3;
        }
    };
    return randomTheme;
}());
__reflect(randomTheme.prototype, "randomTheme");
window['randomTheme'] = randomTheme;
