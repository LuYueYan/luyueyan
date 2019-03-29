class soundMaster {
    public static bg_sound: egret.Sound;//背景音乐
    public static songArr = [
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/ball_music/music_1.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/ball_music/music_1.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/ball_music/music_2.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/ball_music/music_3.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/ball_music/music_4.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/ball_music/music_5.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/ball_music/music_6.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/ball_music/music_7.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/ball_music/music_8.mp3', sound: null },
        { path: 'https://lixi.h5.app81.com/minigame/game_lixi/ball_music/music_9.mp3', sound: null }
    ];//歌曲列表

    //  音轨
    public static soundChannel: egret.SoundChannel;
    public static music: boolean = true;
    public constructor() {

    }
    public static init() {
        // soundMaster.bg_sound = RES.getRes("bg_mp3");
        for (let i = 0, len = soundMaster.songArr.length; i < len; i++) {
              RES.getResByUrl(soundMaster.songArr[i].path,(res)=>{
                soundMaster.songArr[i].sound=res;
            });
        }
    }
    public static playSongMusic(index = 0) {
        if (soundMaster.songArr[index].sound && soundMaster.isMusic) {
            soundMaster.soundChannel = soundMaster.songArr[index].sound.play(0, -1);
        }
    }
    public static stopSongMusic() {
        if (soundMaster.soundChannel) {
            soundMaster.soundChannel.stop();
        }
    }
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