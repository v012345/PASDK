import { resources, sys } from "cc";

export class Language {
	private static languageCode = null;

	/**
	 * 语言代码-->文件夹名 映射表，根据项目支持语言调整
	 */
	private static languageCodeMap = {
		"zh-cn": "zh",
		"zh": "zh",
		"zh-tw": "zh-tw",
		"zh-hk": "zh-tw",
		"de": "de",
		"ja": "ja",
		"fr": "fr",
		"ko": "ko",
		"ru": "ru",
		"en": "en",
		"es": "es",//西班牙
		"pt": "pt",//葡萄牙
		"it": "it",//意大利
		"tr": "tr",//土耳其
		"nl": "nl",//荷兰
		"pl": "pl",//波兰
		"hu": "hu",//匈牙利
		"ar": "ar",//阿拉伯
		"no": "no",//挪威
		"uk": "uk",//乌克兰
		"ro": "ro",//罗马尼亚
		"bg": "bg",//保加利亚
		"hi": "hi",//印度
	}

	/**
	 * 初始化语言，确保初始化完成后再进入游戏，否则可能出现图片闪烁一下
	 * @param rootDir 资源根目录
	 * @param endCall 初始化完成回调
	 */
	public static init(rootDir = null, endCall?) {
		if (!this.languageCode) {
			this.getLanguageCode();
		}

		if (!rootDir) {
			rootDir = 'texture';
		}
		resources.loadDir(rootDir + '/' + this.languageCode, () => {
			endCall && endCall();
		})
	}

	/**
	 * 获取当前语言代码
	 * @returns 当前语言代码
	 */
	public static getLanguageCode() {
		if (this.languageCode) return this.languageCode;

		let code = sys.languageCode;
		// console.log('========', code)

		let codeNum = "en";
		if (Language.languageCodeMap[code]) {
			codeNum = Language.languageCodeMap[code];
		}else {
			let mainCode = code.split("-")[0];
			if (Language.languageCodeMap[mainCode]) {
				codeNum = Language.languageCodeMap[mainCode];
			}
		}

		this.languageCode = codeNum;
		return this.languageCode;
	}
}