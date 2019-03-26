class movieMaster {
	public static mcFactory: egret.MovieClipDataFactory;
	public constructor() {
	}
	public static init() {
		let data = RES.getRes("continue_json");
		let txtr = RES.getRes("continue_png");
		movieMaster.mcFactory = new egret.MovieClipDataFactory(data, txtr)
	}
	public static getGif(name) {
		let mc: egret.MovieClip = new egret.MovieClip(movieMaster.mcFactory.generateMovieClipData(name));
		return mc;
	}
}
window['movieMaster'] = movieMaster