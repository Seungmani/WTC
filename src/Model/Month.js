import Static from "../Static/Static";

class Month {
	#month;

	constructor(month) {
		this.#validateMonthRange(month);
	}
	
	// 1~12월 사이인지
	#validateMonthRange(month) {
		if (month < Static.FIRST_MONTH || month > Static.LAST_MONTH) {
			throw new Error("[ERROR] 1~12월 중 입력해주세요. 다시 입력");
		};
	}

	getMonth() {
		return this.#month;
	}
}

export default Month;