class Date {
	#date;

	constructor(date) {
		const inputDate = this.#validateNumber(date);
		this.#validateRange(inputDate);
		this.#date = inputDate;
	}

	#validateNumber(date) {
		if(!Number(date)) throw new Error('[ERROR] 숫자를 입력해 주세요');
		return Number(date);
	}

	#validateRange(date) {
		if (1 > date || date > 31) {
			throw new Error('[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.');
		}
	}

	getDate() {
		return this.#date;
	}
}

export default Date;