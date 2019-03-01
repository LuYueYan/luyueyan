class soundMaster {
    // public static bg_sound: egret.Sound;//背景音乐
    public static drag_sound: egret.Sound;
    public static match_sound: egret.Sound;

    //  音轨
    public static soundChannel: egret.SoundChannel;
    public static music: boolean = true;
    public constructor() {

    }
    public static init() {
        // soundMaster.bg_sound = RES.getRes("bg_mp3");
        soundMaster.drag_sound = RES.getRes("drag_mp3");
        soundMaster.match_sound = RES.getRes("match_mp3");
    }
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
    public static playSingleMusic(type) {
        if (soundMaster[type] && soundMaster.isMusic) {
            soundMaster[type].play(0, 1);
        }
    }
    public static set isMusic(val) {
        if (val) {
            //   播放
            soundMaster.music = true;
            // soundMaster.playBgMusic();
        } else {
            soundMaster.music = false;
            // soundMaster.stopBgMusic();
        }
    }
    public static get isMusic() {
        return soundMaster.music;
    }


}