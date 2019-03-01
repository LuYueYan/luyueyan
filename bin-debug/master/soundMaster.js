var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var soundMaster = (function () {
    function soundMaster() {
    }
    soundMaster.init = function () {
        // soundMaster.bg_sound = RES.getRes("bg_mp3");
        soundMaster.drag_sound = RES.getRes("drag_mp3");
        soundMaster.match_sound = RES.getRes("match_mp3");
    };
    // public static playBgMusic() {
    //     if (soundMaster.bg_sound && soundMaster.isMusic) {
    //         soundMaster.soundChannel = soundMaster.bg_sound.play(0, 0);
    //     }
    // }
    // public static stopBgMusic() {
    //     if (soundMaster.soundChannel) {
    //         soundMaster.soundChannel.stop();
    //     }
    // }
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
    soundMaster.music = true;
    return soundMaster;
}());
__reflect(soundMaster.prototype, "soundMaster");
