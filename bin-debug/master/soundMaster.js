var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var soundMaster = (function () {
    function soundMaster() {
    }
    soundMaster.init = function () {
        // soundMaster.bg_sound = RES.getRes("bg_mp3");
        // soundMaster.drag_sound = RES.getRes("drag_mp3");
        // soundMaster.match_sound = RES.getRes("match_mp3");
        for (var i = 0, len = soundMaster.songArr.length; i < len; i++) {
            soundMaster.songArr[i].sound = RES.getRes(soundMaster.songArr[i].path);
        }
    };
    soundMaster.playSongMusic = function (index) {
        if (index === void 0) { index = 0; }
        if (soundMaster.songArr[index].sound && soundMaster.isMusic) {
            soundMaster.soundChannel = soundMaster.songArr[index].sound.play(0, 1);
        }
    };
    soundMaster.stopSongMusic = function () {
        if (soundMaster.soundChannel) {
            soundMaster.soundChannel.stop();
        }
    };
    soundMaster.playSingleMusic = function (type) {
        if (soundMaster[type] && soundMaster.isMusic) {
            soundMaster[type].play(0, 1);
        }
    };
    Object.defineProperty(soundMaster, "isMusic", {
        get: function () {
            return soundMaster.music;
        },
        set: function (val) {
            if (val) {
                //   播放
                soundMaster.music = true;
                // soundMaster.playBgMusic();
            }
            else {
                soundMaster.music = false;
                // soundMaster.stopBgMusic();
            }
        },
        enumerable: true,
        configurable: true
    });
    soundMaster.songArr = [
        { path: '', sound: null },
        { path: '', sound: null },
        { path: '', sound: null },
        { path: '', sound: null },
    ]; //歌曲列表
    soundMaster.music = true;
    return soundMaster;
}());
__reflect(soundMaster.prototype, "soundMaster");
